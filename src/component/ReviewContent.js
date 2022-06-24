import React, { Component } from 'react';
import { Link } from "react-router-dom";

import 'style/reviewpage.css';

import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import { BsBookmarkHeartFill } from "react-icons/bs";
import { BsBookmarkHeart } from "react-icons/bs";


class ReviewContent extends Component {

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
                                <div className='moviereview-content-btn'>
                                    <MdEdit className='moviereview-content-btn-icon' id='moviereview-content-editbtn-icon'/>
                                </div>
                                <div className='moviereview-content-btn'>
                                    <MdDelete className='moviereview-content-btn-icon' id='moviereview-content-delbtn-icon'/>
                                </div>
                                <div className='moviereview-content-btn'>
                                    <BsBookmarkHeart className='moviereview-content-btn-icon' id='moviereview-content-delbtn-icon' onClick={this.handleEvent}/>
                                </div>
                                    
                            </div>
                            <div id='reviewpage-moviereview-detail-content' name="content">
                                <p> 평소에도 비염이 있는데, 봄이 왔는데 온난화 때문에 꽃이 한번에 피니까
                                    꽃가루 알레르기 때문에 눈도 간지럽고 재채기도 하고 콧물도 나오고, 목도
                                    간지러운 것 같고.. 너무 힘들어용~~~** 글자 수 제한 하기! **
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