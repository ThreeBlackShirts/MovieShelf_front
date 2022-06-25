import React from 'react';
import Footer from '../Footer/Footer';
import Header from 'component/Header/Header';
import MainContent from 'component/MainContent';
import 'style/mainpage.css';

const MainPage = () => {
    return (
        <div className='mainpage'>
            <Header />
            <MainContent/>
            <Footer />
        </div>
    );
};


export default MainPage;