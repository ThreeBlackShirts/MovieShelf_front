import React, {Component} from 'react';
import { Link } from "react-router-dom";
import 'style/loginpage.css'
import AuthenticationService from 'service/AuthenticationService';

/*
function toHomePage(){
    window.location.href="/"
}
*/
// function Login() {
//     const navigate = useNavigate();
// }


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
                // console.log(response.data.data)
                this.setState({
                    token: response.data.data
                    //X-AUTH-TOKEN으로 다른 url 이용할 때 헤더로 넣어줘야한다.
                });
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.userEmail, this.state.token)
                // this.props.history.push(`/${this.state.userEmail}`)
                this.setState({ showSuccessMessage: true })
                this.setState({ hasLoginFailed: false })
                // document.location.href = "/";
                // navigate("/");
                this.props.navigation.navigate("/");
             
            }).catch(error => {
                console.log(error.response)
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            }).then(() => {
                // 항상 실행
                console.log("final then")
                // this.props.history.push(`/${this.state.userEmail}`)
                document.location.href = "/";
            });
            
            // .catch(() => {
            //     this.setState({ showSuccessMessage: false })
            //     this.setState({ hasLoginFailed: true })
            // })
        
    }
    render() {
        return (
            <div className="login-content">
                <div className="login-content-title">
                    <Link to='/'><h1>MovieShelf</h1></Link>
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