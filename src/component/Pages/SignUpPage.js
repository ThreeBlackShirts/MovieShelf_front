import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import 'style/signuppage.css'
import AuthenticationService from 'service/AuthenticationService';

const SignUpPage = () => {
	const [userEmail, setUserEmail] = useState(localStorage.getItem('authenticatedUser') || '');
	const [userName, setUserName] = useState('');
	const [userNickname, setUserNickname] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const [userPasswordCheck, setUserPasswordCheck] = useState('');

	let navigate = useNavigate();
	const location = useLocation();

	const onChangeEmail = (e) => setUserEmail(e.target.value);
	const onChangeName = (e) => setUserName(e.target.value);
	const onChangeNickname = (e) => setUserNickname(e.target.value);
	const onChangePassword = (e) => setUserPassword(e.target.value);
	const onChangePasswordCheck = (e) => setUserPasswordCheck(e.target.value);

    function toHomePage(){ navigate("/") }

	function toLogin() {
		navigate('/login', { state: { preLocation : location } })
	}

    function signUpClicked() {
        if (userPasswordCheck === userPassword) {
            AuthenticationService.register(userEmail, userName, userPassword, userNickname)
                .then(() => {
                    alert('회원가입 성공! 로그인 창으로 이동합니다.');
                    navigate('/login', { state: { preLocation : location } })
                }).catch(() => {
                    alert('SignUp Failed');
                    navigate('/signup')
                });
        } else {
            alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
        }
    }

    function socialLoginGoogle() {
        AuthenticationService.loginSocialGoogle()
    }
    function socialLoginKakao() {
        AuthenticationService.loginSocialKakao()
    }

	return (
        <div className="signup-content">
                <div className="signup-content-title">
                    <h1 id='signup-content-title-logo' onClick={toHomePage}>MovieShelf</h1>
                </div>

                <div className="signup-content-body">
                    <div className="signup-content-body-main">
                        <div className="signup-content-body-main-title">
                            <div className="signup-content-body-main-title-text">회원가입</div>
                        </div>
                        <form>
                            <div className="signup-content-body-main-info">
                                <div className="signup-content-body-main-info-id">
                                    <input id="userEmail" name="userEmail" placeholder="이메일" type="email" onChange={onChangeEmail} />
                                </div>
                                <div className="signup-content-body-main-info-id">
                                    <input id="userName" name="userName" placeholder="성명" type="text" onChange={onChangeName} />
                                </div>
                                <div className="signup-content-body-main-info-id">
                                    <input id="userNickname" name="userNickname" placeholder="별명" type="text" onChange={onChangeNickname} />
                                </div>
                                <div className="signup-content-body-main-info-pw">
                                    <input id="userPassword" name="userPassword" placeholder="비밀번호" type="password" onChange={onChangePassword} />
                                </div>
                                <div className="signup-content-body-main-info-pw">
                                    <input id="userPasswordCheck" name="userPasswordCheck" placeholder="비밀번호 확인" type="password" onChange={onChangePasswordCheck} autoComplete="off" />
                                </div>
                            </div>
                        </form>

                        <div className="signup-content-body-main-btn">
                            <div className="signup-content-body-main-btn-signup">
                                <button id="signup" onClick={signUpClicked}>회원가입</button>
                            </div>
                        </div>


                        <div className="signup-content-body-main-social">
                            <div>소셜로그인</div>
                            <hr></hr>
                            <div className='signup-content-body-main-social-btn'>
                                <img className='social-signup-btn' src={require('../../images/button/btn_google_signin_light_normal_web.png')} onClick={socialLoginGoogle} />
                            </div>
                            <div className='signup-content-body-main-social-btn'>
                                <img className='social-signup-btn' src={require('../../images/button/kakao_login_medium_narrow.png')} onClick={socialLoginKakao} />
                            </div>
                        </div>

                        <div className="signup-content-body-main-login">
                            <div className='signup-content-body-main-login-btn'>
                                <div onClick={toLogin}>LOGIN</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
	);
};

export default SignUpPage;

