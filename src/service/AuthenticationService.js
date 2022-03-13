import axios from "axios";

const API_URL = "/api/auth/";
const USER_URL = "/v1";

class AuthenticationService {
  register(userName, userEmail, userPassword, userNickname) {
    return axios.post(USER_URL + "/signup", {
      userName,
      userEmail,
      userPassword,
      userNickname
    });
  }
  login(userEmail, userPassword) {
    let data = {
      userEmail: userEmail,
      userPassword: userPassword
    }
    console.log(data);
    return axios.post(USER_URL + "/login", JSON.stringify(data), {
      headers: {
        "Content-Type": `application/json`,
      },
    });
  }
  createJWTToken(token) {
    return token // 'Bearer ' + , 'X-AUTH-TOKEN'
  }
  registerSuccessfulLoginForJwt(username, token) {
    console.log("===registerSuccessfulLoginForJwt===")
    localStorage.setItem('token', token);
    localStorage.setItem('authenticatedUser', username);
    sessionStorage.setItem('authenticatedUser', username)
    this.setupAxiosInterceptors(this.createJWTToken(token))
    this.setupAxiosInterceptors();
  }
}

export default new AuthenticationService()