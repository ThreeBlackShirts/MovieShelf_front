import React from 'react';

const Header = () => {
    return (
        <div className="header-container">
            <div>
                <a className="login-btn" href="/login">LOGIN</a>
            </div>
            <div className="header-content">
                <li>
                    <ul><a className="list-item" href="/board">Movie</a></ul>
                </li>
                <a className="header-title" href="/">MovieShelf</a>
                <li>
                    <ul><a className="list-item" href="/setting">setting</a></ul>
                </li>
            </div>
        </div>
    );
};

export default Header;