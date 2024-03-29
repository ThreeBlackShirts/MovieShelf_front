import axios from "axios";

const MOVIE_API_BASE_URL = "/api/movie"

class MovieService {

	search(input) {
		return axios.post(MOVIE_API_BASE_URL+"/search", JSON.stringify(input), {
			headers: {
				"Content-Type": 'application/json',
			},
		});
	}

	detailById(movieId) {
		return axios.post(MOVIE_API_BASE_URL+"/detailed/" + movieId, {
			headers: {
				"Content-Type": 'application/json',
			},
		});
	}

	bannerMovie() {
		return axios.post(MOVIE_API_BASE_URL+"/todaybanner", {
			headers: {
				"Content-Type": 'application/json',
			},
		});
	}

	recommendation() {
		return axios.post(MOVIE_API_BASE_URL+"/recommendation", {
			headers: {
				"Content-Type": 'application/json',
			},
		});
	}

	nationCateory(target) {
		return axios.post(MOVIE_API_BASE_URL+"/nation", JSON.stringify(target),  {
			headers: {
				"Content-Type": 'application/json',
			},
		});
	}

	genreCateory(target) {
		return axios.post(MOVIE_API_BASE_URL+"/genre", JSON.stringify(target),  {
			headers: {
				"Content-Type": 'application/json',
			},
		});
	}

	topRank(){
		return axios.get(MOVIE_API_BASE_URL+"/rank",  {
			headers: {
				"Content-Type": 'application/json',
			},
		});
	}

}

export default new MovieService()