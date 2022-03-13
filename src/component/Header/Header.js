import React from 'react';
import { BiSearchAlt } from "react-icons/bi"

function toHomePage(){
    window.location.href="/"
}

const Header = () => {
    return (
        <div className="header-container">
            <div className="header-content-left">
                <div className="header-left-logo">
                    <h1 className="header-title" onClick={toHomePage}>MovieShelf</h1>
                </div>
                <div className="header-left-top">
                    <a className="list-item" href="/board">Top 10</a>
                </div>
                <div className="header-left-genre">
                    <a className="list-item">Genre</a>
                </div>
            </div>

            <div className="header-content-right">
                <div className="header-right-search-btn">
                    <input type="text" className="search-btn-text"></input>
                    <BiSearchAlt className="search-btn-icon"/>
                </div>
                <div className="header-right-myshelf">
                    나의 책장
                </div>
                <div className="header-right-setting">
                    
                </div>
                <div className="header-right-login-btn">
                    <a className="header-right-login-btn" href="/login">LOGIN</a>
                </div>
            </div>
        </div>
    );
};

export default Header;