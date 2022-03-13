import React from 'react';
import Footer from '../Footer/Footer';
import Header from 'component/Header/Header';
import MainContent from 'component/MainContent';
import 'style/header.css';
import 'style/listpage.css';
import { BiSearchAlt } from "react-icons/bi"

const ListPage = () => {
    return (
        <div>
            <Header />
            <div className="listpage-content">
                <div className="listpage-content-search">
                    <div className="listpage-content-search-btnwrap">
                        <input type="text" id="listpage-search-text" placeholder='검색한 단어'></input>
                        <BiSearchAlt className="search-btn-icon"/>
                    </div>
                </div>
                <div className="listpage-content-result">
                    <div className="listpage-content-result-item">

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};


export default ListPage;