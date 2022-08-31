import React, { Component } from 'react';

import {BannerMovieView, RecommendMovieList, CategoryMovieList} from './MovieContent';
import MovieService from 'service/MovieService';

class MainContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userEmail: localStorage.getItem("authenticatedUser") || '',
            token: localStorage.getItem("token") || '',
            isLoading: true,
            bannerData: [],
            recommendData : [],
            genreData1 : [],
            genreData2 : [],
            nationData : [],
            hasLoginFailed: false,
            showSuccessMessage: false,
        }
        this.recommendMovieList = this.recommendMovieList.bind(this)
        this.nationMovieList = this.nationMovieList.bind(this)
        this.genreMovieList = this.genreMovieList.bind(this)
        this.handelNull = this.handelNull.bind(this)
    }

    bannerMovie() {
        MovieService
            .bannerMovie()
            .then((response) => {
                this.setState({ bannerData: response.data.data, isLoading: false })
            }).catch(() => {
                alert("banner fail");
            });
    }

    recommendMovieList() {
        if(this.state.target !== null && this.state.target !== ""){
            MovieService
                .recommendation()
                .then((response) => {
                    this.setState({ recommendData: response.data.data, isLoading: false })
                }).catch(() => {
                    alert("Recommendation fail");
                });
        }else{
        }
    }

    nationMovieList(target) {
        MovieService
            .nationCateory(target)
            .then((response) => {
                this.setState({ nationData: response.data.data, isLoading: false })
            }).catch(() => {
                alert("category fail");
            });
    }

    genreMovieList(target, count) {
        MovieService
            .genreCateory(target)
            .then((response) => {
                if(count == 1){
                    this.setState({ genreData1: response.data.data, isLoading: false })
                }else if(count == 2){
                    this.setState({ genreData2: response.data.data, isLoading: false })
                }
            }).catch(() => {
                alert("category fail");
            });
    }

    handelNull(data) {
        if(data == null){
            return('')
        } else {
            return(data)
        }
    }

    componentDidMount() {
        this.bannerMovie()
        this.recommendMovieList()
        this.nationMovieList("한국")
        this.genreMovieList("액션", 1)
        this.genreMovieList("로맨스", 2)
    }


    render() {
        const { isLoading, bannerData, recommendData, nationData, genreData1, genreData2} = this.state;
        return (
            <div className='content'>
                <div className='banner-content'>
                    { isLoading ? "Loading..." :                         
                        <BannerMovieView
                            id={this.handelNull(bannerData.movieId)}
                            title={this.handelNull(bannerData.movieTitle)}
                            stillcut={this.handelNull(bannerData.movieStillcut)}
                            contentBold={this.handelNull(bannerData.movieContentBold)}
                            contentDetail={this.handelNull(bannerData.movieContentDetail)} />
                    }
                </div>
                <div className="main-content">
                    <div className="main-content-movie">
                        { isLoading ? "Loading..." : recommendData.length===0 ? null : (
                            <div className="main-content-movie-list">
                                <div className='main-content-list-name'>MovieShelf의 추천 장르 영화</div>
                                <div className='main-content-list-item-wrap'>
                                    { recommendData.map( movie => (
                                        <RecommendMovieList key={movie.movieId}
                                            id={movie.movieId}
                                            title={movie.movieTitle}
                                            poster={movie.moviePoster} />
                                    )) }
                                </div>
                            </div>
                        ) }
                        { isLoading ? "Loading..." : nationData.length===0 ? null : (
                            <div className="main-content-movie-list">
                                <div className='main-content-list-name'>한국 영화</div>
                                <div className='main-content-list-item-wrap'>
                                    { nationData.map( movie => (
                                    <CategoryMovieList  key={movie.movieId}
                                        id={movie.movieId}
                                        title={movie.movieTitle}
                                        poster={movie.moviePoster} />
                                    )) }
                                </div>
                            </div>
                        ) }
                        { isLoading ? "Loading..." : genreData1.length===0 ? null : (
                            <div className="main-content-movie-list">
                                <div className='main-content-list-name'>'액션' 영화</div>
                                <div className='main-content-list-item-wrap'>
                                    { genreData1.map( movie => (
                                    <CategoryMovieList  key={movie.movieId}
                                        id={movie.movieId}
                                        title={movie.movieTitle}
                                        poster={movie.moviePoster} />
                                    )) }
                                </div>
                            </div>
                        ) }
                        { isLoading ? "Loading..." : genreData2.length===0 ? null : (
                            <div className="main-content-movie-list">
                                <div className='main-content-list-name'>'로맨스' 영화</div>
                                <div className='main-content-list-item-wrap'>
                                    { genreData2.map( movie => (
                                    <CategoryMovieList  key={movie.movieId}
                                        id={movie.movieId}
                                        title={movie.movieTitle}
                                        poster={movie.moviePoster} />
                                    )) }
                                </div>
                            </div>
                        ) }
                    </div>
                </div>
            </div>
        );
    }
}

export default MainContent;