import React, { Component, useEffect, useState } from 'react';
import UserService from 'service/UserService';

import 'style/usersettingpage.css';
import { MdKeyboardArrowLeft } from "react-icons/md";

class UserSettingContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userEmail: localStorage.getItem("authenticatedUser") || '',
            token: localStorage.getItem("token") || '',
            testinput: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
        }

        this.editData = this.editData.bind(this)
    }
    handleChange = (e) => {
        this.setState(
            {
                [e.target.id]: e.target.value
            }
        )
    }

    editData() {
        alert("수정 완료 *테스트용* ");
    }


    render() {
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
                                <button>찾아보기</button>
                            </div>
                        </div>
                        <div className='usersetting-content-submit'>
                            <button type='submit' onClick={this.editData}>수정</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }    
}

export default UserSettingContent;