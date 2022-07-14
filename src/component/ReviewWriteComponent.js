import React, { Component, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import ReviewService from 'service/ReviewService';

import 'style/writereviewpage.css';

import { MdKeyboardArrowLeft } from "react-icons/md";
import { RiAddFill } from "react-icons/ri";
import { RiSubtractFill } from "react-icons/ri";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";


const WriteReviewComponent = () => {

    const [userEmail, setUserEmail] = useState(localStorage.getItem("authenticatedUser") || '');
    const [token, setToken] = useState(localStorage.getItem("token") || '');
    const [movieId, setMovieId] = useState(useParams().movieid);
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewContent, setReviewContent] = useState("");

    const handleTitleChange = (e) => {
        setReviewTitle(e.target.value)
    };

    const handleContentChange = (e) => {
        setReviewContent(e.target.value)
    };

    function writeReview(){
        if(movieId !== null && movieId !== ""){
            ReviewService
                .writeReview(userEmail, movieId, reviewTitle, reviewContent)
                .then(() => {
                    alert("리뷰가 등록되었습니다!")
                    history.back()
                }).catch(() => {
                    console.log("writeReview failed")
                    alert("writeReview fail");
            });       
        } else {
            console.log("movieId error")
            history.back()
        }
    }

    function goBackBtn(){
        console.log("goback btn clicked!")
        history.back()
    }


    return (
        <div id='writereview-content'>
            <div id='gobackbtn'><MdKeyboardArrowLeft id='gobackbtn-icon' onClick={goBackBtn}/></div>
            <div className='writereview-movieinfo-box'>
                <div className='writereview-movieinfo-info'>
                    <h2>영화 리뷰 작성</h2>
                </div>
                <div className='writereview-movieinfo-div'>
                    <div className='writereview-movieinfo-detail-div'>
                        <div className='writereview-movieinfo-detail'>
                            <div className='writereview-movieinfo-detail-title'>
                                <input id='reviewTitle' name='reviewTitle' value={reviewTitle} placeholder='한줄 후기' type='text' onChange={handleTitleChange}></input>
                            </div>
                            <div className='writereview-movieinfo-detail-rate'>
                                <div className='movieinfo-detail-rating'><RiSubtractFill className='movieinfo-detail-rating-icon'/></div>
                                <div className='rate-fillstart'><AiFillStar className='movieinfo-detail-rating-icon'/></div>
                                <div className='rate-fillstart'><AiFillStar className='movieinfo-detail-rating-icon'/></div>
                                <div className='rate-fillstart'><AiFillStar className='movieinfo-detail-rating-icon'/></div>
                                <div className='rate-fillstart'><AiFillStar className='movieinfo-detail-rating-icon'/></div>
                                <div className='rate-fillstart'><AiFillStar className='movieinfo-detail-rating-icon'/></div>
                                <div className='movieinfo-detail-rating'><RiAddFill className='movieinfo-detail-rating-icon'/></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='writereview-moviereview-box'>
                    <div className='writereview-moviereview-text-wrap'>
                        <textarea className='writereview-moviereview-text' placeholder='영화가 어땠나요?' maxLength="300" name='reviewContent' value={reviewContent} onChange={handleContentChange}>
                            
                        </textarea>
                    </div>

                    <div className='writereview-moviereview-btn-wrap'>
                        <button type='submit' className='writereview-moviereview-btn' onClick={writeReview}>저장</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WriteReviewComponent;