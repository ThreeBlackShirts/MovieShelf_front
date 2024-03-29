import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import ReviewService from 'service/ReviewService';
import * as MovieRateUtil from "./MovieRateUtil";

import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

import 'style/reviewpage.css';
import 'style/detailpage.css';
import MovieRatingService from "service/MovieRatingService";

function GoEditReview(data){
    const url = `/review/edit/${data.movieId}/${data.reviewId}`;
    return(
        <Link to={url} className="movie-edit-review-link">
            <MdEdit className='reviewpage-comment-content-btn-icon' id='moviereview-content-editbtn-icon' title="후기 수정"/>
        </Link>
    );
}

function DeleteReview(info){
    if(confirm("리뷰를 삭제하시겠습니까?") == true) {
    ReviewService.deleteReview(info.reviewId)
        .then(()=> {
            MovieRatingService.deleteRate(info.userEmail, info.movieId)
                .then(()=> {
                    alert("리뷰가 삭제되었습니다.");
                    location.reload()
                }).catch((error) => {
                    console.log(error.response)
                });
        }).catch((error) => {
            console.log(error.response)
        });
    }
}

function MovieTitleReview({reviewId, userNickname, title, rate, likeCount, isheart, handleLReviewLike}) {
    return (
        <div className='detailpage-reviews-review'>
            <div className='detailpage-reviews-review-profile'>
                <div className='detailpage-reviews-review-profile-name'>{userNickname}</div>
                <div className='detailpage-reviews-review-content-rating'><MovieRateUtil.MovieRateView rate={rate}/></div>
            </div>
            <div className='detailpage-reviews-review-content'>
                <div className='detailpage-reviews-review-content-text'>{title}</div>
            </div>
            <div className='detailpage-reviews-review-like'>
                {isheart && <FaHeart className='detailpage-reviews-review-content-like' title="리뷰 좋아요 취소" onClick={() => handleLReviewLike(reviewId)}/>}
                {!isheart && <FaRegHeart className='detailpage-reviews-review-content-like' title="리뷰 좋아요" onClick={() => handleLReviewLike(reviewId)}/>}
                <div className='detailpage-reviews-review-content-like-count'>{likeCount}</div>
            </div>
        </div>
    )
}

function MovieDetailTitle({title}) {
    return (
        <div id='reviewpage-moviereview-movieinfo-header-title'>{title}</div>
    )
}

function WriterCheck(info){
    return(            
        <div className='reviewpage-comment-content-btn-wrap'>                
            <div className='reviewpage-comment-content-btn'>
                <GoEditReview 
                    reviewId={info.reviewId} movieId={info.movieId}/>
            </div>
            <div className='reviewpage-comment-content-btn'>
                <MdDelete className='reviewpage-comment-content-btn-icon' id="moviereview-content-deletebtn-icon" title="후기 삭제" onClick={() => DeleteReview(info)}/>
            </div>
        </div>
    )
}

function MovieReview({reviewId, movieId, writer, user, userNickname, title, rate, content, likeCount, isheart, handleLReviewLike}) {
    return (
        <div className='reviewpage-comment'>

            <div className="reviewpage-comment-header">
                <div className='reviewpage-comment-user'>
                    <div className='reviewpage-comment-user-id'>{userNickname}</div>
                    <div className='reviewpage-comment-user-rating'><MovieRateUtil.MovieRateView rate={rate}/></div>
                </div>
                <div className='reviewpage-comment-title'>{ title == '' ? "제목 없음" : title }</div>
                
                <div className="reviewpage-comment-content-userbtn-div">
                    {writer !== user ? "" : <WriterCheck reviewId={reviewId} movieId={movieId} userEmail={writer} /> }
                </div>
                <div className='reviewpage-comment-content-likebtn-div'> 
                    <div className='reviewpage-comment-content-btn'>
                        {isheart && <FaHeart className='detailpage-reviews-review-content-like' title="리뷰 좋아요 취소" onClick={() => handleLReviewLike(reviewId)}/>}
                        {!isheart && <FaRegHeart className='detailpage-reviews-review-content-like' title="리뷰 좋아요" onClick={() => handleLReviewLike(reviewId)}/>}
                        <div className='detailpage-reviews-review-content-like-count'>{likeCount}</div>
                    </div>
                </div>
            </div>
            <div className="reviewpage-comment-main">
                <div className='reviewpage-comment-content'>{ content == '' ? "작성된 내용이 없습니다." : content }</div>
            </div>

        </div>
    )
}

MovieDetailTitle.propTypes = {
    title: PropTypes.string.isRequired
}

MovieReview.propTypes = {
    userNickname: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
}
  
export {MovieTitleReview, MovieDetailTitle, MovieReview}
