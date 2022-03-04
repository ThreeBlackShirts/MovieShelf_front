import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";
const USER_URL = "http://localhost:8080/v1";

class AuthenticationService {
  register(username, email, password) {
    return axios.post(USER_URL + "signup", {
      userEmail,
      userName,
      userPassword,
      userNickname
    });
  }
}