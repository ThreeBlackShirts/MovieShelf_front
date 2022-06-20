import axios from "axios";
import AuthenticationService from 'service/AuthenticationService';

const USER_API_BASE_URL = "/api/v1/user";

class UserService{
    findUserByEmail(userEmail) {
        // let userEmail = localStorage.getItem('authenticatedUser')
        AuthenticationService.setupAxiosInterceptors();
        return axios.get(USER_API_BASE_URL + "/email/"+ userEmail)
    }

    updateUserByEmail(userPassword, userNickname, userFilename) {
        AuthenticationService.setupAxiosInterceptors();
        let data = {
            userEmail: localStorage.getItem("authenticatedUser"),
            userPassword: userPassword,
            userNickname: userNickname,
            userFilename: userFilename
        }
        console.log(data);
        return axios.put(USER_API_BASE_URL+"", JSON.stringify(data), {
            headers: {
                "Content-Type": `application/json`,
            },
        })
    }

}

export default new UserService();