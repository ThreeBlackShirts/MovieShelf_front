import React from 'react';
import Footer from '../Footer/Footer';
import Header from 'component/Header/Header';
import UserContent from 'component/UserContent';
import 'style/mainpage.css';

const UserInfoPage = () => {
    return (
        <div>
            <Header />
            <UserContent />
            <Footer />
        </div>
    );
};


export default UserInfoPage;