import axios from "axios";

const API_URL = "/api/auth/";
const USER_URL = "/v1";

class AuthenticationService {
  register(userEmail, userName, userPassword, userNickname) {
    return axios.post(USER_URL + "/signup", {
      userEmail,
      userName,
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
  registerSuccessfulLoginForJwt(userEmail, token) {
    console.log("===registerSuccessfulLoginForJwt===")
    localStorage.setItem('token', token);
    localStorage.setItem('authenticatedUser', userEmail);
    // sessionStorage.setItem('authenticatedUser', userEmail)
    // this.setupAxiosInterceptors(this.createJWTToken(token))
    this.setupAxiosInterceptors();
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('authenticatedUser'));
  }

  isUserLoggedIn() {

    //let user = sessionStorage.getItem('authenticatedUser')
    const token = localStorage.getItem('token');
    console.log("===UserloggedInCheck===");
    console.log(token);

    if (token) {
      return true;
    }
    //if(user===null) return false
    return false;
  }
  
  logout() {
    localStorage.removeItem("authenticatedUser");
    localStorage.removeItem("token");
  }
}

export default new AuthenticationService()