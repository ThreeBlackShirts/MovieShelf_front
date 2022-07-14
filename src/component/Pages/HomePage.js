import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { useState } from 'react';

import 'style/homepage.css';
import AuthenticationService from 'service/AuthenticationService';
import ListContent from 'component/ListContent';
import Footer from '../Footer/Footer';

import { FiSearch } from "react-icons/fi";
import { ImBooks } from "react-icons/im";

function toHomePage(){
    window.location.href="/"
}

function toUserInfo(){
    window.location.href="/userinfo"
}

function onKeyPress(e){
    if(e.key == 'Enter')
        search()
}

function search() {
    const input = document.getElementById("search-input").value
    if(input !== null && input !== ""){
        location.href = `/list/?search=${input}`
    }else
        alert("검색어를 입력해주세요.")
}

const HomePage = () => {
    const [onLogin] = useState(AuthenticationService.isUserLoggedIn);

    return (
        <div className="home-content">
            <div className="home-content-header">
                <div className="home-content-header-title">
                    <h1 id="home-content-header-title-logo" onClick={toHomePage}>MovieShelf</h1>
                </div>
                {onLogin && <div className="home-content-header-login">
                    <div id="home-content-header-myshelf">
                        <ImBooks id="home-content-header-myshelf-icon" onClick={toUserInfo}/>
                    </div>
                    <a className="home-content-header-login-btn" href="/logout">LOGOUT</a>
                </div>}
                {!onLogin && <div className="home-content-header-login">
                    <a className="home-content-header-login-btn" href="/login">LOGIN</a>
                </div>}
            </div>
            <div className="home-content-main">
                <div className="home-content-main-title">
                    <div className="home-content-main-title-intro">세상의 모든 영화를 담다</div>
                    <div className="home-content-main-title-logo">MovieShelf</div>
                </div>
                <div className="home-content-main-search">
                    <input className="home-content-main-search-text"  id='search-input' placeholder="당신의 영화를 검색해 보세요!" type="text" onKeyUp={onKeyPress}></input>
                    <FiSearch className="home-content-main-search-icon"  onClick={search}/>
                </div>
                <div className="home-content-main-login">
                    {!onLogin && <Link id='home-content-main-login-Link' to='/login'>로그인하여 나만의 영화책장만들기</Link>}                    
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;