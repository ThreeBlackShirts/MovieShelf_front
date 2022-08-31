import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import {MovieDetailTitle, MovieDetail, MovieDetailTrailer, MovieDetailStillcut} from './MovieContent';
import {MovieTitleReview} from './ReviewContents';
import AuthenticationService from 'service/AuthenticationService';
import MovieService from 'service/MovieService';
import ReviewService from 'service/ReviewService';
import WishListService from 'service/WishListService';
import LikeService from 'service/LikeService';
import 'style/detailpage.css';

import { MdKeyboardArrowLeft } from "react-icons/md";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { BsBookmarkHeart } from "react-icons/bs";
import MovieRatingService from 'service/MovieRatingService';

const DetailContent = () => {

    const [userEmail] = useState(localStorage.getItem("authenticatedUser") || '');
    const [onLogin] = useState(AuthenticationService.isUserLoggedIn);
    const [isLoading, setIsLoading] = useState(true);
    const [movieId] = useState(useParams().movieid);
    const [movie, setMovie] = useState([]);
    const [reviewContent, setReviewContent] = useState([]);
    const [checkwish, setCheckwish] = useState(false);
    const [reviewHeart, setReviewHeart] = useState([]);
    const [reviewRate, setReviewRate] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        if(movieId !== null && movieId !== ""){
            MovieService
                .detailById(movieId)
                .then((response) => {
                    setMovie(response.data.data)
                    ReviewService
                        .findReviewByMovieId(movieId)
                        .then((response) => {
                            setReviewContent(response.data.data.slice(0, 5))
                            let dataLength = response.data.data.length
                            dataLength > 5 ? dataLength = 5 : null
                            let rateData = []
                            response.data.data.length == 0 ? null : response.data.data.slice(0, 5).map( review => (
                                MovieRatingService.findRate(review.writer, movieId)
                                    .then((response) => {
                                        rateData.push({reviewWriter: review.writer, rate: response.data.data.movieRate})
                                        
                                        if(dataLength === rateData.length){
                                            setReviewRate(rateData)
                                        }
                                    }).catch((error) => {
                                        console.log(error)
                                    })
                            ))
                            let likeData = []
                            !onLogin ? setIsLoading(false) : response.data.data.length == 0 ? setIsLoading(false) : response.data.data.slice(0, 5).map( review => (
                                LikeService.isLike(userEmail, review.reviewId)
                                    .then((response)=>{
                                        if(response.data.data === true){
                                            likeData.push({reviewId: review.reviewId, isheart: true})
                                        }
                                        else{
                                            likeData.push({reviewId: review.reviewId, isheart: false})
                                        }
                                        if(dataLength === likeData.length){
                                            setReviewHeart(likeData)
                                            setIsLoading(false)
                                        }
                                    }).catch((error) => {
                                        console.log(error)
                                    })
                            ))
                        }).catch(() => {
                            alert("findReviewByMovieId fail");
                    });
                    if(onLogin) {
                        WishListService
                            .isWishBtUserEmail(movieId, userEmail)
                            .then((response) => {
                                if(response.data.data === true)
                                    setCheckwish(true)
                                else
                                    setCheckwish(false)
                            }).catch(() => {
                                alert("isWishBtUserEmail fail");
                        }); 
                    }
                }).catch(() => {
                    alert("detail fail");
                });
        }else{
            navigate(-1)
        }
    },[]);

    function goReview() {
        navigate(`/review/${movieId}`)
    }

    function loginAndReviewCheck() {
        if(!onLogin){
            alert("로그인이 필요합니다")
            navigate("/login")
        }else{
            ReviewService
                .searchReviewByUseremail(userEmail)
                .then((response) => {
                    if(response.data.data !== [] || response.data.data !== null){
                        let isWrited = false
                        response.data.data.map( data => {
                            if(data.movieId == movieId){
                                isWrited = true
                                alert("작성한 리뷰가 존재합니다. 수정 페이지로 이동합니다.")
                                navigate(`/review/edit/${movieId}/${data.reviewId}`)
                            }
                        })
                        if(!isWrited){
                            navigate(`/review/write/${movieId}`)
                        }
                    } else {
                        navigate(`/review/write/${movieId}`)
                    }
                }).catch(() => {
                    alert("searchReviewByUseremail fail");
                }); 
        }
    }

    function handelNull(data) {
        if(data == null){
            return('')
        } else {
            return(data)
        }
    }

    function goBackBtn(){
        navigate(-1)
    }
    
    function GoReview(){
        return(
            <button id='detailpage-reviews-go-review' onClick={goReview}>리뷰 더보기</button>
        );
    }

    function GoWriteReview(){
        return(
            <button id='detailpage-reviews-go-write-review' onClick={loginAndReviewCheck}>리뷰 쓰러가기</button>
        );
    }
    
    function handleLWishList(){
        if(!onLogin){
            alert("로그인이 필요합니다")
            navigate("/login")
        }else{
            if(checkwish){
                // wishlist.classList.add("background-color: pink");
                setCheckwish(false)

                WishListService.deleteWishList(userEmail, movieId)
                    .then((response)=>{
                        alert('찜 취소')
                    }).catch((error) => {
                        console.log(error)
                    })
            }
            else{
                setCheckwish(true)

                WishListService.addWishList(userEmail,movieId)
                    .then((response)=>{
                        alert("찜꽁")
                    }).catch((error) => {
                        console.log(error)
                    })
            }
        }
    }

    function handleLReviewLike(reviewId) {
        if(!onLogin){
            alert("로그인이 필요합니다")
            navigate("/login")
        }else{
            let heart = false
            reviewHeart.map( data =>
                data.reviewId === reviewId ? data.isheart === true ? heart = true : null : null
            )
            if(heart){
                LikeService.deleteLike(userEmail, reviewId)
                    .then((response)=>{
                        setReviewHeart(
                            reviewHeart.map( data =>
                                data.reviewId === reviewId ? { ...data, isheart: !data.isheart } : data
                            )
                        )
                        setReviewContent(
                            reviewContent.map( data =>
                                data.reviewId === reviewId ? { ...data, like: data.like-1 } : data
                            )
                        )
                    }).catch((error) => {
                        console.log(error)
                    })
            }
            else{
                LikeService.addLike(userEmail, reviewId)
                    .then((response)=>{
                        setReviewHeart(
                            reviewHeart.map( data =>
                                data.reviewId === reviewId ? { ...data, isheart: !data.isheart } : data
                            )
                        )
                        setReviewContent(
                            reviewContent.map( data =>
                                data.reviewId === reviewId ? { ...data, like: data.like+1 } : data
                            )
                        )
                    }).catch((error) => {
                        console.log(error)
                    })
            }
        }
    }

    function isheartCheck(reviewId) {
        let heart = false 
        reviewHeart.map( data =>
            data.reviewId === reviewId ? data.isheart === true ? heart = true : null : null
        )
        return heart
    }

    function reviewRateCheck(reviewWriter) {
        let rate = 0;
        reviewRate.map( data =>
            data.reviewWriter === reviewWriter ? rate = data.rate : null
        )
        return rate
    }

    return (
        <div id='detailpage-content'>
            <div id='gobackbtn'><MdKeyboardArrowLeft id='gobackbtn-icon' onClick={goBackBtn}/></div>
            <div id='detailpage-info-box'>
                <div id='detailpage-info-box-title-content'>
                    { isLoading ? "Loading..." : < MovieDetailTitle title={movie.movieTitle} /> }
                    {checkwish && <BsBookmarkHeartFill className='detailpage-info-wish-btn' id='detailpage-info-likebtn-icon' onClick={handleLWishList}/>}
                    {!checkwish && <BsBookmarkHeart className='detailpage-info-wish-btn' id='detailpage-info-likebtn-icon' onClick={handleLWishList}/>}
                </div>
                <div id='detailpage-info-anchor'>
                    <a href='#detailpage-info-majorinfo' className='detailpage-info-anchor-a'>주요 정보</a>
                    <a href='#detailpage-img-trailer' className='detailpage-info-anchor-a'>트레일러</a>
                    <a href='#detailpage-img-stillcut' className='detailpage-info-anchor-a'>스틸컷</a>
                    <a href='#detailpage-review-box' className='detailpage-info-anchor-a'>평점/리뷰</a>
                </div>
                <div id='detailpage-info-majorinfo'>
                    <h4 className='detailpage-box-title'><hr className='detailpage-info-hr-left'/>주요 정보<hr className='detailpage-info-hr-right'/></h4>
                    { isLoading ? "Loading..." : 
                            <MovieDetail  key={movie.moviePoster}
                                poster={handelNull(movie.moviePoster)}
                                rate={handelNull(movie.movieRate)}
                                director={handelNull(movie.movieDirector)}
                                nation={handelNull(movie.movieNation)}
                                actor={handelNull(movie.movieActor)}
                                releaseDate={handelNull(movie.movieReleaseDate)}
                                filmrate={handelNull(movie.movieFilmrate)}
                                runningTime={handelNull(movie.movieRunningTime)}
                                genres={handelNull(movie.movieGenres)}
                                contentBold={handelNull(movie.movieContentBold)}
                                contentDetail={handelNull(movie.movieContentDetail)} />
                    }
                </div>
            </div>
            <div id='detailpage-img-box'>
                { isLoading ? "Loading..." : movie.movieTrailer.length===0 ? null : (
                    <div id='detailpage-img-trailer'>
                        <h4 className='detailpage-box-title'><hr className='detailpage-info-hr-left'/>트레일러<hr className='detailpage-info-hr-right'/></h4>
                        <div className='detailpage-img-table-wrap'>
                            <div className='detailpage-img-table'>
                                <ul>
                                { movie.movieTrailer.map( movie => (
                                            <MovieDetailTrailer  key={movie}
                                                trailer={movie} />
                                )) }
                                </ul>
                            </div>
                        </div>
                    </div>
                ) }
                { isLoading ? "Loading..." : movie.movieTrailer.length===0 ? null : (
                    <div id='detailpage-img-stillcut'>
                        <h4 className='detailpage-box-title'><hr className='detailpage-info-hr-left'/>스틸컷<hr className='detailpage-info-hr-right'/></h4>
                        <div className='detailpage-img-table-wrap'>
                            <div className='detailpage-img-table'>
                                <ul>
                                    { movie.movieStillcut.map( movie => (
                                            <MovieDetailStillcut key={movie}
                                                stillcut={movie} />
                                    )) }
                                </ul>
                            </div>
                        </div>
                    </div>
                ) }
            </div>
            <div id='detailpage-review-box'>
                <h4 className='detailpage-box-title'>
                    <hr className='detailpage-info-hr-left'/>
                    평점/리뷰
                    <hr className='detailpage-info-hr-right'/>
                </h4>
                <div id='detailpage-reviews-review-table-wrap'>
                    <div id='detailpage-reviews-review-table'>
                        {isLoading ? "Loading..." : 
                                    reviewContent.length == 0 ? <div id='detailpage-reviews-review-none'>등록된 리뷰가 없습니다</div> : reviewContent.map( review => (
                                        <MovieTitleReview  key={review.title}
                                            reviewId={review.reviewId}
                                            userNickname={review.user}
                                            title={review.title}
                                            rate={reviewRateCheck(review.writer)}
                                            likeCount={review.like}
                                            isheart={isheartCheck(review.reviewId)}
                                            handleLReviewLike={handleLReviewLike}
                                        />
                                    ))}

                    </div>
                </div>
                <br/>
                <div id='detailpage-reviews-pagecontroller'>
                    <GoReview /> <GoWriteReview />
                </div>
            </div>
            <div className='detailpage-blank'>
                <br></br>
            </div>

        </div>
    );

}

export default DetailContent;