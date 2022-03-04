import React from "react";
import { Link } from "react-router-dom";
import 'style/frontpage.css'

/*
function toHomePage(){
    window.location.href="/"
}
*/

const FrontPage = () => {
    return (
        <div className="front-content">
            <div className="front-content-header">
                <div className="front-title">
                    <Link to='/'>MovieShelf</Link>
                </div>
                <div className="front-login-btn">
                    <Link to='/login'>LOGIN</Link>
                </div>
            </div>
            <div className="front-content-body">
                <div className="front-content-body-info">
                    왜
                </div>
                <div className="front-content-body-search">
                    안
                </div>
                <div className="front-content-body-login">
                    돼?ㅠㅠ
                </div>
            </div>
            
            
        </div>
    );
};

export default FrontPage;