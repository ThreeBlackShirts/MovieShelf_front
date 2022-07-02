import axios from "axios";
import AuthenticationService from 'service/AuthenticationService';

// const API_URL = "/api/auth/";
const REVIEW_API_BASE_URL = "/api/v3/review";

class ReviewService {
    searchAllReview() {
        console.log("searchAllReview service")
        AuthenticationService.setupAxiosInterceptors();
        return axios.get(REVIEW_API_BASE_URL + "/review");
    }

    writeReview( userEmail, movieId, reviewTitle, reviewContent) {
        let reviewData = {
            userEmail: userEmail,
            movieId: movieId,
            title: reviewTitle,
            content: reviewContent
        }
        console.log("ReviewService Write Review")
        AuthenticationService.setupAxiosInterceptors();
        return axios.post(REVIEW_API_BASE_URL + "/", JSON.stringify(reviewData), {
            headers: {
                "Content-Type": `application/json`,
            },
        });
    }

    editReview(reviewId, movieId, reviewTitle, reviewContent) {
        let reviewData = {
            movieId: movieId,
            title: reviewTitle,
            content: reviewContent
        }
        console.log("ReviewService Edit")
        AuthenticationService.setupAxiosInterceptors();
        return axios.put(REVIEW_API_BASE_URL + "/" + reviewId, JSON.stringify(reviewData), {
            headers: {
                "Content-Type": `application/json`,
            },
        });
    }

    deleteReview(reviewId) {
        console.log("ReviewService Delete")
        AuthenticationService.setupAxiosInterceptors();
        return axios.delete(REVIEW_API_BASE_URL + "/" + reviewId);
    }

    searchReviewById(reviewId) {
        console.log("ReviewService SearchBy Id")
        AuthenticationService.setupAxiosInterceptors();
        return axios.get(REVIEW_API_BASE_URL + "/" + reviewId);
    }

    searchReviewByUseremail(userEmail) {
        console.log("ReviewService SearchBy userEmail")
        AuthenticationService.setupAxiosInterceptors();
        return axios.get(REVIEW_API_BASE_URL + "/user/" + userEmail);
    }
}

export default new ReviewService();