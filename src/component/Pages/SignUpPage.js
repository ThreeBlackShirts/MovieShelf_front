import React from 'react';
import { Link } from "react-router-dom";
import 'style/signuppage.css'

/*
function toHomePage(){
    window.location.href="/"
}
*/

const SignUpPage = () => {
    return (
        <div className="signup-content">
            <div className="signup-content-title">
                <Link to='/'><h1>MovieShelf</h1></Link>
            </div>

            <div className="signup-content-body">
                <div className="signup-content-body-main">
                    <div className="signup-content-body-main-title">
                        <div className="signup-content-body-main-title-text">회원가입</div>
                    </div>

                    <div className="signup-content-body-main-info">
                        <div className="signup-content-body-main-info-id">
                            <input id="userEmail" name="userEmail" placeholder="이메일" type="email"/>
                        </div>
                        <div className="signup-content-body-main-info-id">
                            <input id="userName" name="userName" placeholder="성명" type="text" />
                        </div>
                        <div className="signup-content-body-main-info-id">
                            <input id="userNickname" name="userNickname" placeholder="별명" type="text" />
                        </div>
                        <div className="signup-content-body-main-info-pw">
                            <input id="userPassword" name="userPassword"  placeholder="비밀번호" type="password"/>
                        </div>
                        <div className="signup-content-body-main-info-pw">
                            <input id="userPasswordCheck" name="userPasswordCheck" placeholder="비밀번호 확인" type="password"/>
                        </div>
                    </div>

                    <div className="signup-content-body-main-btn">
                        <div className="signup-content-body-main-btn-signup">
                            <button id="signup">회원가입</button>
                        </div>
                    </div>

                    <div className="signup-content-body-main-social">
                        <div>소셜로그인</div>
                        <hr></hr>

                    </div>

                    <div className="signup-content-body-main-login">
                        <div className='signup-content-body-main-login-btn'>
                        <Link to='/login'>LOGIN</Link>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;