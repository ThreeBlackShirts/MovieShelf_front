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
        this.nationMovieList("??????")
        this.genreMovieList("??????", 1)
        this.genreMovieList("?????????", 2)
    }


    render() {
        const { isLoading, bannerData, recommendData, nationData, genreData1, genreData2} = this.state;
        return (
            <div className='content'>
                <div className='banner-content'>
                    { isLoading ? "Loading..." :                         
                        <BannerMovieView key={bannerData.movieId}
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
                                <div className='main-content-list-name'>MovieShelf??? ?????? ?????? ??????</div>
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
                                <div className='main-content-list-name'>?????? ??????</div>
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
                                <div className='main-content-list-name'>'??????' ??????</div>
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
                                <div className='main-content-list-name'>'?????????' ??????</div>
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