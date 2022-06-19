import React from 'react';
import Footer from '../Footer/Footer';
import Header from 'component/Header/Header';
import UserSettingContent from 'component/UserSettingContent';
import 'style/userinfopage.css';

const UserSettingPage = () => {
    return (
        <div className='userinfopage'>
            <Header />
            <UserSettingContent />
            <Footer />
        </div>
    );
};


export default UserSettingPage;