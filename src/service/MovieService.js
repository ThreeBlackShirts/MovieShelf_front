import axios from "axios";
import AuthenticationService from "./AuthenticationService";

const MOVIE_API_BASE_URL = "/api/movie"

class MovieService {

	search(input) {
		let Data = {
			input : input
		}
		return axios.post(MOVIE_API_BASE_URL+"/search", JSON.stringify(Data), {
			headers: {
				"Content-Type": 'application/json',
			},
		});
	}

	all() {
		/*
		all(movieTitle, moviePoster, movieRank) {
			
			let movieData = {
			movieTitle: movieTitle,
			moviePoster: moviePoster,
			movieRank: movieRank
		}
			*/
		
		return axios.get(MOVIE_API_BASE_URL+"/alllist",{
			headers: {
				"Content-Type": 'application/json',
			}
		});
	}

}

export default new MovieService()