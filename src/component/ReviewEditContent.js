import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import ReviewService from 'service/ReviewService';

import 'style/writereviewpage.css';

import { MdKeyboardArrowLeft } from "react-icons/md";
import { RiAddFill } from "react-icons/ri";
import { RiSubtractFill } from "react-icons/ri";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";

const EditReviewContent = () => {

    const [userEmail, setUserEmail] = useState(localStorage.getItem("authenticatedUser") || '');
    const [token, setToken] = useState(localStorage.getItem("token") || '');
    const [reviewId, setReviewId] = useState(useParams().reviewid);
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewContent, setReviewContent] = useState("");

    useEffect(() => {
        if(reviewId !== null && reviewId !== ""){
            ReviewService
                .searchReviewById(reviewId)
                .then((response) => {
                    console.log(response.data.data)
                    setReviewTitle(response.data.data.title)
                    setReviewContent(response.data.data.content)
                }).catch(() => {
                    console.log("searchReviewById failed")
                    alert("searchReviewById fail");
            });    
        } else {
            console.log("reviewId error")
            history.back()
        }
    },[]);

    const handleTitleChange = (e) => {
        setReviewTitle(e.target.value)
    };

    const handleContentChange = (e) => {
        setReviewContent(e.target.value)
    };

    function editReview(){
        console.log("edit review clicked")        
        ReviewService
            .editReview(reviewId, reviewTitle, reviewContent)
            .then(() => {
                alert("수정 완료");
                // location.href=`/review/${movieId}`
                history.back()
            }).catch((error) => {
                console.log("edit error")
            })
        
    } 

    return (
        <div id='writereview-content'>
            <div id='gobackbtn'><MdKeyboardArrowLeft id='gobackbtn-icon'/></div>
            <div className='writereview-movieinfo-box'>
                <div className='writereview-movieinfo-info'>
                    <h2>영화 리뷰 수정하기</h2>
                </div>
                <div className='writereview-movieinfo-div'>
                    <div className='writereview-movieinfo-detail-div'>
                        <div className='writereview-movieinfo-detail'>
                            <div className='writereview-movieinfo-detail-title'>
                                <input id='reviewTitle' placeholder='후기 제목' type='text' value={reviewTitle}  onChange={handleTitleChange}></input>
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
                        <textarea className='writereview-moviereview-text' placeholder='영화가 어땠나요?' maxLength="300" id='reviewContent' value={reviewContent} onChange={handleContentChange}>
                            
                        </textarea>
                    </div>

                    <div className='writereview-moviereview-btn-wrap'>
                        <button type='submit' className='writereview-moviereview-btn' onClick={editReview}>수정</button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default EditReviewContent;