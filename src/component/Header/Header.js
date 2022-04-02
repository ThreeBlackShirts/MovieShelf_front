import React from 'react';
import { FiSearch } from "react-icons/fi";
import AuthenticationService from 'service/AuthenticationService';
import { useState } from 'react';
import 'style/header.css'

function toHomePage(){
    window.location.href="/"
}

function toBoardPage(){
    window.location.href="/"
}

const Header = () => {
    const [onLogin] = useState(AuthenticationService.isUserLoggedIn);

    return (
        <div className="header-container">
            <div className="header-content-left">
                <div className="header-left-logo">
                    <h1 className="header-title" onClick={toHomePage}>MovieShelf</h1>
                </div>
                <div className="header-left-top">
                    <h4 className="list-item" onClick={toBoardPage}>Top 10</h4>
                </div>
                <div className="header-left-genre">
                    <h4 className="list-item">Genre</h4>
                </div>
            </div>

            <div className="header-content-right">
                <div className="header-right-search-btn">
                    <input type="text" className="header-right-search-btn-text"></input>
                    <FiSearch className="header-right-search-btn-icon"/>
                </div>
                <div className="header-right-myshelf">
                    나의 책장
                </div>
                <div className="header-right-setting">
                    
                </div>
                {onLogin && <div className="header-right-login-btn">
                    <a className="header-right-login-btn" href="/logout">LOGOUT</a>
                </div>}
                {!onLogin && <div className="header-right-login-btn">
                    <a className="header-right-login-btn" href="/login">LOGIN</a>
                </div>}
                
            </div>
        </div>
    );
};

export default Header;