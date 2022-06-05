import React, { Component, useEffect, useState } from 'react';
import UserService from 'service/UserService';
import { CgProfile } from "react-icons/cg";

const UserContent = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        UserService
            .findUserByEmail(localStorage.getItem("authenticatedUser"))
            .then((response) => {
                console.log(response.data)
                // this.setState({
                //     token: response.data.data
                // });
                // this.state.userName = response.data.data.userName
                // this.state.userNickname = response.data.data.userNickname
                // console.log(response.data.data.userName)
                // console.log(this.state.userName)
                // console.log(this.state.userNickname)
                setUsers(response.data.data);
            }).catch((error) => {
                console.log(error.response)
            });
    }, []);
    return (

        <div className='userinfo-content'>
            <div className="userinfo-content-info">
                <div className="userinfo-content-info-profile">
                    <div><CgProfile className="userinfo-content-info-profile-img"/></div>
                    <div id={users.userNickame} key={users.userNickame}>
                        {users.userNickname}
                    </div>
                </div>
                <div className="userinfo-content-info-sub">
                    <table>
                        <tr>
                            <td>
                                <div id={users.userName} key={users.userName}>
                                    {users.userName}
                                </div>
                            </td>
                            <td><a>내 정보 수정</a></td>
                        </tr>
                        <tr>
                            <td>내 책장 속 영화: <span>N1</span>개</td>
                            <td>리뷰한 영화: <span>N2</span>개</td>
                        </tr>
                    </table>
                    
                </div>
            </div>
            <div className="userinfo-content-shelf">
                <div className="userinfo-content-shelf-category">
                    <div className="userinfo-content-shelf-category-sub">나의 영화 책장</div>&nbsp; | &nbsp;
                    <div className="userinfo-content-shelf-category-sub">내가 찜한 리뷰어</div>
                </div>
                <div className="userinfo-content-shelf-contents">
                    <table>
                        <tr>
                            <td><img id='userinfo-content-shelf-example' src={require('../images/test/test_detail.jpg')} /></td>
                        </tr>
                    </table>
                </div>
            </div>
            
        </div>
    )
}

export default UserContent;