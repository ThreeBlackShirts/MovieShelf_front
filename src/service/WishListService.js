import axios from "axios";
import AuthenticationService from 'service/AuthenticationService';

// const API_URL = "/api/auth/";
const WISHLIST_API_BASE_URL = "/api/v4/wish";

class WishListService {
    addWishList(userEmail, movieId){
        console.log("wishlistService add wishlist")
        AuthenticationService.setupAxiosInterceptors();
        return axios.post(WISHLIST_API_BASE_URL + "/" + movieId, JSON.stringify(userEmail),{
            headers: {
                "Content-Type": `application/json`,
            },
        })
    }

    deleteWishList(userEmail, movieId) {
        console.log("wishlistSerivce delete wishlist")
        AuthenticationService.setupAxiosInterceptors();
        return axios.delete(WISHLIST_API_BASE_URL + "/" + movieId, JSON.stringify(userEmail),{
            headers: {
                "Content-Type": `application/json`,
            },
        })
    }
}

export default new WishListService();