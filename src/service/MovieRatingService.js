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
        AuthenticationService.setupAxiosInterceptors();
        return axios.post(RATE_API_BASE_URL + "/add", JSON.stringify(rateData), {
            headers: {
                "Content-Type": `application/json`,
            },
        });
    }

    findRate(userEmail, movieId) {
        let data = {
            movieId: movieId,
            userEmail: userEmail
        }
        AuthenticationService.setupAxiosInterceptors();
        return axios.post(RATE_API_BASE_URL + "/find", JSON.stringify(data), {
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
        AuthenticationService.setupAxiosInterceptors();
        return axios.post(RATE_API_BASE_URL + "/update", JSON.stringify(rateData), {
            headers: {
                "Content-Type": `application/json`,
            },
        });
    }

    deleteRate(userEmail, movieId) {
        let data = {
            movieId: movieId,
            userEmail: userEmail
        }
        AuthenticationService.setupAxiosInterceptors();
        return axios.post(RATE_API_BASE_URL + "/delete", JSON.stringify(data), {
            headers: {
                "Content-Type": `application/json`,
            },
        });
    }

}

export default new MovieRatingService();