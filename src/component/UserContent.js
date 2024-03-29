import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

import UserService from 'service/UserService';
import ReviewService from 'service/ReviewService';
import WishListService from 'service/WishListService';

const UserContent = () => {
    let navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [reviewData, setReviewData] = useState([]);
    const [wishListData, setWishListData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        UserService
            .findUserByEmail(localStorage.getItem("authenticatedUser"))
            .then((response) => {
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
                setReviewData(response.data.data)

                setIsLoading(false)
            }).catch((error) => {
                console.log(error)
            });
    }

    function searchAllWishList(){
       WishListService
            .searchWishListByUserEmail(localStorage.getItem("authenticatedUser"))
            .then((response) => {
                setWishListData(response.data.data)
                setIsLoading(false)
            }).catch((error) => {
                console.log(error)
            });
    }

    function toUserSetting(){
        navigate("/usersetting")
    }
    
    function setReviewLocation(movieId) {
        navigate(`/review/${movieId}`)
    }
    
    function setWishListLocation(movieId) {
        navigate(`/detail/${movieId}`)
    } 
    
    function MyMovieReview({movieId, title, moviePoster}) {
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
                        wishListData.length == 0 ? "찜한 영화가 없습니다" : wishListData.map( wishlist => (
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