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
    const [moviePoster, setMoviePoster] = useState([]);

    const [reviewIdList,setReviewIdList] = useState([]);
    const [movieIdList,setMovieIdList] = useState([]);
    const [userList,setUserList] = useState([]);
    const [titleList,setTitleList] = useState([]);

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
                console.log(reviewData)

                
                setIsLoading(false)
                sliceReviewData(reviewData)

            }).catch((error) => {
                console.log("review error")
   //             console.log(error.response)
            });

            // for( let i =0;i<reviewData.length;i++)
            // {
            //     getMovieById(reviewData[i].movieId);
            // }

    },[]);
    
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

    function sliceReviewData(data){
        // setReviewData(response.data.data)
        console.log("sliceReviewData");
        for(var i = 0; i < data.length; i++)
        {
            reviewIdList[i] = data[i].reviewId;
            movieIdList[i] = data[i].movieId;
            userList[i] = data[i].user;
            titleList[i] = data[i].title;
            moviePoster[i] = getMovieById(movieIdList[i]);
            // getMovieById(movieIdList[i]);
            // console.log(titleList[i] + "(" +reviewIdList[i]+ ")" + ":" + movieIdList[i], );
            console.log("moviePoster :")
            console.log(moviePoster[i]);

        }
    }

    function getMovieById(movieId){
        // var temp;
        // console.log("getMovieById");
        MovieService
        .detailById(movieId)
        .then((response) => {
            // console.log(response.data.data)
            console.log(response.data.data.moviePoster)
            // temp = response.data.data.moviePoster
            // console.log("moviePoster : " + temp)
            return response.data.data.moviePoster;
        }).catch(() => {
            console.log("findMovieId failed")
            alert("findMovieId fail");
        }); 
    }    

    function setLocation(reviewId) {
        location.href = '/review/' + reviewId;
    }

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
                                <td>리뷰한 영화: <span id={reviewData.length} key={reviewData.length}>{reviewData.length}</span>개</td>
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
                            <div className='userinfo-content-shelf-list-item-pic' id={moviePoster[0]} key={moviePoster[0]}> {moviePoster[0]}    
                                <img src={moviePoster}/></div>
                            <div className='userinfo-content-shelf-list-item-info'>{titleList[0]}    </div>
                        </div>
                        <div className='userinfo-content-shelf-list-item'>
                            <div className='userinfo-content-shelf-list-item-pic' id={moviePoster[1]} key={moviePoster[1]}>  {moviePoster[1]}    </div>
                            <div className='userinfo-content-shelf-list-item-info'>{titleList[1]}    </div>
                        </div>
                        <div className="userinfo-content-shelf-list-item">
                            <a onClick={() => setLocation(reviewIdList[0])}>
                                <div className="userinfo-content-shelf-list-item-pic"><img src={moviePoster[0]}/></div>
                                <div className="userinfo-content-shelf-list-item-info">{titleList[0]}</div>
                            </a>
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