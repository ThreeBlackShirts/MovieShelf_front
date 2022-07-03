import React, { Component } from 'react';
import { Link } from "react-router-dom";

import {MovieDetailTitle, MovieDetail, MovieDetailTrailer, MovieDetailStillcut} from './MovieContent';
import {MovieTitleReview} from './ReviewContents';
import MovieService from 'service/MovieService';
import ReviewService from 'service/ReviewService';
import WishListService from 'service/WishListService';
import 'style/detailpage.css';

import { MdKeyboardArrowLeft } from "react-icons/md";
import { BsBookmarkHeartFill } from "react-icons/bs";

class DetailContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userEmail: localStorage.getItem("authenticatedUser") || '',
            token: localStorage.getItem("token") || '',
            target: localStorage.getItem("target") || '',
            isLoading: true,
            movieDetail: {},
            reviewContent: [],
            hasLoginFailed: false,
            showSuccessMessage: false,
            checkwish: false,
        }
        this.detailhMovie = this.detailhMovie.bind(this)
        this.goReview = this.goReview.bind(this)
        this.loginCheck = this.loginCheck.bind(this)
        this.handleLWishList =this.handleLWishList.bind(this)
    }

    detailhMovie() {
        console.log("detail Movie")
        if(this.state.target !== null && this.state.target !== ""){
            console.log(this.state.target +" detail")
            MovieService
                .detail(this.state.target)
                .then((response) => {
                    localStorage.removeItem("target")
                    this.setState({ movieDetail: response.data.data})
                    console.log(this.state.movieDetail)

                    console.log("Movie Review")
                    ReviewService
                        .findReviewByMovieId(this.state.movieDetail.movieId)
                        .then((response) => {
                            this.setState({ reviewContent: response.data.data, isLoading: false })
                            console.log(this.state.reviewContent)
                        }).catch(() => {
                            console.log("findReviewByMovieId failed")
                            alert("findReviewByMovieId fail");
                    }); 
                }).catch(() => {
                    console.log("detail failed")
                    alert("detail fail");
                });
        }else{
            console.log("target error")
            history.back()
        }
    }

    loginCheck = (e) => {
        if(this.state.token == [] || this.state.token == ""){
            const url = `/login`;
            alert("로그인이 필요합니다")
            location.href="/login"
        }
    }

    componentDidMount() {
        this.detailhMovie()
    }

    goBackBtn(){
        console.log("goback btn clicked!")
        history.back()
    }

    goReview(){
        const url = `/review/${this.state.movieDetail.movieId}`;
        return(
            <Link to={url} className="movie-review-link" onClick={this.loginCheck}>
                <button id='detailpage-reviews-go-review'>리뷰 쓰러가기</button>
            </Link>
        );
    }

    handleLWishList(){
        // let wishlist = document.getElementById('detailpage-info-likebtn-icon');
        console.log("current this.state.checkwish1:" + this.state.checkwish)
        if(this.state.checkwish){
            // wishlist.classList.add("background-color: pink");
            this.state.checkwish = false;
            console.log("찜 취소")

            WishListService.deleteWishList(this.state.userEmail, this.state.movieDetail.movieId)
                .then((response)=>{
                    console.log("wishlist service :")
                    alert('찜 취소')
                }).catch((error) => {
                    console.log("wishlist error :")
                    console.log(error)
                })
        }
        else{
            this.state.checkwish = true;
            console.log("찜")

            WishListService.addWishList(this.state.userEmail,this.state.movieDetail.movieId)
                .then((response)=>{
                    console.log("wishlist service :")
                    alert("찜꽁")
                }).catch((error) => {
                    console.log("wishlist error :")
                })
        }
    }

    render() {
        const { isLoading, movieDetail, reviewContent} = this.state;
        return (
            <div id='detailpage-content'>
                <div id='gobackbtn'><MdKeyboardArrowLeft id='gobackbtn-icon' onClick={this.goBackBtn}/></div>
                <div id='detailpage-info-box'>
                    { isLoading ? "Loading..." : < MovieDetailTitle title={movieDetail.movieTitle} /> }
                    <div id='detailpage-info-anchor'>
                        <a href='#detailpage-info-majorinfo' className='detailpage-info-anchor-a'>주요 정보</a>
                        <a href='#detailpage-img-trailer' className='detailpage-info-anchor-a'>트레일러</a>
                        <a href='#detailpage-img-stillcut' className='detailpage-info-anchor-a'>스틸컷</a>
                        <a href='#detailpage-review-box' className='detailpage-info-anchor-a'>평점/리뷰</a>
                        <BsBookmarkHeartFill className='detailpage-info-anchor-a' id='detailpage-info-likebtn-icon' onClick={this.handleLWishList}/>
                    </div>
                    <div id='detailpage-info-majorinfo'>
                        <h4 className='detailpage-box-title'><hr className='detailpage-info-hr-left'/>주요 정보<hr className='detailpage-info-hr-right'/></h4>
                        { isLoading ? "Loading..." : 
                                <MovieDetail  key={movieDetail.moviePoster}
                                    poster={movieDetail.moviePoster}
                                    director={movieDetail.movieDirector}
                                    nation={movieDetail.movieNation}
                                    actor={movieDetail.movieActor}
                                    releaseDate={movieDetail.movieReleaseDate}
                                    filmrate={movieDetail.movieFilmrate}
                                    runningTime={movieDetail.movieRunningTime}
                                    genres={movieDetail.movieGenres}
                                    contentBold={movieDetail.movieContentBold}
                                    contentDetail={movieDetail.movieContentDetail} />
                        }
                    </div>
                </div>
                <div id='detailpage-img-box'>
                    <div id='detailpage-img-trailer'>
                        <h4 className='detailpage-box-title'><hr className='detailpage-info-hr-left'/>트레일러<hr className='detailpage-info-hr-right'/></h4>
                        <div className='detailpage-img-table-wrap'>
                            <div className='detailpage-img-table'>
                                <ul>
                                    { isLoading ? "Loading..." : movieDetail.movieTrailer.map( movie => (
                                                <MovieDetailTrailer  key={movie}
                                                    trailer={movie} />
                                    )) }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div id='detailpage-img-stillcut'>
                        <h4 className='detailpage-box-title'><hr className='detailpage-info-hr-left'/>스틸컷<hr className='detailpage-info-hr-right'/></h4>
                        <div className='detailpage-img-table-wrap'>
                            <div className='detailpage-img-table'>
                                <ul>
                                    { isLoading ? "Loading..." : movieDetail.movieStillcut.map( movie => (
                                                <MovieDetailStillcut key={movie}
                                                    stillcut={movie} />
                                    )) }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='detailpage-review-box'>
                    <h4 className='detailpage-box-title'>
                        <hr className='detailpage-info-hr-left'/>
                        평점/리뷰
                        <hr className='detailpage-info-hr-right'/>
                    </h4>
                    <div id='detailpage-reviews-review-table-wrap'>
                        <table id='detailpage-reviews-review-table'>
                            <thead>
                                <tr>
                                    {isLoading ? "Loading..." : 
                                        this.state.reviewContent.length == 0 ? "등록된 리뷰가 없습니다" : reviewContent.map( review => (
                                            <MovieTitleReview  key={review.title}
                                                userNickname={review.user}
                                                title={review.title}
                                            />
                                    ))}
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <br/>
                    <div id='detailpage-reviews-pagecontroller'>
                        <this.goReview />
                    </div>
                </div>
                <div className='detailpage-blank'>
                    <br></br>
                </div>

            </div>
    );
    }
}

export default DetailContent;