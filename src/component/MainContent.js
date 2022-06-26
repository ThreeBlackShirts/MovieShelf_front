import React, { Component } from 'react';

import {RecommendMovieList} from './MovieContent';
import MovieService from 'service/MovieService';

//import 'style/mainpage.css';

class MainContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userEmail: localStorage.getItem("authenticatedUser") || '',
            token: localStorage.getItem("token") || '',
            isLoading: true,
            recommendData : [],
            categoryData : [],
            hasLoginFailed: false,
            showSuccessMessage: false,
        }
        this.recommendMovieList = this.recommendMovieList.bind(this)
        this.categoryMovieList = this.categoryMovieList.bind(this)
    }

    recommendMovieList() {
        console.log("Recommendation Movie")
        if(this.state.target !== null && this.state.target !== ""){
            MovieService
                .recommendation()
                .then((response) => {
                    console.log(response.data.data)
                    this.setState({ recommendData: response.data.data, isLoading: false })
                    console.log(this.state.recommendData)
                }).catch(() => {
                    console.log("Recommendation failed")
                    alert("Recommendation fail");
                });
        }else{
            console.log("target error")
            history.back()
        }
    }

    categoryMovieList() {
        console.log("MovieShelf's category Movie")
        MovieService
            .category()
            .then((response) => {
                console.log(response.data.data)
                this.setState = ({ categoryData: response.data.data, isLoading: false })
                console.log(this.state.categoryData)
            }).catch(() => {
                console.log("category failed")
                alert("category fail");
            });
    }

    componentDidMount() {
        this.recommendMovieList()
    }


    render() {
        const { isLoading, recommendData, categoryData} = this.state;
        return (
            <div className="main-content">
                <div className="main-content-movie">
                    <div className="main-content-movie-list">
                        <div className='main-content-list-name'>MovieShelf의 추천 장르 영화</div>
                        <div className='main-content-list-item-wrap'>
                            { isLoading ? "Loading..." : recommendData.map( movie => (
                                <RecommendMovieList key={movie.movieTitle}
                                    title={movie.movieTitle}
                                    poster={movie.moviePoster} />
                        )) }</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainContent;