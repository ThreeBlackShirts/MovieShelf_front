import React, { Component } from 'react';
import { Link } from "react-router-dom";
import 'style/signuppage.css'
import AuthenticationService from 'service/AuthenticationService';


function toHomePage(){  window.location.href="/"    }


class SignUpPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userEmail: localStorage.getItem("authenticatedUser") || '',
            userPassword: '',
            userName: '',
            userNickname: '',
            userPasswordCheck: '',
            hasSignUpFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.signUpClicked = this.signUpClicked.bind(this)
    }
    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }
    signUpClicked() {
        if (this.state.userPasswordCheck === this.state.userPassword) {
            AuthenticationService.register(this.state.userEmail, this.state.userName, this.state.userPassword, this.state.userNickname)
                .then((response) => {
                    console.log(response)
                    // this.props.history.push(`/login`)
                    alert('회원가입 성공! 로그인 창으로 이동합니다.');
                    document.location.href = "/login";
                    this.setState({ showSuccessMessage: true })
                    this.setState({ hasSignUpFailed: false })
                }).catch(() => {
                    // console.log(error.response)
                    this.setState({ showSuccessMessage: false })
                    this.setState({ hasSignUpFailed: true })
                    alert('SignUp Failed');
                    document.location.href = "/signup";
                });
        } else {
            alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
        }
    }

    socialLoginGoogle() {
        console.log("google login clicked")
        AuthenticationService.loginSocialGoogle()
    }
    socialLoginKakao() {
        console.log("kakao login clicked")
        AuthenticationService.loginSocialKakao()
    }

    render() {
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
                                    <input id="userEmail" name="userEmail" placeholder="이메일" type="email" onChange={this.handleChange} />
                                </div>
                                <div className="signup-content-body-main-info-id">
                                    <input id="userName" name="userName" placeholder="성명" type="text" onChange={this.handleChange} />
                                </div>
                                <div className="signup-content-body-main-info-id">
                                    <input id="userNickname" name="userNickname" placeholder="별명" type="text" onChange={this.handleChange} />
                                </div>
                                <div className="signup-content-body-main-info-pw">
                                    <input id="userPassword" name="userPassword" placeholder="비밀번호" type="password" onChange={this.handleChange} />
                                </div>
                                <div className="signup-content-body-main-info-pw">
                                    <input id="userPasswordCheck" name="userPasswordCheck" placeholder="비밀번호 확인" type="password" onChange={this.handleChange} autoComplete="off" />
                                </div>
                            </div>
                        </form>

                        <div className="signup-content-body-main-btn">
                            <div className="signup-content-body-main-btn-signup">
                                <button id="signup" onClick={this.signUpClicked}>회원가입</button>
                            </div>
                        </div>


                        <div className="signup-content-body-main-social">
                            <div>소셜로그인</div>
                            <hr></hr>
                            <div className='signup-content-body-main-social-btn'>
                                <img className='social-signup-btn' src={require('../../images/button/btn_google_signin_light_normal_web.png')} onClick={this.socialLoginGoogle} />
                            </div>
                            <div className='signup-content-body-main-social-btn'>
                                <img className='social-signup-btn' src={require('../../images/button/kakao_login_medium_narrow.png')} onClick={this.socialLoginKakao} />
                            </div>
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
    }
};

export default SignUpPage;