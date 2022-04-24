import React from 'react';
import Footer from '../Footer/Footer';
import Header from 'component/Header/Header';
import DetailContent from 'component/DetailContent';
import 'style/detailpage.css';

const DetailPage = () => {
    return (
        <div id='detailpage'>
            <Header />
            <DetailContent />
            <Footer />
        </div>
    );
};


export default DetailPage;