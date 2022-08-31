import axios from "axios";
import AuthenticationService from 'service/AuthenticationService';

const REVIEW_API_BASE_URL = "/api/v3/review";

class ReviewService {
    searchAllReview() {
        AuthenticationService.setupAxiosInterceptors();
        return axios.get(REVIEW_API_BASE_URL);
    }

    writeReview( userEmail, movieId, reviewTitle, reviewContent) {
        let reviewData = {
            userEmail: userEmail,
            movieId: movieId,
            title: reviewTitle,
            content: reviewContent
        }
        AuthenticationService.setupAxiosInterceptors();
        return axios.post(REVIEW_API_BASE_URL, JSON.stringify(reviewData), {
            headers: {
                "Content-Type": `application/json`,
            },
        });
    }

    editReview(reviewId, reviewTitle, reviewContent) {
        let reviewData = {
            title: reviewTitle,
            content: reviewContent
        }
        AuthenticationService.setupAxiosInterceptors();
        return axios.put(REVIEW_API_BASE_URL + "/" + reviewId, JSON.stringify(reviewData), {
            headers: {
                "Content-Type": `application/json`,
            },
        });
    }

    deleteReview(reviewId) {
        AuthenticationService.setupAxiosInterceptors();
        return axios.delete(REVIEW_API_BASE_URL + "/" + reviewId);
    }

    searchReviewById(reviewId) {
        AuthenticationService.setupAxiosInterceptors();
        return axios.get(REVIEW_API_BASE_URL + "/" + reviewId);
    }
    
    findReviewByMovieId(movieId) {
        AuthenticationService.setupAxiosInterceptors();
        return axios.get(REVIEW_API_BASE_URL + "/movie/" + movieId);
    }

    searchReviewByUseremail(userEmail) {
        AuthenticationService.setupAxiosInterceptors();
        return axios.get(REVIEW_API_BASE_URL + "/user/" + userEmail);
    }
}

export default new ReviewService();