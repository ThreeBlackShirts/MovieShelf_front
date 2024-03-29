import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import AuthenticationService from 'service/AuthenticationService';
import MovieService from 'service/MovieService';
import ReviewService from 'service/ReviewService';
import LikeService from 'service/LikeService';
import MovieRatingService from 'service/MovieRatingService';
import {MovieDetailTitle, MovieReview} from './ReviewContents';
import * as MovieRateUtil from "./MovieRateUtil";


import 'style/reviewpage.css';

import { MdKeyboardArrowLeft } from "react-icons/md";
import { BsFileEarmarkPlus } from "react-icons/bs";


const ReviewContents = () => {
    let navigate = useNavigate();
    const [userEmail] = useState(localStorage.getItem("authenticatedUser") || '');
    const [onLogin] = useState(AuthenticationService.isUserLoggedIn);
    const [isLoading, setIsLoading] = useState(true);
    const [movieId] = useState(useParams().movieid);
    const [movie, setMovie] = useState([]);
    const [reviewContent, setReviewContent] = useState([]);
    const [reviewHeart, setReviewHeart] = useState([]);
    const [reviewRate, setReviewRate] = useState([]);

    useEffect(() => {
        if(movieId !== null && movieId !== ""){
            MovieService
                .detailById(movieId)
                .then((response) => {
                    setMovie(response.data.data)
                }).catch(() => {
                    alert("findMovieId fail");
            }); 
            ReviewService
                .findReviewByMovieId(movieId)
                .then((response) => {
                    setReviewContent(response.data.data)
                    let dataLength = response.data.data.length
                    let rateData = []
                    response.data.data.length == 0 ? setIsLoading(false) : response.data.data.map( review => (
                        MovieRatingService.findRate(review.writer, movieId)
                            .then((response) => {
                                rateData.push({reviewWriter: review.writer, rate: response.data.data.movieRate})
                                
                                if(dataLength === rateData.length){
                                    setReviewRate(rateData)
                                }
                            }).catch((error) => {
                                console.log(error)
                            })
                    ))
                    let data = []
                    !onLogin ? setIsLoading(false) : response.data.data.length == 0 ? setIsLoading(false) : response.data.data.map( review => (
                        LikeService.isLike(userEmail, review.reviewId)
                            .then((response)=>{
                                if(response.data.data === true){
                                    data.push({reviewId: review.reviewId, isheart: true})
                                }
                                else{
                                    data.push({reviewId: review.reviewId, isheart: false})
                                }
                                if(dataLength === data.length){
                                    setReviewHeart(data)
                                    setIsLoading(false)
                                }
                            }).catch((error) => {
                                console.log(error)
                            })
                    ))
                }).catch(() => {
                    alert("findReviewByMovieId fail");
                });       
        } else {
            history.back()
        }
    },[]);

    function loginAndReviewCheck(e) {
        if(!onLogin){
            alert("로그인이 필요합니다")
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
                                alert("작성한 리뷰가 존재합니다. 수정 페이지로 이동합니다.")
                                navigate(`/review/edit/${movieId}/${data.reviewId}`)
                            }
                        })
                        if(!isWrited){
                            navigate(`/review/write/${movieId}`)
                        }
                    } else {
                        navigate(`/review/write/${movieId}`)
                    }
                }).catch(() => {
                    alert("searchReviewByUseremail fail");
                }); 
        }
    }

    function handleLReviewLike(reviewId) {
        if(!onLogin){
            alert("로그인이 필요합니다")
            navigate("/login")
        }else{
            let heart = false
            reviewHeart.map( data =>
                data.reviewId === reviewId ? data.isheart === true ? heart = true : null : null
            )
            if(heart){
                LikeService.deleteLike(userEmail, reviewId)
                    .then((response)=>{
                        setReviewHeart(
                            reviewHeart.map( data =>
                                data.reviewId === reviewId ? { ...data, isheart: !data.isheart } : data
                            )
                        )
                        setReviewContent(
                            reviewContent.map( data =>
                                data.reviewId === reviewId ? { ...data, like: data.like-1 } : data
                            )
                        )
                    }).catch((error) => {
                        console.log(error)
                    })
            }
            else{
                LikeService.addLike(userEmail, reviewId)
                    .then((response)=>{
                        setReviewHeart(
                            reviewHeart.map( data =>
                                data.reviewId === reviewId ? { ...data, isheart: !data.isheart } : data
                            )
                        )
                        setReviewContent(
                            reviewContent.map( data =>
                                data.reviewId === reviewId ? { ...data, like: data.like+1 } : data
                            )
                        )
                    }).catch((error) => {
                        console.log(error)
                    })
            }
        }
    }

    function isheartCheck(reviewId) {
        let heart = false 
        reviewHeart.map( data =>
            data.reviewId === reviewId ? data.isheart === true ? heart = true : null : null
        )
        return heart
    }

    function reviewRateCheck(reviewWriter) {
        let rate = 0;
        reviewRate.map( data =>
            data.reviewWriter === reviewWriter ? rate = data.rate : null
        )
        return rate
    }

    function handelNull(data) {
        if(data == null){
            return('')
        } else {
            return(data)
        }
    }

    function GoWriteReview(){
        return(
            <BsFileEarmarkPlus className='moviereview-content-btn-icon' id='moviereview-content-editbtn-icon' title='후기 작성하기' onClick={loginAndReviewCheck}/>
        );
    }

    function goBackBtn(){
        history.back()
    }


    return (
        <div id='reviewpage-content'>
            <div id='gobackbtn'><MdKeyboardArrowLeft id='gobackbtn-icon'  onClick={goBackBtn}/></div>
            <div id='reviewpage-wrap'>
                <div id='reviewpage-moviereview'>
                    <div id='reviewpage-moviereview-movieinfo'>
                        <div id='reviewpage-moviereview-movieinfo-header'>
                            <div id='reviewpage-moviereview-movieinfo-detail'>
                                { isLoading ? "Loading..." : 
                                        <MovieDetailTitle  key={movie.movieTitle}
                                            title={handelNull(movie.movieTitle)} />
                                }
                                <div id='reviewpage-moviereview-rate'><span><MovieRateUtil.MovieRateView rate={movie.movieRate}/></span></div>
                            </div>
                            <div className='moview-content-btn-div'>
                                <div className='moviereview-content-btn'>
                                    <GoWriteReview />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr id='reviewpage-hr'/>
                <div id='reviewpage-comment-wrap'>
                    {isLoading ? "Loading..." : 
                        reviewContent.length == 0 ? <div id='reviewpage-comment-none'>등록된 리뷰가 없습니다</div> : reviewContent.map( review => (
                            <MovieReview  key={review.reviewId}
                                reviewId={review.reviewId}
                                movieId={movieId}
                                user={userEmail}
                                writer={review.writer}
                                userNickname={review.user}
                                title={handelNull(review.title)}
                                rate={reviewRateCheck(review.writer)}
                                content={handelNull(review.content)} 
                                likeCount={review.like}
                                isheart={isheartCheck(review.reviewId)}
                                handleLReviewLike={handleLReviewLike}
                            />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ReviewContents;