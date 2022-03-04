import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";
const USER_URL = "http://localhost:8080/v1";

class AuthenticationService {
  register(userName, userEmail, userPassword, userNickname) {
    return axios.post(USER_URL + "signup", {
      userName,
      userEmail,
      userPassword,
      userNickname
    });
  }
  login(userEmail, userPassword) {
    return axios.post(USER_URL + "login", {
      userEmail,
      userPassword
    });
  }
  createJWTToken(token) {
    return 'Bearer ' + token
  }
  registerSuccessfulLoginForJwt(username, token) {
    console.log("===registerSuccessfulLoginForJwt===")
    localStorage.setItem('token', token);
    localStorage.setItem('authenticatedUser', username);
    // sessionStorage.setItem('authenticatedUser', username)
    //this.setupAxiosInterceptors(this.createJWTToken(token))
    this.setupAxiosInterceptors();
  }
}

export default new AuthenticationService()