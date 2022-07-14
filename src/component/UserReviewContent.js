import React, { useState } from 'react';
import PropTypes from "prop-types";
import MovieService from 'service/MovieService';

function setReviewLocation(movieId) {
    location.href = '/review/' + movieId;
}

function setWishListLocation(movieId) {
    location.href = `/detail/${movieId}`
}


// function getMoviePosterById(movieId){
//     // var posterUrl;
//     MovieService
//         .detailById(movieId)
//         .then((response) => {
//             console.log("moviePoster URL :" + response.data.data.moviePoster)
//             posterUrl[count] =response.data.data.moviePoster;
//             console.log(count)
//             count++;

//             return posterUrl[count-1];
            
//             // return posterUrl;
//         }).catch(() => {
//             console.log("getmoviePosterById error")
//             return null
//         })
// }

function getMovieById(movieId){
    MovieService
    .detailById(movieId)
    .then((response) => {
        // console.log(response.data.data.movieTitle)
        titles[count] = response.data.data.movieTitle
        console.log(titles[count])
        // return titles[count++]
    }).catch(() => {
        console.log("findMovieId failed")
        alert("findMovieId fail");
    }); 
}    


function MyMovieReview({movieId, title, moviePoster}) {
    //, moviePoster
    return (
        <div className='userinfo-content-shelf-list-item'>
            <a onClick={() => setReviewLocation(movieId)}>
                <div className="userinfo-content-shelf-list-item-pic"><img src={moviePoster}/></div>
                <div className="userinfo-content-shelf-list-item-info">{title}</div>
            </a>
        </div>
    )
}

function MyWishList({movieId, movieTitle, moviePoster}) {
    return (
        <div className='userinfo-content-shelf-list-item'>
            <a onClick={() => setWishListLocation(movieId)}>
                <div className="userinfo-content-shelf-list-item-pic"><img src={moviePoster}/></div>
                <div className="userinfo-content-shelf-list-item-info">{movieTitle}</div>
            </a>
        </div>
    )
}


export { MyMovieReview, MyWishList}