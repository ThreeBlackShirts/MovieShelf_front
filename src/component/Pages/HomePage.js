import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import 'style/homepage.css';
import AuthenticationService from 'service/AuthenticationService';
import Footer from '../Footer/Footer';

import { FiSearch } from 'react-icons/fi';

const HomePage = () => {
	const [onLogin, setOnLogin] = useState(AuthenticationService.isUserLoggedIn);
	let navigate = useNavigate();
	const location = useLocation();

	function toHomePage() {
		navigate('/');
	}

	function toLogin() {
		navigate('/login', { state: { preLocation : location } })
	}

	function doLogout() {
		AuthenticationService.logout();
		alert('로그아웃 되었습니다.');
		setOnLogin(false);
		toHomePage();
	}

	function search() {
		const input = document.getElementById('search-input').value;
		if (input !== null && input !== '') {
			navigate(`/list/?search=${input}`);
		} else alert('검색어를 입력해주세요.');
	}

	function onKeyPress(e) {
		if (e.key == 'Enter') search();
	}

	return (
		<div className="home-content">
			<div className="home-content-header">
				<div className="home-content-header-title">
					<h1 id="home-content-header-title-logo" onClick={toHomePage}>
						MovieShelf
					</h1>
				</div>
				{onLogin && (
					<div className="home-content-header-login">
						<span className="home-content-header-login-btn" onClick={doLogout}>
							LOGOUT
						</span>
					</div>
				)}
				{!onLogin && (
					<div className="home-content-header-login">
						<div className="home-content-header-login-btn" onClick={toLogin}>
							LOGIN
						</div>
					</div>
				)}
			</div>
			<div className="home-content-main">
				<div className="home-content-main-title">
					<div className="home-content-main-title-intro">세상의 모든 영화를 담다</div>
					<div className="home-content-main-title-logo">MovieShelf</div>
				</div>
				<div className="home-content-main-search">
					<input className="home-content-main-search-text" id="search-input" placeholder="당신의 영화를 검색해 보세요!" type="text" onKeyUp={onKeyPress}></input>
					<FiSearch className="home-content-main-search-icon" onClick={search} />
				</div>
				<div className="home-content-main-login">
					{!onLogin && (
						<div id="home-content-main-login-Link" onClick={toLogin}>
							로그인하여 나만의 영화책장만들기
						</div>
					)}
					{onLogin && (
						<Link id="home-content-main-userinfo-Link" to="/userinfo">
							나만의 영화책장으로 가기
						</Link>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default HomePage;
