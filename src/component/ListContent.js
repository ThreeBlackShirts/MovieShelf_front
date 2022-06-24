import React, { Component } from 'react';

import Movie from './MovieSearch';
import MovieService from 'service/MovieService';
import 'style/listpage.css';

import { FiSearch } from "react-icons/fi";

class ListContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userEmail: localStorage.getItem("authenticatedUser") || '',
            token: localStorage.getItem("token") || '',
            input: localStorage.getItem("input") || '',
            isLoading: true,
            movies: [],
            hasLoginFailed: false,
            showSuccessMessage: false,
        }
        this.setInput = this.setInput.bind(this)
        this.searchMovie = this.searchMovie.bind(this)
        this.viewMovieList = this.viewMovieList.bind(this)
    }

    searchMovie() {
        console.log("search start")
        if(this.state.input !== null && this.state.input !== ""){
            console.log(this.state.input +" search")
            MovieService
                .search(this.state.input)
                .then((response) => {
                    //this.state.movies에 검색된 영화(제목, 포스터url)들 리스트로 담겨있음.
                    //잘 모르겠으면 콘솔 출력된 것 보기!
                    this.setState({ movies: response.data.data, isLoading: false })
                    console.log(this.state.movies)
                }).catch(() => {
                    console.log("search failed")
                });
        }else{
            console.log("input to listpage error")
            history.back()
        }
    }

    setInput() {
        this.state.input = document.getElementById("listpage-search-text").value
        localStorage.setItem("input", this.state.input)
        location.reload()
    }

    viewMovieList() {
        console.log("View MovieList")
        // const target = document.getElementsByClassName("listpage-content-result")
        // const div = document.createElement("div")
        for(let moviesLength in this.state.movies){
            //console.log(this.state.movies[moviesLength])
        }
        console.log(this.divSetting(this.state.movies[0]))
        return divSetting(this.state.movies[0])
    }

    divSetting(movie){
        return (
            
            <div className="listpage-content-result-item">
                <div className="listpage-content-result-item-pic"><img src={movie.moviePoster}/></div>
                <div className="listpage-content-result-item-info">{movie.movieTitle}</div>
            </div>
        );
    }

    componentDidMount() {
        this.searchMovie()
    }

    render() {
        const { isLoading, movies } = this.state;
        return (
            <div className="listpage-content">
                <div className="listpage-content-search">
                    <div className="listpage-content-search-btnwrap">
                        <input type="text" id="listpage-search-text" placeholder={" '" + this.state.input + "'를 검색한 결과입니다"}></input>
                        <FiSearch className="listpage-search-btn-icon" onClick={this.setInput}/>
                    </div>
                </div>
                <div className="listpage-content-result">
                    <div>
                        { isLoading ? "Loading..." : movies.map( movie => (
                            <Movie
                                title={movie.movieTitle}
                                poster={movie.moviePoster} />
                    )) }</div>
                </div>
            </div>
        );
    }
}

export default ListContent;