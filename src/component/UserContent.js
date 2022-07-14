import React, { Component, useEffect, useState } from 'react';
import UserService from 'service/UserService';
import { CgProfile } from "react-icons/cg";

import ReviewService from 'service/ReviewService';
import WishListService from 'service/WishListService';
import {MyMovieReview, MyWishList} from './UserReviewContent';

import MovieService from 'service/MovieService';


const UserContent = () => {

    const [users, setUsers] = useState([]);
    const [reviewData, setReviewData] = useState([]);
    const [wishListData, setWishListData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        UserService
            .findUserByEmail(localStorage.getItem("authenticatedUser"))
            .then((response) => {
                console.log("userservice: ")
                console.log(response.data.data)
                setUsers(response.data.data);
            }).catch((error) => {
                console.log(error.response)
            });
            searchAllReview();
            searchAllWishList();
    },[]);    
    
    function searchAllReview(){
        ReviewService
            .searchReviewByUseremail(localStorage.getItem("authenticatedUser"))
            .then((response) => {
                console.log("searchMyReview success")
                setReviewData(response.data.data)
                console.log("ReviewService")
                console.log(reviewData)

                setIsLoading(false)
            }).catch((error) => {
                console.log("review error")
            });
    }

    function searchAllWishList(){
       WishListService
            .searchWishListByUserEmail(localStorage.getItem("authenticatedUser"))
            .then((response) => {
                setWishListData(response.data.data)
                console.log("WishListService: ")
                console.log(wishListData)

                setIsLoading(false)
            }).catch((error) => {
                console.log("review error")
            });
    }

    /**
        function sliceReviewData(data){
        // setReviewData(response.data.data)
        console.log("sliceReviewData");
        for(var i = 0; i < data.length; i++)
        {
            reviewIdList[i] = data[i].reviewId;
            movieIdList[i] = data[i].movieId;
            
            titleList[i] = data[i].title;
            // moviePoster[i] = getMovieById(movieIdList[i]);
            getMovieById(movieIdList[i],i);
            console.log(titleList[i] + "(" +reviewIdList[i]+ ")" + ":" + movieIdList[i], );
            // console.log("moviePoster :")
            // console.log(moviePoster[i]);
        }
    }
    
    function getMovieById(movieId){
        MovieService
        .detailById(movieId)
        .then((response) => {
            console.log(response.data.data)
            setMovieData(response.data.data)
        }).catch(() => {
            console.log("findMovieId failed")
            alert("findMovieId fail");
        }); 
    }

    function getMoviePosterById(movieId){
        MovieService
            .detailById(movieId)
            .then((response) => {
                console.log("getting movie poster")
                return response.data.data.moviePoster;
            }).catch(() => {
                console.log("getmoviePosterById error")
            })
    }
     */

    function toUserSetting(){
        window.location.href="/usersetting"
    }

    return (
        <div className='userinfo-content'>
            <div className="userinfo-content-info">
                <div className="userinfo-content-info-profile">
                    <div><CgProfile className="userinfo-content-info-profile-img"/></div>
                    <div id={users.userNickame} key={users.userNickame}>
                        {users.userNickname}
                    </div>
                </div>
                <div className="userinfo-content-info-sub">
                    <table>
                        <thead></thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div id={users.userName} key={users.userName}>
                                        {users.userName}
                                    </div>
                                </td>
                                <td><a onClick={toUserSetting}>내 정보 수정</a></td>
                            </tr>
                            <tr>
                                <td>내 책장 속 영화: <span id={reviewData.length} key={reviewData.length}>{reviewData.length}</span>개</td>
                                <td>찜한 영화: <span id={wishListData.length} key={wishListData.length}>{wishListData.length}</span>개</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
            <div className="userinfo-content-shelf">
                <div className="userinfo-content-shelf-list">
                    <div className='userinfo-content-shelf-list-name'>후기를 작성한 영화</div>
                    <div className='userinfo-content-shelf-list-item-wrap'>
                        {isLoading ? "Loading..." : 
                        reviewData.length == 0 ? "등록된 후기가 없습니다." : reviewData.map( review => (
                            <MyMovieReview  key={review.reviewId}
                                movieId={review.movieId}
                                title={review.title}
                                moviePoster={review.moviePoster} 
                            />
                        ))}

                    </div>
                </div>

                <div className="userinfo-content-shelf-list">
                    <div className='userinfo-content-shelf-list-name'>마음에 드는 영화</div>
                    <div className='userinfo-content-shelf-list-item-wrap'>
                    {isLoading ? "Loading..." : 
                        wishListData.length == 0 ? "등록된 리뷰가 없습니다" : wishListData.map( wishlist => (
                            <MyWishList  key={wishlist.movieId}
                                movieId ={wishlist.movieId}
                                movieTitle ={wishlist.movieTitle}
                                moviePoster = {wishlist.moviePoster}
                            />
                        ))}

                        
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default UserContent;


/**


                        <div className='userinfo-content-shelf-list-item'>
                            <div className='userinfo-content-shelf-list-item-pic' id={moviePoster[0]} key={moviePoster[0]}>    
                                <img src={moviePoster[0]}/></div>
                            <div className='userinfo-content-shelf-list-item-info'>{titleList[0]}    </div>
                        </div>
                        <div className='userinfo-content-shelf-list-item'>
                            <div className='userinfo-content-shelf-list-item-pic' id={moviePoster[1]} key={moviePoster[1]}>
                            <img src={moviePoster[1]}/></div>
                            <div className='userinfo-content-shelf-list-item-info'>{titleList[1]}    </div>
                        </div>
 * 
 * 
 * 
 *                             {reviewData.length == 0 
                                    ? "등록된 리뷰가 없습니다"  : reviewData.map( review => (
                                <MyReviewList  key={review.reviewId}
                                    title={review.title}
                                    movieId={review.movieId} 
                                />
                            ))}

                                {reviewData.length = 0  ? "등록된 리뷰가 없습니다" : reviewData.data.map(reviews => (
                                    <MyReviewList key = {reviews.reviewId}
                                    reviewId={reviews.reviewId}
                                    title={reviews.title}
                                    />
                            ))}
 */