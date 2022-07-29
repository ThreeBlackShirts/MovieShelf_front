import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import AuthenticationService from 'service/AuthenticationService';
import MovieService from 'service/MovieService';
import ReviewService from 'service/ReviewService';
import {MovieDetailTitle, MovieReview} from './ReviewContents';


import 'style/reviewpage.css';

import { MdKeyboardArrowLeft } from "react-icons/md";
import { BsFileEarmarkPlus } from "react-icons/bs";


const ReviewContents = () => {
    let navigate = useNavigate();
    const [userEmail, setUserEmail] = useState(localStorage.getItem("authenticatedUser") || '');
    const [onLogin] = useState(AuthenticationService.isUserLoggedIn);
    const [isLoading, setIsLoading] = useState(true);
    const [movieId, setMovieId] = useState(useParams().movieid);
    const [movie, setMovie] = useState([]);
    const [reviewContent, setReviewContent] = useState([]);

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

    function GoWriteReview(){
        return(
            <BsFileEarmarkPlus className='moviereview-content-btn-icon' id='moviereview-content-editbtn-icon' title='후기 작성하기' onClick={loginAndReviewCheck}/>
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