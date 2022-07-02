import axios from "axios";
import AuthenticationService from 'service/AuthenticationService';

// const API_URL = "/api/auth/";
const LIKE_API_BASE_URL = "/api/v3/like";

class LikeService {
    addLike(userEmail, reviewId){
        console.log("likeService add like")
        AuthenticationService.setupAxiosInterceptors();
        return axios.post(LIKE_API_BASE_URL + "/" + reviewId, JSON.stringify(userEmail),{
            headers: {
                "Content-Type": `application/json`,
            },
        })
    }

    deleteLike(userEmail, reviewId) {
        console.log("wlikeService delete like")
        AuthenticationService.setupAxiosInterceptors();
        return axios.delete(LIKE_API_BASE_URL + "/" + reviewId, JSON.stringify(userEmail),{
            headers: {
                "Content-Type": `application/json`,
            },
        })
    }

}

export default new LikeService();