import React, { Component } from 'react';

import {GenreMovieList} from './MovieContent';
import MovieService from 'service/MovieService';
import { FiSearch } from "react-icons/fi";

class GenreListContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userEmail: localStorage.getItem("authenticatedUser") || '',
            token: localStorage.getItem("token") || '',
            isLoading: true,
            targetGenre : "액션",
            genreData : [],
            hasLoginFailed: false,
            showSuccessMessage: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.genreMovieList = this.genreMovieList.bind(this)
        this.changeGenreList = this.changeGenreList.bind(this)
    }
    handleChange(event) {
        this.setState(
            {
                [event.target.name] : event.target.value
            }
        )
    }

    genreMovieList(target) {
        MovieService
            .genreCateory(target)
            .then((response) => {
                this.setState({ genreData: response.data.data, isLoading: false })
            }).catch(() => {
                alert("genre fail");
            });
    }

    changeGenreList() {
        this.genreMovieList(this.state.targetGenre)
    }

    componentDidMount() {
        this.genreMovieList(this.state.targetGenre)
    }


    render() {
        const { isLoading, genreData} = this.state;
        return (
            <div className="listpage-content">
                <div className="listpage-content-search">
                    <div className="listpage-content-search-btnwrap">
                        <select name="targetGenre" id="listpage-search-text" onChange={this.handleChange}>
                            <option defaultValue="" hidden>장르 선택</option>
                            <option value="액션">액션</option>
                            <option value="판타지">판타지</option>
                            <option value="SF">SF</option>
                            <option value="모험">모험</option>
                            <option value="미스터리">미스터리</option>
                            <option value="범죄">범죄</option>
                            <option value="스릴러">스릴러</option>
                            <option value="공포">공포</option>
                            <option value="전쟁">전쟁</option>
                            <option value="가족">가족</option>
                            <option value="드라마">드라마</option>
                            <option value="코미디">코미디</option>
                            <option value="멜로/로맨스">멜로/로맨스</option>
                            <option value="애니메이션">애니메이션</option>
                            <option value="다큐멘터리">다큐멘터리</option>
                        </select>
                        <FiSearch className="listpage-search-btn-icon" onClick={this.changeGenreList}/>                        
                    </div>
                </div>
                <div className='listpage-content-result-wrap'>  
                    <div className="listpage-content-result">
                        { isLoading ? "Loading..." : genreData.map( movie => (
                            <GenreMovieList key={movie.movieTitle}
                                id={movie.movieId}
                                title={movie.movieTitle}
                                poster={movie.moviePoster} />
                        )) }
                    </div>
                </div>
            </div>
        );
    }
}

export default GenreListContent;