import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import ReviewService from 'service/ReviewService';
import MovieRatingService from 'service/MovieRatingService';

import 'style/writereviewpage.css';

import { MdKeyboardArrowLeft } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";

const EditReviewContent = () => {
    let navigate = useNavigate();
    const [userEmail] = useState(localStorage.getItem("authenticatedUser") || '');
    const [reviewId] = useState(useParams().reviewid);
    const [movieId] = useState(useParams().movieid);
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewContent, setReviewContent] = useState("");
    const [movieRate, setMovieRate] = useState(0);
    const [clicked, setClicked] = useState([false, false, false, false, false]);

    useEffect(() => {
        if(reviewId !== null && reviewId !== ""){
            ReviewService
                .searchReviewById(reviewId)
                .then((response) => {
                    setReviewTitle(response.data.data.title)
                    setReviewContent(response.data.data.content)
                }).catch(() => {
                    alert("searchReviewById fail");
            });    
        } else {
            navigate(-1)
        }
    },[]);

    const handleTitleChange = (e) => {
        setReviewTitle(e.target.value)
    };

    const handleContentChange = (e) => {
        setReviewContent(e.target.value)
    };

    function handleRateChange(rateData){
        let clickStates = [...clicked]
        for (let i = 0; i < 5; i++) {
          clickStates[i] = i <= rateData ? true : false;
        }
        setClicked(clickStates)
        setMovieRate(rateData+1)
    }

    function editReview(){
        if(reviewTitle == "" || reviewContent == "") {
            alert("리뷰 제목과 내용 모두 입력해주세요!")
        } else {    
            ReviewService
                .editReview(reviewId, reviewTitle, reviewContent)
                .then(() => {
                    MovieRatingService.updateRate(userEmail, movieId, movieRate)
                        .then(() => {
                            alert("리뷰 수정이 완료되었습니다.")
                            navigate(-1)
                        }).catch(() => {
                            alert("editRate fail")
                    });
                }).catch((error) => {
                    console.log(error)
                })
        }
        
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
                                {[0,1,2,3,4].map((el) => (
                                    <AiFillStar
                                        key={el}
                                        onClick={() => handleRateChange(el)}
                                        className={`rate-fillstart movieinfo-detail-rating-icon ${clicked[el] && 'rate-fillstart-yellow'}`}
                                        size="30"
                                    />
                                ))}
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