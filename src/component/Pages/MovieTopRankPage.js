import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {TopRankMovieList} from 'component/MovieContent';
import MovieService from 'service/MovieService';

import Footer from '../Footer/Footer';
import Header from 'component/Header/Header';
import 'style/listpage.css';
import 'style/header.css';
import 'style/footer.css'

const MovieTopRankPage = () => {
    const [movie, setMovie] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
        
    useEffect(() => {
        MovieService.topRank()
            .then((response) => {
                console.log(response.data.data)
                if(response.data.data == [] || response.data.data == null || response.data.data.length == 0){
                    console.log("Movie Ranking Null")
                } else {
                    setMovie(response.data.data)
                }
                setIsLoading(false)
            }).catch(() => {
                console.log("search failed")
            });
    },[]);

    return (
        <div id='listpage'>
            <Header />

            <div className="listpage-content">
                <div className='listpage-content-result-wrap'>  
                    <div className="listpage-content-result">
                        { isLoading ? "Loading..." : movie.map( movie => (
                            <TopRankMovieList key={movie.movieTitle}
                                id={movie.movieId}
                                title={movie.movieTitle}
                                poster={movie.moviePoster} />
                        )) }
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};


export default MovieTopRankPage;