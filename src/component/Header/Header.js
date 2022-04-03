import React from 'react';
import AuthenticationService from 'service/AuthenticationService';
import { useState } from 'react';
import 'style/header.css'
import { FiSearch } from "react-icons/fi";
import { ImBooks } from "react-icons/im";
import { IoIosSettings } from "react-icons/io";


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
            <div className="header-content-title">
                <div className="header-content-title-logo">
                    <h1 className="header-content-title-logo-h1" onClick={toHomePage}>MovieShelf</h1>
                </div>
                <div className="header-content-title-top">
                    <h4 className="header-content-title-item" onClick={toHomePage}>Top 10</h4>
                </div>
                <div className="header-content-title-genre">
                    <h4 className="header-content-title-item">Genre</h4>
                </div>
            </div>

            <div className="header-content-userbtn">
                <div className="header-content-userbtn-search-btn">
                    <input type="text" className="header-content-userbtn-search-btn-text"></input>
                    <FiSearch className="header-content-userbtn-search-btn-icon"/>
                </div>
                <div className="header-content-userbtn-myshelf">
                    <ImBooks className="header-content-userbtn-myshelf-icon"/>
                </div>
                <div className="header-content-userbtn-setting">
                    <IoIosSettings className="header-content-userbtn-setting-icon"/>
                </div>
                {onLogin && <div className="header-content-userbtn-login">
                    <h4 className="header-content-userbtn-login-btn" href="/logout">LOGOUT</h4>
                </div>}
                {!onLogin && <div className="header-content-userbtn-login">
                    <h4 className="header-content-userbtn-login-btn" href="/login">LOGIN</h4>
                </div>}
                
            </div>
        </div>
    );
};

export default Header;