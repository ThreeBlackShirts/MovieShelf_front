import axios from "axios";
import AuthenticationService from 'service/AuthenticationService';

const USER_API_BASE_URL = "/api/v1/user";

class UserService{
    findUserByEmail(userEmail) {
        // let userEmail = localStorage.getItem('authenticatedUser')
        AuthenticationService.setupAxiosInterceptors();
        return axios.get(USER_API_BASE_URL + "/email/"+ userEmail)
    }

}

export default new UserService();