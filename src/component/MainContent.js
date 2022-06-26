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
    }

    bannerMovie() {
        console.log("banner Movie")
        MovieService
            .bannerMovie()
            .then((response) => {
                this.setState({ bannerData: response.data.data, isLoading: false })
                console.log(this.state.bannerData)
            }).catch(() => {
                console.log("banner failed")
                alert("banner fail");
            });
    }

    recommendMovieList() {
        console.log("Recommendation Movie")
        if(this.state.target !== null && this.state.target !== ""){
            MovieService
                .recommendation()
                .then((response) => {
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

    nationMovieList(target) {
        console.log("nation category Movie")
        MovieService
            .nationCateory(target)
            .then((response) => {
                this.setState({ nationData: response.data.data, isLoading: false })
                console.log(this.state.nationData)
            }).catch(() => {
                console.log("category failed")
                alert("category fail");
            });
    }

    genreMovieList(target, count) {
        console.log("genre category Movie")
        console.log("INPUT : " + target + " " + count)
        MovieService
            .genreCateory(target)
            .then((response) => {
                if(count == 1){
                    this.setState({ genreData1: response.data.data, isLoading: false })
                    console.log(this.state.genreData1)
                }else if(count == 2){
                    this.setState({ genreData2: response.data.data, isLoading: false })
                    console.log(this.state.genreData2)
                }
            }).catch(() => {
                console.log("category failed")
                alert("category fail");
            });
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
                        <BannerMovieView key={bannerData.movieTitle}
                            title={bannerData.movieTitle}
                            stillcut={bannerData.movieStillcut}
                            contentBold={bannerData.movieContentBold}
                            contentDetail={bannerData.movieContentDetail} />
                    }
                </div>
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
                        <div className="main-content-movie-list">
                            <div className='main-content-list-name'>한국 영화</div>
                            <div className='main-content-list-item-wrap'>
                                { isLoading ? "Loading..." : nationData.map( movie => (
                                    <CategoryMovieList key={movie.movieTitle}
                                        title={movie.movieTitle}
                                        poster={movie.moviePoster} />
                            )) }</div>
                        </div>
                        <div className="main-content-movie-list">
                            <div className='main-content-list-name'>'액션' 영화</div>
                            <div className='main-content-list-item-wrap'>
                                { isLoading ? "Loading..." : genreData1.map( movie => (
                                    <CategoryMovieList key={movie.movieTitle}
                                        title={movie.movieTitle}
                                        poster={movie.moviePoster} />
                            )) }</div>
                        </div>
                        <div className="main-content-movie-list">
                            <div className='main-content-list-name'>'로맨스' 영화</div>
                            <div className='main-content-list-item-wrap'>
                                { isLoading ? "Loading..." : genreData2.map( movie => (
                                    <CategoryMovieList key={movie.movieTitle}
                                        title={movie.movieTitle}
                                        poster={movie.moviePoster} />
                            )) }</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainContent;