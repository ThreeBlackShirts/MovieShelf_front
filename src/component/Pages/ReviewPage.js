import React from 'react';
import Footer from '../Footer/Footer';
import Header from 'component/Header/Header';
import ReviewContent from 'component/ReviewComponent';
import 'style/reviewpage.css';

const ReviewPage = () => {
    return (
        <div className='reviewpage'>
            <Header />
            <ReviewContent />
            <Footer />
        </div>
    );
};


export default ReviewPage;