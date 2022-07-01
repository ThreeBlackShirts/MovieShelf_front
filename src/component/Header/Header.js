import React from 'react';
import AuthenticationService from 'service/AuthenticationService';
import { useState } from 'react';

import 'style/header.css'

import { FiSearch } from "react-icons/fi";
import { ImBooks } from "react-icons/im";
import { IoIosSettings } from "react-icons/io";


function toHomePage(){
    window.location.href="/main"
}

function toGenreListPage(){
    window.location.href="/genre"
}

function toUserInfoPage(){
    window.location.href="/userinfo"
}

function onKeyPress(e){
    if(e.key == 'Enter')
        search()
}

function search() {
    const input = document.getElementById("search-input").value
    if(input !== null && input !== ""){
        if(window.localStorage.getItem("input") !== null)
            window.localStorage.removeItem("input")
        window.localStorage.setItem('input', input)
        location.href = "/list"
    }else
        alert("검색어를 입력해주세요.")
}

function toUserSettingPage(){
    window.location.href="/usersetting"
}

function doLogout(){
    window.location.href="/logout"
}

function doLogin(){
    window.location.href="/login"
}

const Header = () => {
    const [onLogin] = useState(AuthenticationService.isUserLoggedIn);

    return (
        <div className="header-container">
            <div className="header-content-title">
                <div className="header-content-title-logo">
                    <h1 className="header-content-title-logo-h1" onClick={toHomePage}>MovieShelf</h1>
                </div>
                <div className="header-content-title-menu">
                    <div className="header-content-title-top">
                        <h4 className="header-content-title-item" onClick={toHomePage}>Top20</h4>
                    </div>
                    <div className="header-content-title-genre">
                        <h4 className="header-content-title-item" onClick={toGenreListPage}>Genre</h4>
                    </div>
                </div>
            </div>

            <div className="header-content-userbtn">
                <div className="header-content-userbtn-search-btn">
                    <input type="text" className="header-content-userbtn-search-btn-text"  id='search-input' placeholder="영화 제목을 입력해주세요" onKeyUp={onKeyPress}></input>
                    <FiSearch className="header-content-userbtn-search-btn-icon" onClick={search}/>
                </div>
                <div className="header-content-userbtn-myshelf">
                    <ImBooks className="header-content-userbtn-myshelf-icon" onClick={toUserInfoPage}/>
                </div>
                <div className="header-content-userbtn-setting">
                    <IoIosSettings className="header-content-userbtn-setting-icon" onClick={toUserSettingPage}/>
                </div>
                {onLogin && <div className="header-content-userbtn-login">
                    <h4 className="header-content-userbtn-login-btn" onClick={doLogout}>LOGOUT</h4>
                </div>}
                {!onLogin && <div className="header-content-userbtn-login">
                    <h4 className="header-content-userbtn-login-btn" onClick={doLogin}>LOGIN</h4>
                </div>}
                
            </div>
        </div>
    );
};

export default Header;