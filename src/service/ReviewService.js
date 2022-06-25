import axios from "axios";

// const API_URL = "/api/auth/";
const REVIEW_API_BASE_URL = "/api/v3";

class ReviewService {
    searchAllReview() {
        console.log("searchAllReview service")
        return axios.get(REVIEW_API_BASE_URL + "/review")
    }

    writeReview(reviewId, reviewContent, reviewTitle, userEmail) {
        let reviewData = {
            content: reviewContent,
            title: reviewTitle,
            userEmail: userEmail
        }
        console.log("writeReview service")
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
        console.log("editReview service")
        return axios.put(REVIEW_API_BASE_URL + "/" + reviewId, JSON.stringify(reviewData), {
            headers: {
                "Content-Type": `application/json`,
            },
        });
    }

    deleteReview(reviewId) {
        console.log("deleteReview service")
        return axios.delete(REVIEW_API_BASE_URL + "/" + reviewId)
    }

    searchReviewById(reviewId) {
        console.log("searchReview service")
        return axios.get(REVIEW_API_BASE_URL + "/" + reviewId)
    }

    searchReviewByUseremail(userEmail) {
        console.log("searchReviewByUseremail service")
        return axios.get(REVIEW_API_BASE_URL + "/" + userEmail)
    }
}

export default new ReviewService();