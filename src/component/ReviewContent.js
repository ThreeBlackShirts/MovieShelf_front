import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReviewService from 'service/ReviewService';

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
            reviewId: '',
            reviewContent: '',
            reviewTitle: '',
            userEmail: '',
        }

        this.editReview = this.editReview.bind(this)
        this.deleteReview = this.deleteReview.bind(this)
        
    }

    editReview(){
        console.log("edit review clicked")
        ReviewService.editReview(this.state.reviewId)
    }

    deleteReview(){
        console.log("delete review clicked")
        ReviewService.deleteReview()
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

    goBackBtn(){
        console.log("goback btn clicked!")
        history.back()
    }
    
    render() {
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
                                    <MdEdit className='moviereview-content-btn-icon' id='moviereview-content-editbtn-icon' onClick={this.editReview}/>
                                </div>
                                <div className='moviereview-content-btn'>
                                    <MdDelete className='moviereview-content-btn-icon' id='moviereview-content-delbtn-icon' onClick={this.deleteReview}/>
                                </div>
                                <div className='moviereview-content-btn'>
                                    <BsBookmarkHeart className='moviereview-content-btn-icon' id='moviereview-content-delbtn-icon' onClick={this.handleEvent}/>
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