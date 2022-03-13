import React from 'react';
import Footer from '../Footer/Footer';
import Header from 'component/Header/Header';
import MainContent from 'component/MainContent';
import 'style/homepage.css';

const HomePage = () => {
    return (
        <div>
            <Header />
            <MainContent/>
            <Footer />
        </div>
    );
};


export default HomePage;