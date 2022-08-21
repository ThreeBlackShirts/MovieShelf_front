import axios from "axios";
import AuthenticationService from 'service/AuthenticationService';

const WISHLIST_API_BASE_URL = "/api/v5/wish";

class WishListService {
    addWishList(userEmail, movieId){
        AuthenticationService.setupAxiosInterceptors();
        let data = {
            userEmail: userEmail
        }
        return axios.post(WISHLIST_API_BASE_URL + "/" + movieId, JSON.stringify(data),{

            headers: {
                "Content-Type": `application/json`,
            },
        })
    }

    deleteWishList(userEmail, movieId){
        AuthenticationService.setupAxiosInterceptors();

        return axios.delete(WISHLIST_API_BASE_URL + "/" + movieId,{
            headers: {
                "Content-Type": `application/json`,
            },
            data: {
                userEmail: userEmail
            }
        })
    }

    searchWishListByUserEmail(userEmail) {
        AuthenticationService.setupAxiosInterceptors();
        return axios.get(WISHLIST_API_BASE_URL + "/list/" + userEmail);
    }

    isWishBtUserEmail(movieId, userEmail) {
        AuthenticationService.setupAxiosInterceptors();
        let data = {
            userEmail: userEmail
        }
        return axios.post(WISHLIST_API_BASE_URL + "/validate/" + movieId, JSON.stringify(data),{
            headers: {
                "Content-Type": `application/json`,
            },
        })
    }
}

export default new WishListService();