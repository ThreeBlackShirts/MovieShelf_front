import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import ReviewService from 'service/ReviewService';

import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";

import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import { BsBookmarkHeartFill } from "react-icons/bs";
import { BsBookmarkHeart } from "react-icons/bs";

import 'style/reviewpage.css';

function GoEditReview(data){
    const url = `/review/edit/${data.reviewId}`;
    return(
        <Link to={url} className="movie-edit-review-link">
            <MdEdit className='reviewpage-comment-content-btn-icon' id='moviereview-content-editbtn-icon'/>
        </Link>
    );
}

function DeleteReview(reviewId){
    console.log("delete review clicked")
    ReviewService.deleteReview(reviewId)
        .then(()=> {
            alert("리뷰가 삭제되었습니다.");
            location.reload()
        }).catch((error) => {
            console.log(error.response)
        });
}

function MovieTitleReview({userNickname, title}) {
    return (
        <td className='detailpage-reviews-review'>
            <div className='detailpage-reviews-review-profile'>
                <div className='detailpage-reviews-review-profile-name'>{userNickname}</div>
                <div className='detailpage-reviews-review-content-rating'>★★★★★</div>
            </div>
            <div className='detailpage-reviews-review-content'>
                <div className='detailpage-reviews-review-content-text'>{title}</div>
            </div>
        </td>
    )
}

function MovieDetailTitle({title}) {
    return (
        <div id='reviewpage-moviereview-movieinfo-header-title'>{title}</div>
    )
}

function WriterCheck(info){
    return(            
        <div className='reviewpage-comment-content-btn-div'>                
            <div className='reviewpage-comment-content-btn'>
                <GoEditReview 
                    reviewId={info.reviewId}/>
            </div>
            <div className='reviewpage-comment-content-btn'>
                <MdDelete className='reviewpage-comment-content-btn-icon' onClick={() => DeleteReview(info.reviewId)}/>
            </div>
        </div>
    )
}

function MovieReview({reviewId, writer, user, userNickname, title, content}) {
    return (
        <div className='reviewpage-comment'>
            <div className='reviewpage-comment-user'>
                <div className='reviewpage-comment-user-id'>{userNickname}</div>
            </div>
            <div className='reviewpage-comment-title'>{title}</div>
            <div className='reviewpage-comment-content'>{content}</div>
            {writer !== user ? "" : <WriterCheck reviewId={reviewId} /> }
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
