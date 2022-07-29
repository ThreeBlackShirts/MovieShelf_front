import React from 'react';
import Footer from '../Footer/Footer';
import Header from 'component/Header/Header';
import EditReviewContent from 'component/ReviewEditContent';
import 'style/writereviewpage.css';

const EditReviewPage = () => {
    return (
        <div className='writereviewpage'>
            <Header />
            <EditReviewContent />
            <Footer />
        </div>
    );
};


export default EditReviewPage;