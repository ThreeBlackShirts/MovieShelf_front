import React from 'react';

import Footer from '../Footer/Footer';
import Header from 'component/Header/Header';
import 'style/listpage.css';
import 'style/header.css';
import 'style/footer.css'

import { FiSearch } from "react-icons/fi";

const ListPage = () => {

    /*
    searchMovie() {
        MovieService
            .search(input)
            // listpage-search-text = input
    }
    */

    
    return (
        <div>
            <Header />
            <div className="listpage-content">
                <div className="listpage-content-search">
                    <div className="listpage-content-search-btnwrap">
                        <input type="text" id="listpage-search-text" placeholder='검색한 단어'></input>
                        <FiSearch className="listpage-search-btn-icon"/>
                    </div>
                </div>
                <div className="listpage-content-result">
                    <div className="listpage-content-result-item">
                        <div className="listpage-content-result-item-pic"><img/></div>
                        <div className="listpage-content-result-item-info">영화 이름</div>
                    </div>

                    <div className="listpage-content-result-item">
                        <div className="listpage-content-result-item-pic"><img/></div>
                        <div className="listpage-content-result-item-info">영화 이름</div>
                    </div>

                    <div className="listpage-content-result-item">
                        <div className="listpage-content-result-item-pic"><img/></div>
                        <div className="listpage-content-result-item-info">영화 이름</div>
                    </div>

                    <div className="listpage-content-result-item">
                        <div className="listpage-content-result-item-pic"><img/></div>
                        <div className="listpage-content-result-item-info">영화 이름</div>
                    </div>
                </div>
                <div className="listpage-content-result">
                    <div className="listpage-content-result-item">
                        <div className="listpage-content-result-item-pic"><img/></div>
                        <div className="listpage-content-result-item-info">영화 이름</div>
                    </div>

                    <div className="listpage-content-result-item">
                        <div className="listpage-content-result-item-pic"><img/></div>
                        <div className="listpage-content-result-item-info">영화 이름</div>
                    </div>

                    <div className="listpage-content-result-item">
                        <div className="listpage-content-result-item-pic"><img/></div>
                        <div className="listpage-content-result-item-info">영화 이름</div>
                    </div>

                    <div className="listpage-content-result-item">
                        <div className="listpage-content-result-item-pic"><img/></div>
                        <div className="listpage-content-result-item-info">영화 이름</div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};


export default ListPage;