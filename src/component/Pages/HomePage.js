import React, { Component } from 'react';
import AuthenticationService from 'service/AuthenticationService';
import { Link } from "react-router-dom";
import { useState } from 'react';

import 'style/homepage.css';
import Footer from '../Footer/Footer';

import { FiSearch } from "react-icons/fi";
import { ImBooks } from "react-icons/im";

function toHomePage(){
    window.location.href="/"
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
                        <ImBooks id="home-content-header-myshelf-icon" href="/main"/>
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
                    <input className="home-content-main-search-text" placeholder="당신의 영화를 검색해 보세요!" type="text"></input>
                    <FiSearch className="home-content-main-search-icon"/>
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