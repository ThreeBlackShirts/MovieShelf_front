import React, { Component } from 'react';
import { Link ,useParams} from "react-router-dom";
import ReviewService from 'service/ReviewService';

import 'style/writereviewpage.css';

import { MdKeyboardArrowLeft } from "react-icons/md";
import { RiAddFill } from "react-icons/ri";
import { RiSubtractFill } from "react-icons/ri";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";

class EditReviewContent extends Component {
   
    constructor(props) {
        super(props)

        this.state = {
            userEmail: localStorage.getItem("authenticatedUser") || '',
            token: localStorage.getItem("token") || '',
            testinput: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
            movieTitle: '',
            movieId:'',
            reviewId:'',
            reviewTitle: '',
            reviewContent: {},
            //reviewTitle: localStorage.getItem("title"),
        }
      
        this.editReview = this.editReview.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    /*
    writeReview(){
        console.log("write review clicked")
        console.log(this.state.userEmail +","+ this.state.movieId +","+  this.state.reviewTitle +","+ this.state.reviewContent)
        //ReviewService
        //    .writeReview(this.state.userEmail, this.state.movieId, this.state.reviewTitle, this.state.reviewContent)
    } 

     */

    editReview(){
        console.log("edit review clicked")
        console.log(this.state.reviewId +","+ this.state.movieId +","+  this.state.reviewTitle +","+ this.state.reviewContent)
        
        ReviewService
            .editReview(this.state.reviewId, this.state.movieId, this.state.reviewTitle, this.state.reviewContent)
            .then(() => {
                alert("수정 완료");
                document.location.href="/review" + this.reviewId;
            }).catch((error) => {
                console.log(error.response)
            })
        
    } 
    
    
    handleChange(event) {
        this.setState(
            {
                [event.target.id]: event.target.value
            }
        )
    }

    render() {
        return (
            <div id='writereview-content'>
                <div id='gobackbtn'><MdKeyboardArrowLeft id='gobackbtn-icon'/></div>
                <div className='writereview-movieinfo-box'>
                    <div className='writereview-movieinfo-poster'>
                        <div className='writereview-movieinfo-poster-img'>
                            <label htmlFor="writereview-movieinfo-poster-addicon-input">
                            <RiAddFill id='writereview-movieinfo-poster-addicon'/>
                            </label>
                        </div>
                       
                       
                    </div>
                    <div className='writereview-movieinfo-detail'>
                        <div className='writereview-movieinfo-detail-title'>
                            <input id='reviewTitle' placeholder='후기 제목' type='text' onChange={this.handleChange}></input>
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
                    </div>
                </div>
                <div className='writereview-moviereview-box'>
                    <div className='writereview-moviereview-text-wrap'>
                        <textarea className='writereview-moviereview-text' placeholder='영화가 어땠나요?' maxLength="300" id='reviewContent' onChange={this.handleChange}>
                            
                        </textarea>
                    </div>

                    <div className='writereview-moviereview-btn-wrap'>
                        <button type='submit' className='writereview-moviereview-btn' onClick={this.editReview}>수정</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditReviewContent;

//onClick={this.writeReview}