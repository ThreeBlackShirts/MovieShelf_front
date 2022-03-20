import React from 'react';
import Footer from '../Footer/Footer';
import Header from 'component/Header/Header';
import MainContent from 'component/MainContent';
import 'style/homepage.css';

function toHomePage(){
    window.location.href="/"
}

const HomePage = () => {
    return (
        <div className="home-content">
            <div className="home-content-header">
                <div className="home-content-header-title">
                <h1 className="header-title" onClick={toHomePage}>MovieShelf</h1>
                </div>

                <div className="home-content-header-login">
                    <a className="home-content-header-login-btn" href="/logout">LOGOUT</a>
                </div>

            <div className="home-content-main">
                <div className="home-content-main-title">
                    <div>세상의 모든 영화를 담다</div>
                    <div>MovieShelf</div>
                </div>
                <div className="home-content-main-search">
                <input placeholder="당신의 영화를 검색해 보세요!" type="text"/>
                </div>
                <div className="home-content-main-login">
                    <a>로그인하여 나만의 영화책장만들기</a>
                </div>
            </div>
        </div>
            <Footer />
        </div>
    );
};

/*
{onLogin && <div className="header-right-login-btn">
                    <a className="header-right-login-btn" href="/logout">LOGOUT</a>
                </div>}
                {!onLogin && <div className="header-right-login-btn">
                    <a className="header-right-login-btn" href="/login">LOGIN</a>
                </div>}
                 */

export default HomePage;