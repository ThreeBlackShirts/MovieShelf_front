import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthenticationService from 'service/AuthenticationService';

import 'style/loginpage.css';

const LoginPage = () => {
	let navigate = useNavigate();

	function toHomePage() {
		navigate('/');
	}

	function toBack() {
		navigate(-1);
	}

	const [userEmail, setUserEmail] = useState(localStorage.getItem('authenticatedUser') || '');
	const [userPassword, setUserPassword] = useState('');
	const [token, setToken] = useState(localStorage.getItem('token') || '');
	const [hasLoginFailed, setHasLoginFailed] = useState(false);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	const onChangeEmail = (e) => setUserEmail(e.target.value);
	const onChangePassword = (e) => setUserPassword(e.target.value);

	function loginClicked() {
		AuthenticationService.login(userEmail, userPassword)
			.then((response) => {
				console.log('loginClicked');
				setToken(response.data.data);

				AuthenticationService.registerSuccessfulLoginForJwt(userEmail, response.data.data);
				setShowSuccessMessage(true);
				setHasLoginFailed(false);

				//현재 위치가 "/" 였으면, "/main"으로, 아니라면, -1
				toBack();
			})
			.catch(() => {
				setShowSuccessMessage(false);
				setHasLoginFailed(true);
				alert('Login Failed');
			});
	}

	function socialLoginGoogle() {
		console.log('google login clicked');
		AuthenticationService.loginSocialGoogle();
	}
	function socialLoginKakao() {
		console.log('kakao login clicked');
		AuthenticationService.loginSocialKakao();
	}

	return (
		<div className="login-content">
			<div className="login-content-title">
				<h1 id="login-content-title-logo" onClick={toHomePage}>
					MovieShelf
				</h1>
			</div>

			<div className="login-content-body">
				<div className="login-content-body-main">
					{hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
					{showSuccessMessage && <div>Login Sucessful</div>}
					<div className="login-content-body-main-title">
						<div className="login-content-body-main-title-text">로그인</div>
					</div>
					<form>
						<div className="login-content-body-main-info">
							<div className="login-content-body-main-info-id">
								<input id="userEmail" name="userEmail" placeholder="이메일" type="email" onChange={onChangeEmail} />
							</div>
							<div className="login-content-body-main-info-pw">
								<input id="userPassword" name="userPassword" placeholder="비밀번호" type="password" autoComplete="on" onChange={onChangePassword} />
							</div>
						</div>
					</form>

					<div className="login-content-body-main-btn">
						<div className="login-content-body-main-btn-rememberme">
							<form className="login-content-body-main-btn-rememberme-form">
								<input type="checkbox" id="rememberme_btn" /> <label htmlFor="rememberme_btn">이메일 기억하기</label>
							</form>
						</div>

						<div className="login-content-body-main-btn-login">
							<button id="login" onClick={loginClicked}>
								나의 책장 보러가기
							</button>
						</div>
					</div>

					<div className="login-content-body-main-social">
						<hr></hr>
						<div id="login-content-body-main-social-text">소셜로그인</div>
						<hr></hr>
						<div className="login-content-body-main-social-btn">
							<img className="social-login-btn" src={require('../../images/button/btn_google_signin_light_normal_web.png')} onClick={socialLoginGoogle} />
						</div>
						<div className="login-content-body-main-social-btn">
							<img className="social-login-btn" src={require('../../images/button/kakao_login_medium_narrow.png')} onClick={socialLoginKakao} />
						</div>
					</div>

					<div className="login-content-body-main-signup">
						<div className="login-content-body-main-signup-intro">아직 나만의 책장이 없으신가요?</div>
						<div className="login-content-body-main-signup-btn">
							<Link to="/signup">SIGN UP</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;