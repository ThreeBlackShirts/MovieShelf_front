import React from 'react';
import PropTypes from "prop-types";

function setLocation(reviewId) {
    location.href = '/review/' + reviewId;
}


function MyReviewList(reviewId,title) {
    return(
        <div className='userinfo-content-shelf-list-item'>
            <a onClick={() => setLocation(reviewId)}>
                <div className='userinfo-content-shelf-list-item-pic'>{movieId}</div>

                <div className='userinfo-content-shelf-list-item-info'>{title}</div>
            </a>
        </div>
    )
}

//                <div className='userinfo-content-shelf-list-item-pic'><img src={poster}/></div>

/*


function FillBookmark(props){
    return <BsBookmarkHeartFill className='moviereview-content-btn-icon'/>;
}

function EmptyBookmark(props){
    return <BsBookmarkHeart className='moviereview-content-btn-icon'/>
}

function Bookmark(props){
    const isBookmarked = props.isBookmarked;
    if(isBookmarked){   return <FillBookmark />;    }
    else{   return <EmptyBookmark/>;    }
}
*/

export {MyReviewList}