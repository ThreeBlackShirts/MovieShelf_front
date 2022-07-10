import React, { useState } from 'react';
import PropTypes from "prop-types";
import MovieService from 'service/MovieService';

// var posterUrl;

function setReviewLocation(movieId) {
    location.href = '/review/' + movieId;
}

function setWishListLocation(movieTitle) {
    localStorage.setItem('target', movieTitle)
    location.href = '/detail'
}

function GetMoviePosterById(movieId){
    console.log(movieId.movieId)
    var posterUrl;
    MovieService
        .detailById(movieId.movieId)
        .then((response) => {
            posterUrl =response.data.data.moviePoster;
            console.log("getMoviePosterById")
            console.log(response.data.data.moviePoster)
            console.log(posterUrl)
            return <div className="userinfo-content-shelf-list-item-pic"><img src={posterUrl}/></div>
            // return posterUrl;
        }).catch(() => {
            console.log("getmoviePosterById error")
            return null;
        })
}

function getMovieById(movieId){
    MovieService
    .detailById(movieId)
    .then((response) => {
        // console.log(response.data.data)
    }).catch(() => {
        console.log("findMovieId failed")
        alert("findMovieId fail");
    }); 
}    


function MyMovieReview({title, movieId}) {
    // let moviePoster = getMoviePosterById(movieId)
    // getMoviePosterById(movieId)
    // getMoviePosterById(movieId)
    return (
        <div className='userinfo-content-shelf-list-item'>
            <a onClick={() => setReviewLocation(movieId)}>
                <GetMoviePosterById key={movieId} movieId = {movieId}/>
                <div className="userinfo-content-shelf-list-item-info">{title}</div>
            </a>
        </div>
    )
}

function MyWishList({movieId}) {
    getMovieById(movieId)
    return (
        <div className='userinfo-content-shelf-list-item'>
            <a>
                <div className="userinfo-content-shelf-list-item-pic"><img/></div>
                <div className="userinfo-content-shelf-list-item-info">{movieId}</div>
            </a>
        </div>
    )
}

/**
 * 
function MyReviewList(reviewId,title) {
    return(
        <div className="userinfo-content-shelf-list-item">
        <a onClick={() => setLocation(title)}>
            <div className="userinfo-content-shelf-list-item-pic"><img src={moviePoster}/></div>
            <div className="userinfo-content-shelf-list-item-info">{titleList[1]}</div>
        </a>
    </div>
    )
}

            <a onClick={() => setWishListLocation(movieTitle)}>
                <div className="userinfo-content-shelf-list-item-pic"><img src={posterUrl}/></div>
                <div className="userinfo-content-shelf-list-item-info">{movieTitle}</div>
            </a>

 */

export { MyMovieReview, MyWishList}
