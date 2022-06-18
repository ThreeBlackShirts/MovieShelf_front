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

	detail(target) {
		return axios.get(MOVIE_API_BASE_URL+"/detailed/"+target, {
			headers: {
				"Content-Type": 'application/json',
			},
		});
	}

}

export default new MovieService()