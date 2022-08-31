import axios from "axios";
import AuthenticationService from 'service/AuthenticationService';

const LIKE_API_BASE_URL = "/api/v4/like";

class LikeService {
    addLike(userEmail, reviewId){
        AuthenticationService.setupAxiosInterceptors();
        let data = {
            userEmail: userEmail
        }
        return axios.post(LIKE_API_BASE_URL + "/" + reviewId, JSON.stringify(data),{
            headers: {
                "Content-Type": `application/json`,
            },
        })
    }

    deleteLike(userEmail, reviewId) {
        AuthenticationService.setupAxiosInterceptors();
        return axios.delete(LIKE_API_BASE_URL + "/" + reviewId,{
            headers: {
                "Content-Type": `application/json`,
            },
            data: {
                userEmail: userEmail
            }
        })
    }

    isLike(userEmail, reviewId) {
        AuthenticationService.setupAxiosInterceptors();
        let data = {
            userEmail: userEmail
        }
        return axios.post(LIKE_API_BASE_URL + "/validate/" + reviewId, JSON.stringify(data),{
            headers: {
                "Content-Type": `application/json`,
            },
        })
    }

}

export default new LikeService();