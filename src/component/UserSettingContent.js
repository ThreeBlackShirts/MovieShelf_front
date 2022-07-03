import React, { Component, useEffect, useState } from 'react';
import UserService from 'service/UserService';

import 'style/usersettingpage.css';
import { MdKeyboardArrowLeft } from "react-icons/md";

class UserSettingContent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userEmail: localStorage.getItem("authenticatedUser"), //|| '',
            userPassword: '',
            userName: '',
            userNickname: '',
            userFilename: '',
            userPasswordCheck: '',
            token: localStorage.getItem("token") || '',
            hasCheckPasswordFailed: false,
            showSuccessMessage: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.getUserInfo = this.getUserInfo.bind(this)
        this.editData = this.editData.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
        this.getUserInfo();
    }
    handleChange = (e) => {
        this.setState(
            {
                [e.target.id]: e.target.value
            }
        )
    }

    editData() {
        //alert("수정 완료 *테스트용* ");
        if (this.state.userPasswordCheck == this.state.userPassword) {
            UserService.updateUserByEmail(this.state.userPassword, this.state.userNickname, this.state.userFilename)
                .then((response) => {
                    alert("수정 완료");
                    document.location.href = "/userinfo";
                }).catch((error) => {
                    console.log(error.response)
                    this.setState({ hasCheckPasswordFailed: true })
                });
        } else {
            alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
            this.setState({ hasCheckPasswordFailed: true })
        }
    }

    getUserInfo() {
        UserService
            .findUserByEmail(localStorage.getItem("authenticatedUser"))
            .then((response) => {
                console.log(response.data)
                this.state.userEmail = response.data.userEmail;
                this.state.userName = response.data.userName;
            }).catch((error) => {
                console.log(error.response)
            });
    }

    goBackBtn() {
        history.back()
    }

    deleteUser() {

        console.log("UserSetting: deleteUser")
        this.state.userEmail = localStorage.getItem("authenticatedUser")
        console.log(this.state.userEmail)
        UserService.deleteUser(this.state.userEmail)
    }


    render() {
        return (
            <div className='usersetting-content'>
                <div id='gobackbtn'><MdKeyboardArrowLeft id='gobackbtn-icon' onClick={this.goBackBtn} /></div>
                <div className='usersetting-content-container'>
                    <h1>개인정보 수정</h1>
                    <div className='usersetting-content-container-box'>
                        <div className='usersetting-content-obj' id='userName'>
                            <div className='usersetting-content-obj-subject'>네임</div>
                            <div className='usersetting-content-obj-data' id={this.state.userEmail} key={this.state.userEmail}>{this.state.userEmail}</div>
                            <div className='usersetting-content-obj-data' id={this.state.userName} key={this.state.userName}>{this.state.userName}</div>
                        </div>
                        <div className='usersetting-content-obj' id='setting-userNickname'>
                            <div className='usersetting-content-obj-subject'>닉네임 변경</div>
                            <div className='usersetting-content-obj-data'><input id="userNickname" name="userNickname" placeholder="별명" type="text" onChange={this.handleChange} /></div>
                        </div>
                        <div className='usersetting-content-obj' id='setting-password'>
                            <div className='usersetting-content-obj-subject'>비밀번호 변경</div>
                            <div className='usersetting-content-obj-data'><input type="password" id="userPassword" name="userPassword" onChange={this.handleChange} /></div>
                        </div>
                        <div className='usersetting-content-obj'>
                            <div className='usersetting-content-obj-subject'>비밀번호 확인</div>
                            <div className='usersetting-content-obj-data'><input id="userPasswordCheck" name="userPasswordCheck" placeholder="비밀번호 확인" type="password" onChange={this.handleChange} autoComplete="off" /></div>
                            {this.state.hasCheckPasswordFailed && <div className='usersetting-content-obj-notice'>
                                닉네임 또는 비밀번호 변경을 위해서는 비밀번호 확인이 필요합니다!
                            </div>}
                        </div>
                        <div className='usersetting-content-obj'>
                            <div className='usersetting-content-obj-subject'>프로필 사진 변경</div>
                            <div className='usersetting-content-obj-data'>
                                <input type='file' id="userFilename" name="userFilename" placeholder="프로필 이미지" onChange={this.handleChange} ></input>
                            </div>
                        </div>
                        <div className='usersetting-content-submit'>
                            <button onClick={this.editData}>수정</button>
                        </div>
                        <div className='usersetting-content-submit'>
                            <button onClick={this.deleteUser}>회원 탈퇴</button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default UserSettingContent;