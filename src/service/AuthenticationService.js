import axios from "axios";

// const API_URL = "/api/auth/";
const USER_API_BASE_URL = "/api/v1";

class AuthenticationService {
  register(userEmail, userName, userPassword, userNickname) {
    let userData = {
      userEmail: userEmail,
      userName: userName,
      userPassword: userPassword,
      userNickname: userNickname
    }
    return axios.post(USER_API_BASE_URL + "/signup", JSON.stringify(userData), {
      headers: {
        "Content-Type": `application/json`,
      },
    });
  }
  login(userEmail, userPassword) {
    let data = {
      userEmail: userEmail,
      userPassword: userPassword
    }
    // console.log(data);
    return axios.post(USER_API_BASE_URL + "/login", JSON.stringify(data), {
      headers: {
        "Content-Type": `application/json`,
      },
    })
  }
  createJWTToken(token) {
    return token // 'Bearer ' + , 'X-AUTH-TOKEN'
  }
  registerSuccessfulLoginForJwt(userEmail, token) {
    console.log("===registerSuccessfulLoginForJwt===")
    localStorage.setItem('authenticatedUser', userEmail);
    localStorage.setItem('token', token);
    // sessionStorage.setItem('authenticatedUser', userEmail)
    // this.setupAxiosInterceptors(this.createJWTToken(token))
    this.setupAxiosInterceptors();
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('authenticatedUser'));
  }

  setupAxiosInterceptors() {
    axios.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['X-AUTH-TOKEN'] = token;
           //X-AUTH-TOKEN으로 다른 url 이용할 때 헤더로 넣어줘야한다.
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
      },
      error => {
        Promise.reject(error)
      });
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
    localStorage.removeItem('authenticatedUser');
    localStorage.removeItem('token');
  }

  loginSocialGoogle() {
    return axios.get("/api/google/login")
  }

  loginSocialKakao() {
    return axios.get("/api/oauth/kakao")
  }
}

export default new AuthenticationService()