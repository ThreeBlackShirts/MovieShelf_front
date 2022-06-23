import React, {Component} from 'react';
import { Link } from "react-router-dom";

import 'style/loginpage.css';

import AuthenticationService from 'service/AuthenticationService';


function toHomePage() { window.location.href="/"    }

// function Login() {
//     const navigate = useNavigate();
// }

//background : url(images/background/cameraandbooks.jpg);


class LoginPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userEmail: localStorage.getItem("authenticatedUser") || '',
            userPassword: '',
            token: localStorage.getItem("token") || '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
        this.socialLoginGoogle = this.socialLoginGoogle.bind(this)
        this.socialLoginKakao = this.socialLoginKakao.bind(this)
    }
    handleChange(event) {
        this.setState(
            {
                [event.target.name] : event.target.value
            }
        )
    }

    loginClicked() {
        AuthenticationService
            .login(this.state.userEmail, this.state.userPassword)
            .then((response) => {
                console.log(response)
                this.setState({
                    token: response.data.data
                });
                console.log('loginClicked');
                console.log(this.state.userEmail, this.state.token);
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.userEmail, this.state.token);
                
                // this.props.history.push(`/${this.state.userEmail}`)
                document.location.href = "/";    
                this.setState({ showSuccessMessage: true })
                this.setState({ hasLoginFailed: false })
            }).catch(() => {
                // console.log(error.response)
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
                alert('Login Failed');
            });
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
            <div className="login-content">
                <div className="login-content-title">
                    <h1 id='login-content-title-logo' onClick={toHomePage}>MovieShelf</h1>
                </div>

                <div className="login-content-body">
                    <div className="login-content-body-main">
                        {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                        {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                        <div className="login-content-body-main-title">
                            <div className="login-content-body-main-title-text">로그인</div>
                        </div>
                        <form >
                        <div className="login-content-body-main-info">
                            <div className="login-content-body-main-info-id">
                                    <input id="userEmail" name="userEmail" placeholder="이메일" type="email" onChange={this.handleChange}/>
                            </div>
                            <div className="login-content-body-main-info-pw">
                                    <input id="userPassword" name="userPassword" placeholder="비밀번호" type="password" autoComplete="on" onChange={this.handleChange} />
                            </div>
                            </div>
                        </form>

                        <div className="login-content-body-main-btn">
                            <div className="login-content-body-main-btn-rememberme">
                                <form className="login-content-body-main-btn-rememberme-form">
                                    <input type="checkbox" id='rememberme_btn' /> <label htmlFor='rememberme_btn'>이메일 기억하기</label>
                                </form>
                            </div>

                            <div className="login-content-body-main-btn-login">
                                <button id="login" onClick={this.loginClicked}>나의 책장 보러가기</button>
                            </div>
                            </div>
                        

                        <div className="login-content-body-main-social">
                            <div>소셜로그인</div>
                            <hr></hr>
                            <div className='login-content-body-main-social-btn'>
                                <img className='social-login-btn' src={require('../../images/button/btn_google_signin_light_normal_web.png')} onClick={this.socialLoginGoogle} />
                            </div>
                            <div className='login-content-body-main-social-btn'>
                                <img className='social-login-btn' src={require('../../images/button/kakao_login_medium_narrow.png')} onClick={this.socialLoginKakao} />
                            </div>
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
    }
};


export default LoginPage;