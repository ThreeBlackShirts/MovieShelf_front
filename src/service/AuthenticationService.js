import axios from 'axios';
import { KAKAO_AUTH_URL } from './OAuth';

const USER_API_BASE_URL = '/api/v1';

class AuthenticationService {
	register(userEmail, userName, userPassword, userNickname) {
		let userData = {
			userEmail: userEmail,
			userName: userName,
			userPassword: userPassword,
			userNickname: userNickname,
		};
		return axios.post(USER_API_BASE_URL + '/signup', JSON.stringify(userData), {
			headers: {
				'Content-Type': `application/json`,
			},
		});
	}
	login(userEmail, userPassword) {
		let data = {
			userEmail: userEmail,
			userPassword: userPassword,
		};
		return axios.post(USER_API_BASE_URL + '/login', JSON.stringify(data), {
			headers: {
				'Content-Type': `application/json`,
			},
		});
	}
	createJWTToken(token) {
		return token; // 'Bearer ' + , 'X-AUTH-TOKEN'
	}
	registerSuccessfulLoginForJwt(userEmail, token) {
		localStorage.setItem('authenticatedUser', userEmail);
		localStorage.setItem('token', token);
		this.setupAxiosInterceptors();
	}

	getCurrentUser() {
		return JSON.parse(localStorage.getItem('authenticatedUser'));
	}

	setupAxiosInterceptors() {
		axios.interceptors.request.use(
			(config) => {
				const token = localStorage.getItem('token');
				if (token) {
					config.headers['X-AUTH-TOKEN'] = token;
				}
				return config;
			},
			(error) => {
				Promise.reject(error);
			}
		);
	}

	isUserLoggedIn() {
		const token = localStorage.getItem('token');

		if (token) {
			return true;
		}

		return false;
	}

	logout() {
		localStorage.removeItem('authenticatedUser');
		localStorage.removeItem('token');
	}

	loginSocialGoogle() {
		return axios.get('/api/google/login');
	}

	loginSocialKakao() {
		window.location.href = KAKAO_AUTH_URL;
	}

	withdrawal(userEmail) {
		let data = {
			userEmail: userEmail,
		};
		return axios.delete(USER_API_BASE_URL + '/userEmail/' + userEmail, {
			headers: {
				'Content-Type': `application/json`,
			},
		});
	}

	async kakaoLogin(code) {
		return await axios.get(`/api/oauth/kakao?code=${code}`);
	}
}

export default new AuthenticationService();
