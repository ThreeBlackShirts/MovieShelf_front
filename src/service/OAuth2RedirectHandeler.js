// 리다이렉트될 화면
// OAuth2RedirectHandeler.js
import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import AuthenticationService from 'service/AuthenticationService';

const OAuth2RedirectHandler = (props) => {
	let params = new URL(document.URL).searchParams;
	let code = params.get('code');
	let navigate = useNavigate();

	// const [token, setToken] = useState('');
	// const [userEmail, setUserEmail] = useState('');

	useEffect(async () => {
		await AuthenticationService.kakaoLogin(code)
			.then((response) => {
				console.log('kakaoLogin');
				console.log(response.data.data.token);
				console.log(response.data.data.userEmail);
				AuthenticationService.registerSuccessfulLoginForJwt(response.data.data.userEmail, response.data.data.token);
			})
			.catch((error) => {
				console.log('kakaoLogin Failed');
			});
		navigate('/main');

		// return () => AuthenticationService.registerSuccessfulLoginForJwt(userEmail, token);
	}, []);

	return (
		<div>
			<div>
				<div>잠시만 기다려 주세요! 로그인 중입니다.</div>

				<Oval height="80" width="80" radius="9" color="#00Bfff" ariaLabel="three-dots-loading" wrapperStyle wrapperClass />
			</div>
		</div>
	);
};

export default OAuth2RedirectHandler;
