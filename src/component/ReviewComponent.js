import React, { Component, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import MovieService from 'service/MovieService';
import ReviewService from 'service/ReviewService';
import {MovieDetailTitle, MovieReview} from './ReviewContents';


import 'style/reviewpage.css';

import { MdKeyboardArrowLeft } from "react-icons/md";
import { BsFileEarmarkPlus } from "react-icons/bs";


const ReviewContents = () => {

    const [userEmail, setUserEmail] = useState(localStorage.getItem("authenticatedUser") || '');
    const [token, setToken] = useState(localStorage.getItem("token") || '');
    const [isLoading, setIsLoading] = useState(true);
    const [movieId, setMovieId] = useState(useParams().movieid);
    const [movie, setMovie] = useState([]);
    const [reviewContent, setReviewContent] = useState([]);
    const [hasLoginFailed, setHasLoginFailed] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const onClick = () => {
        setReviewContent()
    }

    useEffect(() => {
        if(movieId !== null && movieId !== ""){
            MovieService
                .detailById(movieId)
                .then((response) => {
                    setMovie(response.data.data)
                }).catch(() => {
                    console.log("findMovieId failed")
                    alert("findMovieId fail");
            }); 
            ReviewService
                .findReviewByMovieId(movieId)
                .then((response) => {
                    console.log(response.data.data)
                    setReviewContent(response.data.data)
                    setIsLoading(false)
                }).catch(() => {
                    console.log("findReviewByMovieId failed")
                    alert("findReviewByMovieId fail");
                });       
        } else {
            console.log("movieId error")
            history.back()
        }
    },[]);

    function loginAndReviewCheck(e) {
        if(token == [] || token == null){
            const url = `/login`;
            alert("로그인이 필요합니다")
            location.href="/login"
        }else{
            ReviewService
                .searchReviewByUseremail(userEmail)
                .then((response) => {
                    if(response.data.data !== [] || response.data.data !== null){
                        response.data.data.map( data => {
                            if(data.movieId == movieId){
                                alert("작성한 리뷰가 존재합니다. 수정 페이지로 이동합니다.")
                                location.href=`/review/edit/${data.reviewId}`
                            }
                        })
                    }
                }).catch(() => {
                    console.log("searchReviewByUseremail failed")
                    alert("searchReviewByUseremail fail");
                }); 
        }
    }

    function GoWriteReview(){
        const url = `/review/write/${movieId}`;
        return(
            <Link to={url} className="movie-write-review-link" onClick={loginAndReviewCheck}>
                <BsFileEarmarkPlus className='moviereview-content-btn-icon' id='moviereview-content-editbtn-icon' title='후기 작성하기'/>
            </Link>
        );
    }

    function goBackBtn(){
        console.log("goback btn clicked!")
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
                                            title={movie.movieTitle} />
                                }
                                <div id='reviewpage-moviereview-rate'><span>★ ★ ★ ★ ★</span></div>
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
                        reviewContent.length == 0 ? "등록된 리뷰가 없습니다" : reviewContent.map( review => (
                            <MovieReview  key={review.reviewId}
                                reviewId={review.reviewId}
                                user={userEmail}
                                writer={review.writer}
                                userNickname={review.user}
                                title={review.title}
                                content={review.content} 
                            />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ReviewContents;