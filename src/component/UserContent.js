import React, { Component, useEffect, useState } from 'react';
import UserService from 'service/UserService';
import { CgProfile } from "react-icons/cg";
import { MdAdd } from "react-icons/md";

import ReviewService from 'service/ReviewService';

import {MyReviewList} from './UserReviewContent';

import MovieService from 'service/MovieService';


const UserContent = () => {

    const [users, setUsers] = useState([]);
    const [reviewData, setReviewData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);

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

        ReviewService
            .searchReviewByUseremail(localStorage.getItem("authenticatedUser"))
            .then((response) => {
                console.log("searchMyReview success")
                setReviewData(response.data.data)
                console.log("ReviewService: ")
                console.log(response.data.data)
                console.log(reviewData)
//                console.log(reviewData.length)
//                console.log(reviewData[0].title)
                setIsLoading(false)
                sliceReviewData(reviewData)

            }).catch((error) => {
                console.log("review error")
   //             console.log(error.response)
            });

            console.log("getMovieById");
            console.log(reviewData)

            
            for( let i =0;i<reviewData.length;i++)
            {
                getMovieById(reviewData[i].movieId);
            }

            MovieService
            .detailById(reviewData[0].movieId)
            .then((response) => {
                console.log(response.data.data)
                setMovie(response.data.data)
            }).catch(() => {
                console.log("findMovieId failed")
                alert("findMovieId fail");
            }); 

            console.log("-------movie data: "+ movie +"-------");

    },[]);

    function sliceReviewData(data){
        let reviewId={};
        let movieId={};
        let user={};
        let title={};
        console.log("sliceReviewData");
        for(let i = 0; i < data.length; i++)
        {
            reviewId[i] = data[i].reviewId;
            movieId[i] = data[i].movieId;
            user[i] = data[i].user;
            title[i] = data[i].title;
            console.log(reviewId[i]);
        }
    }


    function getMovieById(movieId){
        console.log("getMovieById");
        MovieService
        .detailById(movieId)
        .then((response) => {
            console.log(response.data.data)
            setMovie(response.data.data)
        }).catch(() => {
            console.log("findMovieId failed")
            alert("findMovieId fail");
        }); 
    }

    /*
    function searchAllReview(){
        ReviewService
            .searchAllReview()
            .then((response) => {
                console.log("success")
                console.log(response.data)
            }).catch((error) => {
                console.log("error")
                console.log(error.response)
            })
    }

    */

    /**
        function toWriteReview(){
            window.location.href="/writereview"
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
                                <td>내 책장 속 영화: <span>N1</span>개</td>
                                <td>리뷰한 영화: <span>N2</span>개</td>
                            </tr>
                        </tbody>
                        
                    </table>
                    
                </div>
            </div>
            <div className="userinfo-content-shelf">
                <div className="userinfo-content-shelf-list">
                    <div className='userinfo-content-shelf-list-name'>후기를 작성한 영화</div>
                    <div className='userinfo-content-shelf-list-item-wrap'>

                        <div className='userinfo-content-shelf-list-item'>
                        
                        </div>
                    </div>
                </div>


                <div className="userinfo-content-shelf-list">
                    <div className='userinfo-content-shelf-list-name'>마음에 드는 영화</div>
                    <div className='userinfo-content-shelf-list-item-wrap'>
                        <div className='userinfo-content-shelf-list-item'>
                            <div className='userinfo-content-shelf-list-item-pic'></div>
                            <div className='userinfo-content-shelf-list-item-info'></div>
                        </div>
                    </div>
                </div>


            </div>
            
        </div>
    )
}

export default UserContent;

//<MdAdd className='shelf-contents-object-icon' onClick={toWriteReview}/>

/**
 *                 <div className="userinfo-content-shelf-list">
                    <div className='userinfo-content-shelf-list-name'>마음에 드는 후기</div>
                    <div className='userinfo-content-shelf-list-item-wrap'>
                        <div className='userinfo-content-shelf-list-item'>
                            <div className='userinfo-content-shelf-list-item-pic'></div>
                            <div className='userinfo-content-shelf-list-item-info'></div>
                        </div>
                    </div>
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

 */