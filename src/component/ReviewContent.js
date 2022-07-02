import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReviewService from 'service/ReviewService';
import LikeService from 'service/LikeService';

import 'style/reviewpage.css';

import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import { BsBookmarkHeartFill } from "react-icons/bs";
import { BsBookmarkHeart } from "react-icons/bs";


class ReviewContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userEmail: localStorage.getItem("authenticatedUser") || '',
            token: localStorage.getItem("token") || '',
            target: localStorage.getItem("target") || '',
            reviewId: '',
            reviewContent: {},
            reviewTitle: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
            bookmark: false,
        }

        this.deleteReview = this.deleteReview.bind(this)
        
    }

    reviewMovie(){
        console.log("movie review loading")
        if(this.state.target !== null && this.state.target !== ""){
            console.log(this.state.target +" review")
            ReviewService
                .searchReviewById(this.state.reviewId)
                .then((response) => {
                    localStorage.removeItem("target")
                    this.setState({
                        reviewContent: response.data.data
                    })
                    console.log(this.state.reviewContent)
                }).catch(() => {
                    console.log("review load failed")
                })
        }else{
            console.log("target error")
            history.back()
        }
    }

    handleChange = (e) => {
        this.setState(
            {
                [e.target.id]: e.target.value
            }
        )
    }

    deleteReview(){
        console.log("delete review clicked")
        ReviewService.deleteReview(this.state.reviewId)
            .then(()=> {
                alert("삭제 완료");
                document.location.href="/userinfo";
            }).catch((error) => {
                console.log(error.response)
            });   
    }

    addLikeReview(){
        console.log("review liked!")
        LikeService.addLike(this.state.userEmail, this.state.reviewId)
            .then(()=> {
                alert("리뷰 좋아요!");
            }).catch((error) =>{
                console.log(error.response)
            });
        this.setState(
            {
                bookmark : true
            }
        )
    }

    cancelLikeReview(){
        console.log("review like canceled!")
        LikeService.deleteLike(this.state.userEmail, this.state.reviewId)
            .then(()=> {
                alert("리뷰 좋아요 취소!");
            }).catch((error) => {
                console.log(error.response)
            });
        this.setState(
            {
                bookmark : false
            }
        )
    }

    /*
    constructor(props) {
        super(props)

        this.state = {
            userEmail: localStorage.getItem("authenticatedUser") || '',
            token: localStorage.getItem("token") || '',
            testinput: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
        }
        
    }
    handleChange = (e) => {
        this.setState(
            {
                [e.target.id]: e.target.value
            }
        )
    }

    handleClick = (e) => {
        e.preventDefault();
        console.log("Like & Bookmark!");
    }
    

    <BsBookmarkHeart className='moviereview-content-btn-icon' id='moviereview-content-delbtn-icon' onClick={handleClick}>
                                    </BsBookmarkHeart>
    */

    

    handleEvent = e => {
        alert("like clicked!");
    }

    /*
        checkBookmark(checkClicked){
        if(checkClicked){  
            
            this.setState({
                bookmark:true
            });
            console.log("bookmarked!")

        }
        else{   

             this.setState({               
                bookmark: false
            });
            console.log("bookmark canceled!")

        } 
           
    }
    
    */



    goBackBtn(){
        console.log("goback btn clicked!")
        history.back()
    }

    toEditReview(){
        document.location.href = '/editreview' + this.state.reviewId;
    }
    
    render() {
        const {bookmark} = this.state;
        


        return (
            <div id='reviewpage-content'>
                <div id='gobackbtn'><MdKeyboardArrowLeft id='gobackbtn-icon'  onClick={this.goBackBtn}/></div>
                <div id='reviewpage-wrap'>
                    <div id='reviewpage-moviereview'>
                        <div id='reviewpage-moviereview-movieinfo'>
                            <div id='reviewpage-moviereview-img-wrap'>
                                <img id='reviewpage-moviereview-img' src={require('../images/test/test_detail.jpg')} />
                            </div>
                            <div id='reviewpage-moviereview-rate'><span>★ ★ ★ ★ ★</span></div>
                        </div>
                        <div id='reviewpage-moviereview-detail'>
                            <div id='reviewpage-moviereview-detail-header'>
                                <div id='reviewpage-moviereview-detail-header-title' name="title">영화 제목</div>

                                <div id='reviewpage-moviereview-detail-header-id' >#id</div>
                                <div className='moviereview-content-btn'>
                                    <MdEdit className='moviereview-content-btn-icon' onClick={this.toEditReview}/>
                                </div>
                                <div className='moviereview-content-btn'>
                                    <MdDelete className='moviereview-content-btn-icon' onClick={this.deleteReview}/>
                                </div>
                                <div className='moviereview-content-btn'>
                                    <BsBookmarkHeart className='moviereview-content-btn-icon' onClick={this.addLikeReview}/>
                                </div>
                                    
                            </div>
                            <div id='reviewpage-moviereview-detail-content' name="content">
                                <p> ...
                                </p>
                            </div>
                        </div>
                    </div>
                    <hr id='reviewpage-hr'/>
                    <div id='reviewpage-comment-wrap'>
                        <div className='reviewpage-comment'>
                            <div className='reviewpage-comment-user'>
                                <div className='reviewpage-comment-user-profile'>
                                    <img className='reviewpage-comment-user-profile-img' src={require('../images/test/testprofile.png')} />
                                    </div>
                                <div className='reviewpage-comment-user-id'>user1</div>
                            </div>
                            <div className='reviewpage-comment-content'>
                                저도 매우 재미있었습니다.
                            </div>
                            <div className='reviewpage-comment-content-btn'>
                                <MdEdit className='reviewpage-comment-content-btn-icon'/>
                            </div>
                            <div className='reviewpage-comment-content-btn'>
                                <MdDelete className='reviewpage-comment-content-btn-icon'/>
                            </div>
                        </div>
                        <div className='reviewpage-comment'>
                            <div className='reviewpage-comment-user'>
                                <div className='reviewpage-comment-user-profile'>
                                    <img className='reviewpage-comment-user-profile-img' src={require('../images/test/testprofile.png')}></img>
                                    </div>
                                <div className='reviewpage-comment-user-id'>user1</div>
                            </div>
                            <div className='reviewpage-comment-content'>
                                저도 매우 재미있었습니다.
                            </div>
                            <div className='reviewpage-comment-content-btn'>
                                <MdEdit className='reviewpage-comment-content-btn-icon'/>
                            </div>
                            <div className='reviewpage-comment-content-btn'>
                                <MdDelete className='reviewpage-comment-content-btn-icon'/>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default ReviewContent;

/*

                                {bookmark && <div className='moviereview-content-btn'>
                                        <BsBookmarkHeartFill className='moviereview-content-btn-icon' onClick={this.checkBookmark(bookmark)}/>
                                    </div>}
                                {!bookmark && <div className='moviereview-content-btn'>
                                    <BsBookmarkHeart className='moviereview-content-btn-icon' onClick={this.checkBookmark(bookmark)}/>
                                </div>}

*/