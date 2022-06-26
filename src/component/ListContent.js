import React, { Component } from 'react';

import {SearchMovieResult} from './MovieContent';
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
    }

    searchMovie() {
        console.log("search start")
        if(this.state.input !== null && this.state.input !== ""){
            console.log(this.state.input +" search")
            MovieService
                .search(this.state.input)
                .then((response) => {
                    console.log(response.data.data)
                    if(response.data.data == [] || response.data.data == null || response.data.data.length == 0){
                        alert("검색 결과가 없습니다. 다시 검색해주세요.")
                        history.back()
                    }
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
    
    onKeyPress = (e) => {
        if(e.key == 'Enter')
            this.setInput()
    }

    setInput() {
        this.state.input = document.getElementById("listpage-search-text").value
        localStorage.setItem("input", this.state.input)
        location.reload()
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
                        <input type="text" id="listpage-search-text" placeholder={" '" + this.state.input + "'를 검색한 결과입니다"} onKeyUp={this.onKeyPress}></input>
                        <FiSearch className="listpage-search-btn-icon" onClick={this.setInput}/>
                    </div>
                </div>
                <div className="listpage-content-result">
                    <div>
                        { isLoading ? "Loading..." : movies.map( movie => (
                            <SearchMovieResult   key={movie.movieTitle}
                                title={movie.movieTitle}
                                poster={movie.moviePoster} />
                    )) }</div>
                </div>
            </div>
        );
    }
}

export default ListContent;