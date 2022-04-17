import React from 'react';
import { Link } from "react-router-dom";
import Footer from '../Footer/Footer';
import Header from 'component/Header/Header';
import 'style/detailpage.css';

import { MdKeyboardArrowLeft } from "react-icons/md";

const DetailPage = () => {
    return (
        <div>
            <Header />
            <div id='detailpage-content'>
                <div id='gobackbtn'><MdKeyboardArrowLeft id='gobackbtn-icon'/></div>
                <div id='detailpage-info-box'>
                    <div id='detailpage-info-title'>제목</div>
                    <div id='detailpage-info-anchor'>
                        <Link to='#detailpage-info-majorinfo' className='detailpage-info-anchor-a'>주요 정보</Link>
                        <Link to='#detailpage-img-trailer' className='detailpage-info-anchor-a'>트레일러</Link>
                        <Link to='#detailpage-img-stillcut' className='detailpage-info-anchor-a'>스틸컷</Link>
                        <Link to='#detailpage-review-box' className='detailpage-info-anchor-a'>평점/리뷰</Link>
                    </div>
                    <div id='detailpage-info-majorinfo'>
                        <h4>주요 정보</h4>
                        <div>
                            개봉, 장르, 제한연령, 감독, 배우 등
                        </div>
                    </div>
                </div>
                <div id='detailpage-img-box'>
                    <div id='detailpage-img-trailer'></div>
                    <div id='detailpage-img-stillcut'></div>
                </div>
                <div id='detailpage-reviews-box'>
                    <div className='detailpage-reviews-review'>
                        <div className='detailpage-reviews-review-profile'>
                            <div className='detailpage-reviews-review-profile-img'>example</div>
                            <div className='detailpage-reviews-review-profile-name'>1</div>
                        </div>
                        <div className='detailpage-reviews-review-content'>
                            <div className='detailpage-reviews-review-content-rating'>4/5</div>
                            <div className='detailpage-reviews-review-content-text'>재밌어요~</div>
                        </div>
                    </div>
                    <div className='detailpage-reviews-review'>
                        <div className='detailpage-reviews-review-profile'>
                            <div className='detailpage-reviews-review-profile-img'>example</div>
                            <div className='detailpage-reviews-review-profile-name'>2</div>
                        </div>
                        <div className='detailpage-reviews-review-content'>
                            <div className='detailpage-reviews-review-content-rating'>1/5</div>
                            <div className='detailpage-reviews-review-content-text'>재미없어요~</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};


export default DetailPage;