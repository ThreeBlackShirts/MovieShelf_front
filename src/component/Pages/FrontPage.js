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
            <div className="front-title">
                <ul>
                    <li>
                        <Link to='/'>MovieShelf</Link>
                    </li>
                </ul>
            </div>

            <div className="front-login-btn">
                <ul>
                    <li>
                        <Link to='/login'>LOGIN</Link>
                    </li>
                </ul>
                    
            </div>
            
        </div>
    );
};

export default FrontPage;