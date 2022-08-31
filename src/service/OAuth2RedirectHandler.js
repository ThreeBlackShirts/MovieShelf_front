// 리다이렉트될 화면
// OAuth2RedirectHandeler.js
import React, { useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import AuthenticationService from 'service/AuthenticationService';
import 'style/oauthredirecthandler.css';

const OAuth2RedirectHandler = (props) => {
	let params = new URL(document.URL).searchParams;
	let code = params.get('code');
	let navigate = useNavigate();

	useEffect(async () => {
		await AuthenticationService.kakaoLogin(code)
			.then((response) => {
				AuthenticationService.registerSuccessfulLoginForJwt(response.data.data.userEmail, response.data.data.token);
			})
			.catch((error) => {
				console.log(error);
			});
		navigate('/main');
	}, []);

	return (
		<div className='redirectpage'>
			<div className='redirectpage-icon'>
				<Oval height="80" width="80" radius="9" color="#00Bfff" ariaLabel="three-dots-loading" wrapperStyle wrapperClass />
				<div>잠시만 기다려 주세요! 로그인 중입니다.</div>
			</div>
		</div>
	);
};

export default OAuth2RedirectHandler;
