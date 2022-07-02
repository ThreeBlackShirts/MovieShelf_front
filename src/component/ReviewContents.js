import React from "react";
import PropTypes from "prop-types";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";


function setLocation(title) {
    localStorage.setItem('target', title)
    location.href = '/detail'
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

function MovieReview({userNickname, title, content}) {
    return (
        <div className='reviewpage-comment'>
            <div className='reviewpage-comment-user'>
                <div className='reviewpage-comment-user-id'>{userNickname}</div>
            </div>
            <div className='reviewpage-comment-title'>{title}</div>
            <div className='reviewpage-comment-content'>{content}</div>
            <div className='reviewpage-comment-content-btn'>
                <MdEdit className='reviewpage-comment-content-btn-icon'/>
            </div>
            <div className='reviewpage-comment-content-btn'>
                <MdDelete className='reviewpage-comment-content-btn-icon'/>
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
  
export {MovieDetailTitle, MovieReview}
