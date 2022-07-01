import React from 'react';
import Footer from '../Footer/Footer';
import Header from 'component/Header/Header';
import GenreListContent from 'component/GenreListContent';
import 'style/listpage.css';
import 'style/header.css';
import 'style/footer.css'

const GenreListPage = () => {
    return (
        <div id='listpage'>
            <Header />
            <GenreListContent/>
            <Footer />
        </div>
    );
};


export default GenreListPage;