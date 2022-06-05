import React from 'react';
import Footer from '../Footer/Footer';
import Header from 'component/Header/Header';
import UserContent from 'component/UserContent';
import 'style/userinfopage.css';

const UserInfoPage = () => {
    return (
        <div className='userinfopage'>
            <Header />
            <UserContent />
            <Footer />
        </div>
    );
};


export default UserInfoPage;