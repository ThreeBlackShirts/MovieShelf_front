import React from 'react';
import Footer from '../Footer/Footer';
import Header from 'component/Header/Header';
import WriteReviewContent from 'component/WriteReviewComponent';
import 'style/writereviewpage.css';

const WriteReviewPage = () => {
    return (
        <div className='writereviewpage'>
            <Header />
            <WriteReviewContent />
            <Footer />
        </div>
    );
};


export default WriteReviewPage;