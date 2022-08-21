import axios from "axios";
import AuthenticationService from 'service/AuthenticationService';

// const API_URL = "/api/auth/";
const LIKE_API_BASE_URL = "/api/v4/like";

class LikeService {
    addLike(userEmail, reviewId){
        console.log("likeService add like:")
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
        console.log("wlikeService delete like")
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
        console.log("likeService: is like?")
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