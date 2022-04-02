import React from 'react';
import Footer from '../Footer/Footer';
import 'style/homepage.css';
import { FiSearch } from "react-icons/fi";

function toHomePage(){
    window.location.href="/"
}

const HomePage = () => {
    return (
        <div className="home-content">
            <div className="home-content-header">
                <div className="home-content-header-title">
                    <h1 className="home-content-header-title-logo" onClick={toHomePage}>MovieShelf</h1>
                </div>
                <div className="home-content-header-title-login">
                    <a className="home-content-header-title-login-btn" href="/logout">LOGOUT</a>
                </div>
            </div>
            <div className="home-content-main">
                <div className="home-content-main-title">
                    <div className="home-content-main-title-intro">세상의 모든 영화를 담다</div>
                    <div className="home-content-main-title-logo">MovieShelf</div>
                </div>
                <div className="home-content-main-search">
                    <input className="home-content-main-search-text" placeholder="당신의 영화를 검색해 보세요!" type="text"/>
                    <FiSearch className="home-content-main-search-icon"/>
                </div>
                <div className="home-content-main-login">
                    <a>로그인하여 나만의 영화책장만들기</a>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;