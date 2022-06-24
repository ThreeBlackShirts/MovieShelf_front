import React, { Component } from 'react';
import { Link } from "react-router-dom";

import 'style/writereviewpage.css';

import { MdKeyboardArrowLeft } from "react-icons/md";
import { RiAddFill } from "react-icons/ri";
import { RiSubtractFill } from "react-icons/ri";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";

class WriteReviewContent extends Component {
   
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

    writeReview(){
        console.log("write review clicked")
        ReviewService.writeReview()
    }
    
    handleChange = (e) => {
        this.setState(
            {
                [e.target.id]: e.target.value
            }
        )
    }

    addImg() {
        alert("이미지를 불러오시겠습니까?*테스트용*");
    }


    render() {
        return (
            <div id='writereview-content'>
                <div id='gobackbtn'><MdKeyboardArrowLeft id='gobackbtn-icon'/></div>
                <div className='writereview-movieinfo-box'>
                    <div className='writereview-movieinfo-poster'>
                        <div className='writereview-movieinfo-poster-img' onClick={this.addImg}>
                            <RiAddFill id='writereview-movieinfo-poster-addicon'/>
                        </div>
                       
                    </div>
                    <div className='writereview-movieinfo-detail'>
                        <div className='writereview-movieinfo-detail-title'>
                            영화 제목
                        </div>
                        <div className='writereview-movieinfo-detail-id'>
                            #movie ID
                        </div>
                        <div className='writereview-movieinfo-detail-rate'>
                            <div className='movieinfo-detail-rating'><RiSubtractFill className='movieinfo-detail-rating-icon'/></div>
                            <div className='rate-fillstart'><AiFillStar className='movieinfo-detail-rating-icon'/></div>
                            <div className='rate-fillstart'><AiFillStar className='movieinfo-detail-rating-icon'/></div>
                            <div className='rate-fillstart'><AiFillStar className='movieinfo-detail-rating-icon'/></div>
                            <div className='rate-fillstart'><AiFillStar className='movieinfo-detail-rating-icon'/></div>
                            <div className='rate-fillstart'><AiFillStar className='movieinfo-detail-rating-icon'/></div>
                            <div className='movieinfo-detail-rating'><RiAddFill className='movieinfo-detail-rating-icon'/></div>
                        </div>
                        <div className='writereview-movieinfo-detail-shortreview'>
                            <input type='text' className='writereview-movieinfo-detail-shortreview-text' placeholder='이 영화를 한 줄로 소개한다면?'></input>
                            <button type='submit' className='writereview-moviereview-btn'>완료</button>
                        </div>
                    </div>
                </div>
                <div className='writereview-moviereview-box'>
                    <div className='writereview-moviereview-text-wrap'>
                        <textarea className='writereview-moviereview-text' placeholder='영화가 어땠나요?' maxLength="300">
                            
                        </textarea>
                    </div>

                    <div className='writereview-moviereview-btn-wrap'>
                        <button type='submit' className='writereview-moviereview-btn'>임시저장</button>
                        <button type='submit' className='writereview-moviereview-btn'>완료</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default WriteReviewContent;