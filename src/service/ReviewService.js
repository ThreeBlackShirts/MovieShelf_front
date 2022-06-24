import axios from "axios";

// const API_URL = "/api/auth/";
const REVIEW_API_BASE_URL = "/api/v3";

class ReviewService {
    searchAllReview() {
        return axios.get(REVIEW_API_BASE_URL + "/review", {
            headers: {
                "Content-Type": `application/json`,
            },
        });
    }

    writeReview(reviewId, reviewContent, reviewTitle, userEmail) {
        let reviewData = {
            content: reviewContent,
            title: reviewTitle,
            userEmail: userEmail
        }
        return axios.post(REVIEW_API_BASE_URL + "/" + reviewId, JSON.stringify(reviewData), {
            headers: {
                "Content-Type": `application/json`,
            },
        });
    }

    editReview(reviewId, reviewContent, reviewTitle) {
        let reviewData = {
            content: reviewContent,
            title: reviewTitle
        }
        return axios.put(REVIEW_API_BASE_URL + "/" + reviewId, {
            headers: {
                "Content-Type": `application/json`,
            },
        });
    }

    deleteReview(reviewId) {
        return axios.post(REVIEW_API_BASE_URL + "/" + reviewId, {
            headers: {
                "Content-Type": `application/json`,
            },
        });
    }

    searchReviewById(reviewId) {
        return axios.get(REVIEW_API_BASE_URL + "/" + reviewId, {
            headers: {
                "Content-Type": `application/json`,
            },
        });
    }

    searchReviewByUseremail(userEmail) {
        return axios.get(REVIEW_API_BASE_URL + "/" + userEmail, {
            headers: {
                "Content-Type": `application/json`,
            },
        });
    }
}

export default new ReviewService();