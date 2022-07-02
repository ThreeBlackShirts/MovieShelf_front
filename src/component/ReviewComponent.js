import React, { Component, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import MovieService from 'service/MovieService';
import ReviewService from 'service/ReviewService';
import {MovieDetailTitle, MovieReview} from './ReviewContents';


import 'style/reviewpage.css';

import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import { BsBookmarkHeartFill } from "react-icons/bs";
import { BsBookmarkHeart } from "react-icons/bs";


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

    function SetReview(){
        if(setReviewContent !== null && setReviewContent !== []){
            return <span id='reviewpage-comment-nothing'>등록된 리뷰가 없습니다</span>
        }
        else{
            return (
                <MovieReview  key={reviewContent.title}
                    userNickname={reviewContent.user.userNickname}
                    title={reviewContent.title}
                    content={reviewContent.content} 
                />
            );
        }
    }

    function deleteReview(){
        console.log("delete review clicked")
        ReviewService.deleteReview(this.state.reviewId)
            .then(()=> {
                alert("삭제 완료");
                document.location.href="/userinfo";
            }).catch((error) => {
                console.log(error.response)
            });
    }

    function loginCheck(e) {
        if(this.state.token == [] || this.state.token == null){
            const url = `/login`;
            alert("로그인이 필요합니다")
            location.href="/login"
        }
    }

    function GoWriteReview(){
        const url = `/writereview/${movieId}`;
        return(
            <Link to={url} className="movie-write-review-link" onClick={loginCheck}>
                <MdEdit className='moviereview-content-btn-icon' id='moviereview-content-editbtn-icon'/>
            </Link>
        );
    }

    function toEditReview(){
        //document.location.href = '/editreview' + this.state.reviewId;
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
                                <div className='moviereview-content-btn'>
                                    <MdDelete className='moviereview-content-btn-icon' id='moviereview-content-delbtn-icon' onClick={deleteReview}/>
                                </div>
                                <div className='moviereview-content-btn'>
                                    <BsBookmarkHeart className='moviereview-content-btn-icon' id='moviereview-content-likebtn-icon'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr id='reviewpage-hr'/>
                <div id='reviewpage-comment-wrap'>
                    {isLoading ? "Loading..." : 
                        setReviewContent == null || setReviewContent == [] ? "등록된 리뷰가 없습니다" : reviewContent.map( review => (
                            <MovieReview  key={review.title}
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