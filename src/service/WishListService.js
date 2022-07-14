import axios from "axios";
import AuthenticationService from 'service/AuthenticationService';

// const API_URL = "/api/auth/";
const WISHLIST_API_BASE_URL = "/api/v4/wish";

class WishListService {
    addWishList(userEmail, movieId){
        console.log("wishlistService add wishlist")
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
        console.log("wishlistService add wishlist")
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
        console.log("이메일로 위시리스트 찾기 service")
        AuthenticationService.setupAxiosInterceptors();
        return axios.get(WISHLIST_API_BASE_URL + "/list/" + userEmail);
    }
}

export default new WishListService();