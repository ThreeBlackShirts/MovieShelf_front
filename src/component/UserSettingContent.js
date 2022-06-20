import React, { Component, useEffect, useState } from 'react';
import UserService from 'service/UserService';

import 'style/usersettingpage.css';
import { MdKeyboardArrowLeft } from "react-icons/md";

const UserSettingContent = () => {

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


    function editData() {
        alert("수정 완료 *테스트용* ");
    }

    function bringimg() {
        alert("이미지 불러오기 *테스트용*");
    }

    return (
        <div className='usersetting-content'>
            <div id='gobackbtn'><MdKeyboardArrowLeft id='gobackbtn-icon'/></div>
            <div className='usersetting-content-container'>
                <h1>개인정보 수정</h1>
                <div className='usersetting-content-container-box'>
                    <div className='usersetting-content-obj' id='userName'>
                        <div className='usersetting-content-obj-subject'>네임</div>
                        <div className='usersetting-content-obj-data'>이름/아이디</div>
                    </div>
                    <div className='usersetting-content-obj' id='setting-userNickname'>
                        <div className='usersetting-content-obj-subject'>닉네임 변경</div>
                        <div className='usersetting-content-obj-data'><input/></div>
                    </div>
                    <div className='usersetting-content-obj' id='setting-password'>
                        <div className='usersetting-content-obj-subject'>비밀번호 변경</div>
                        <div className='usersetting-content-obj-data'><input type="password"/></div>
                    </div>
                    <div className='usersetting-content-obj'>
                        <div className='usersetting-content-obj-subject'>비밀번호 확인</div>
                        <div className='usersetting-content-obj-data'><input type="password"/></div>
                        <div className='usersetting-content-obj-notice'>
                            닉네임 또는 비밀번호 변경을 위해서는 비밀번호 확인이 필요합니다!
                        </div>
                    </div>
                    <div className='usersetting-content-obj'>
                        <div className='usersetting-content-obj-subject'>프로필 사진 변경</div>
                        <div className='usersetting-content-obj-data'>
                            <input></input>
                            <button onClick={bringimg}>찾아보기</button>
                        </div>
                    </div>
                    <div className='usersetting-content-submit'>
                        <button type='submit' onClick={editData}>수정</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
  
}

export default UserSettingContent;