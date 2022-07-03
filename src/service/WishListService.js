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
        let data = {
            userEmail: userEmail
        }
        return axios.delete(WISHLIST_API_BASE_URL + "/" + movieId,{
            headers: {
                "Content-Type": `application/json`,
            },
            data: {
                userEmail: userEmail
            }
        })
    }
}

export default new WishListService();