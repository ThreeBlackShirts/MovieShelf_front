import axios from "axios";
import AuthenticationService from 'service/AuthenticationService';

const RATE_API_BASE_URL = "/api/v2/movie/rate";

class MovieRatingService {
    addRate(userEmail, movieId, movieRate) {
        let rateData = {
            userEmail: userEmail,
            movieId: movieId,
            movieRate: movieRate
        }
        console.log("MovieRatingService: Add Rate")
        AuthenticationService.setupAxiosInterceptors();
        return axios.post(RATE_API_BASE_URL + "/add", JSON.stringify(rateData), {
            headers: {
                "Content-Type": `application/json`,
            },
        });
    }

    findRate(userEmail, movieId) {
        let data = {
            userEmail: userEmail
        }
        console.log("MovieRatingService: Find Rate")
        AuthenticationService.setupAxiosInterceptors();
        return axios.post(RATE_API_BASE_URL + "/find/" + movieId, JSON.stringify(data), {
            headers: {
                "Content-Type": `application/json`,
            },
        });
    }

    updateRate(userEmail, movieId, movieRate) {
        let rateData = {
            userEmail: userEmail,
            movieId: movieId,
            movieRate: movieRate
        }
        console.log("MovieRatingService: Update Rate")
        AuthenticationService.setupAxiosInterceptors();
        return axios.post(RATE_API_BASE_URL + "/update", JSON.stringify(rateData), {
            headers: {
                "Content-Type": `application/json`,
            },
        });
    }

    deleteRate(rateId) {
        console.log("MovieRatingService: Delete Rate")
        AuthenticationService.setupAxiosInterceptors();
        return axios.delete(RATE_API_BASE_URL + "/" + rateId);
    }

}

export default new MovieRatingService();