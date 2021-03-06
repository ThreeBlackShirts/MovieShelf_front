import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import {MovieDetailTitle, MovieDetail, MovieDetailTrailer, MovieDetailStillcut} from './MovieContent';
import {MovieTitleReview} from './ReviewContents';
import AuthenticationService from 'service/AuthenticationService';
import MovieService from 'service/MovieService';
import ReviewService from 'service/ReviewService';
import WishListService from 'service/WishListService';
import 'style/detailpage.css';

import { MdKeyboardArrowLeft } from "react-icons/md";
import { BsBookmarkHeartFill } from "react-icons/bs";

const DetailContent = () => {

    const [userEmail, setUserEmail] = useState(localStorage.getItem("authenticatedUser") || '');
    const [onLogin] = useState(AuthenticationService.isUserLoggedIn);
    const [isLoading, setIsLoading] = useState(true);
    const [movieId, setMovieId] = useState(useParams().movieid);
    const [movie, setMovie] = useState([]);
    const [reviewContent, setReviewContent] = useState([]);
    const [checkwish, setCheckwish] = useState(true);

    let wishlistcheck = false;
    let navigate = useNavigate();

        
    useEffect(() => {
        console.log("detail Movie")
        if(movieId !== null && movieId !== ""){
            console.log("target movieId : " +  movieId)
            MovieService
                .detailById(movieId)
                .then((response) => {
                    setMovie(response.data.data)
                    console.log(movie)
                    console.log("Movie Review")
                    ReviewService
                        .findReviewByMovieId(movieId)
                        .then((response) => {
                            setReviewContent(response.data.data.slice(0, 6))
                            setIsLoading(false)
                            console.log(reviewContent)
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
            navigate(-1)
        }
    },[]);

    function goReview() {
        navigate(`/review/${movieId}`)
    }

    function loginAndReviewCheck() {
        if(!onLogin){
            alert("???????????? ???????????????")
            navigate("/login")
        }else{
            ReviewService
                .searchReviewByUseremail(userEmail)
                .then((response) => {
                    if(response.data.data !== [] || response.data.data !== null){
                        let isWrited = false
                        response.data.data.map( data => {
                            if(data.movieId == movieId){
                                isWrited = true
                                alert("????????? ????????? ???????????????. ?????? ???????????? ???????????????.")
                                navigate(`/review/edit/${data.reviewId}`)
                            }
                        })
                        if(!isWrited){
                            navigate(`/review/write/${movieId}`)
                        }
                    } else {
                        navigate(`/review/write/${movieId}`)
                    }
                }).catch(() => {
                    console.log("searchReviewByUseremail failed")
                    alert("searchReviewByUseremail fail");
                }); 
        }
    }

    function handelNull(data) {
        if(data == null){
            return('')
        } else {
            return(data)
        }
    }

    function goBackBtn(){
        console.log("goback btn clicked!")
        navigate(-1)
    }
    
    function GoReview(){
        return(
            <button id='detailpage-reviews-go-review' onClick={goReview}>?????? ?????????</button>
        );
    }

    function GoWriteReview(){
        return(
            <button id='detailpage-reviews-go-write-review' onClick={loginAndReviewCheck}>?????? ????????????</button>
        );
    }
    
    function handleLWishList(){
        // let wishlist = document.getElementById('detailpage-info-likebtn-icon');
        console.log("current this.state.checkwish:" + checkwish)
        // if(checkwish){
        if(wishlistcheck){
            // wishlist.classList.add("background-color: pink");
            // setCheckwish(false)
            wishlistcheck = false
            console.log("??? ??????")

            WishListService.deleteWishList(userEmail, movieId)
                .then((response)=>{
                    console.log("wishlist service :")
                    alert('??? ??????')
                }).catch((error) => {
                    console.log("wishlist error :")
                    console.log(error)
                })
        }
        else{
            // checkwish = true;
            wishlistcheck = true;
            console.log("???")

            WishListService.addWishList(userEmail,movieId)
                .then((response)=>{
                    console.log("wishlist service :")
                    alert("??????")
                }).catch((error) => {
                    console.log("wishlist error :")
                })
        }
    }

    return (
        <div id='detailpage-content'>
            <div id='gobackbtn'><MdKeyboardArrowLeft id='gobackbtn-icon' onClick={goBackBtn}/></div>
            <div id='detailpage-info-box'>
                { isLoading ? "Loading..." : < MovieDetailTitle title={movie.movieTitle} /> }
                <div id='detailpage-info-anchor'>
                    <a href='#detailpage-info-majorinfo' className='detailpage-info-anchor-a'>?????? ??????</a>
                    <a href='#detailpage-img-trailer' className='detailpage-info-anchor-a'>????????????</a>
                    <a href='#detailpage-img-stillcut' className='detailpage-info-anchor-a'>?????????</a>
                    <a href='#detailpage-review-box' className='detailpage-info-anchor-a'>??????/??????</a>
                    <BsBookmarkHeartFill className='detailpage-info-anchor-a' id='detailpage-info-likebtn-icon' onClick={handleLWishList}/>
                </div>
                <div id='detailpage-info-majorinfo'>
                    <h4 className='detailpage-box-title'><hr className='detailpage-info-hr-left'/>?????? ??????<hr className='detailpage-info-hr-right'/></h4>
                    { isLoading ? "Loading..." : 
                            <MovieDetail  key={movie.moviePoster}
                                poster={handelNull(movie.moviePoster)}
                                director={handelNull(movie.movieDirector)}
                                nation={handelNull(movie.movieNation)}
                                actor={handelNull(movie.movieActor)}
                                releaseDate={handelNull(movie.movieReleaseDate)}
                                filmrate={handelNull(movie.movieFilmrate)}
                                runningTime={handelNull(movie.movieRunningTime)}
                                genres={handelNull(movie.movieGenres)}
                                contentBold={handelNull(movie.movieContentBold)}
                                contentDetail={handelNull(movie.movieContentDetail)} />
                    }
                </div>
            </div>
            <div id='detailpage-img-box'>
                { isLoading ? "Loading..." : movie.movieTrailer.length===0 ? null : (
                    <div id='detailpage-img-trailer'>
                        <h4 className='detailpage-box-title'><hr className='detailpage-info-hr-left'/>????????????<hr className='detailpage-info-hr-right'/></h4>
                        <div className='detailpage-img-table-wrap'>
                            <div className='detailpage-img-table'>
                                <ul>
                                { movie.movieTrailer.map( movie => (
                                            <MovieDetailTrailer  key={movie}
                                                trailer={movie} />
                                )) }
                                </ul>
                            </div>
                        </div>
                    </div>
                ) }
                { isLoading ? "Loading..." : movie.movieTrailer.length===0 ? null : (
                    <div id='detailpage-img-stillcut'>
                        <h4 className='detailpage-box-title'><hr className='detailpage-info-hr-left'/>?????????<hr className='detailpage-info-hr-right'/></h4>
                        <div className='detailpage-img-table-wrap'>
                            <div className='detailpage-img-table'>
                                <ul>
                                    { movie.movieStillcut.map( movie => (
                                            <MovieDetailStillcut key={movie}
                                                stillcut={movie} />
                                    )) }
                                </ul>
                            </div>
                        </div>
                    </div>
                ) }
            </div>
            <div id='detailpage-review-box'>
                <h4 className='detailpage-box-title'>
                    <hr className='detailpage-info-hr-left'/>
                    ??????/??????
                    <hr className='detailpage-info-hr-right'/>
                </h4>
                <div id='detailpage-reviews-review-table-wrap'>
                    <table id='detailpage-reviews-review-table'>
                        <thead>
                            <tr>
                                {isLoading ? "Loading..." : 
                                    reviewContent.length == 0 ? "????????? ????????? ????????????" : reviewContent.map( review => (
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
                    <GoReview /> <GoWriteReview />
                </div>
            </div>
            <div className='detailpage-blank'>
                <br></br>
            </div>

        </div>
    );

}

export default DetailContent;