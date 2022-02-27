import React from 'react';

const Header = () => {
    return (
        <div className="header-container">
            <div className="header-content-left">
                <div className="header-left-logo">
                    <h1 className="header-title" href="/">MovieShelf</h1>
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
                    <button type="button" className="" name="search">검색</button>
                </div>
                <div className="header-right-myshelf">
                    나의 책장
                </div>
                <div className="header-right-setting">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                    </svg>
                </div>
                <div className="header-right-login-btn">
                    <a className="header-right-login-btn" href="/login">LOGIN</a>
                </div>
            </div>
        </div>
    );
};

export default Header;