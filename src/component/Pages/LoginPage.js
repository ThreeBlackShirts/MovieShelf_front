import React from 'react';
import { Link } from "react-router-dom";
import 'style/loginpage.css'

/*
function toHomePage(){
    window.location.href="/"
}
*/
const LoginPage = () => {
    return (
        <div className="login-content">
            <div className="login-content-title">
            <Link to='/'><h1>MovieShelf</h1></Link>
            </div>

            <div className="login-content-body">
                <div className="login-content-body-main">
                    <div className="login-content-body-main-title">
                        <div className="login-content-body-main-title-text">로그인</div>
                    </div>

                    <div className="login-content-body-main-info">
                        <div className="login-content-body-main-info-id">
                            <input id="user_email" placeholder="이메일" type="email"/>
                        </div>
                        <div className="login-content-body-main-info-pw">
                            <input id="user_password" placeholder="비밀번호" type="password"/>
                        </div>
                    </div>

                    <div className="login-content-body-main-btn">
                        <div className="login-content-body-main-btn-rememberme">
                            <form className="login-content-body-main-btn-rememberme-form">
                                <input type="checkbox" id='rememberme_btn'/> <label htmlFor='rememberme_btn'>이메일 기억하기</label>
                            </form>
                        </div>

                        <div className="login-content-body-main-btn-login">
                            <button id="login">나의 책장 보러가기</button>
                        </div>
                    </div>

                    <div className="login-content-body-main-social">
                        <div>소셜로그인</div>
                        <hr></hr>

                    </div>

                    <div className="login-content-body-main-signup">
                        <div className='login-content-body-main-signup-intro'>
                            아직 나만의 책장이 없으신가요?
                        </div>
                        <div className='login-content-body-main-signup-btn'>
                        <Link to='/signup'>SIGN UP</Link>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};


export default LoginPage;