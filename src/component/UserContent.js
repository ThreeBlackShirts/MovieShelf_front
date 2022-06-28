import React, { Component, useEffect, useState } from 'react';
import UserService from 'service/UserService';
import { CgProfile } from "react-icons/cg";
import { MdAdd } from "react-icons/md";

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

    function toWriteReview(){
        window.location.href="/writereview"
    }

    function toUserSetting(){
        window.location.href="/usersetting"
    }

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
                            <td><a onClick={toUserSetting}>내 정보 수정</a></td>
                        </tr>
                        <tr>
                            <td>내 책장 속 영화: <span>N1</span>개</td>
                            <td>리뷰한 영화: <span>N2</span>개</td>
                        </tr>
                    </table>
                    
                </div>
            </div>
            <div className="userinfo-content-shelf">
                <div className="userinfo-content-shelf-list">
                    <div className='userinfo-content-shelf-list-name'>나의 영화 책장</div>
                    <div className='userinfo-content-shelf-list-item-wrap'>
                        <div className='userinfo-content-shelf-list-item'>
                            <div className='userinfo-content-shelf-list-item-pic'></div>
                            <div className='userinfo-content-shelf-list-item-info'></div>
                        </div>
                        <div className='userinfo-content-shelf-list-item'>
                            <div className='userinfo-content-shelf-list-item-pic'><MdAdd className='shelf-contents-object-icon' onClick={toWriteReview}/></div>
                            <div className='userinfo-content-shelf-list-item-info'>추가하기</div>
                        </div>
                    </div>
                </div>


                <div className="userinfo-content-shelf-list">
                    <div className='userinfo-content-shelf-list-name'>나의 영화 책장</div>
                    <div className='userinfo-content-shelf-list-item-wrap'>
                        <div className='userinfo-content-shelf-list-item'>
                            <div className='userinfo-content-shelf-list-item-pic'></div>
                            <div className='userinfo-content-shelf-list-item-info'></div>
                        </div>
                    </div>
                </div>
                <div className="userinfo-content-shelf-list">
                    <div className='userinfo-content-shelf-list-name'>나의 영화 책장</div>
                    <div className='userinfo-content-shelf-list-item-wrap'>
                        <div className='userinfo-content-shelf-list-item'>
                            <div className='userinfo-content-shelf-list-item-pic'></div>
                            <div className='userinfo-content-shelf-list-item-info'></div>
                        </div>
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default UserContent;