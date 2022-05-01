import React from 'react';
import Footer from '../Footer/Footer';
import Header from 'component/Header/Header';
import ReviewContent from 'component/ReviewContent';
import 'style/reviewpage.css';

const ReviewPage = () => {
    return (
        <div id='reviewpage'>
            <Header />
            <ReviewContent />
            <Footer />
        </div>
    );
};


export default ReviewPage;