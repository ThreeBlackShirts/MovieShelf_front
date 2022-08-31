import React, { useEffect, useState } from 'react';

import {TopRankMovieList} from 'component/MovieContent';
import MovieService from 'service/MovieService';

import Footer from '../Footer/Footer';
import Header from 'component/Header/Header';
import 'style/listpage.css';
import 'style/ranklistpage.css';
import 'style/header.css';
import 'style/footer.css'

const MovieTopRankPage = () => {
    const [movie, setMovie] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let count = 1;
        
    useEffect(() => {
        MovieService.topRank()
            .then((response) => {
                if(response.data.data == [] || response.data.data == null || response.data.data.length == 0){
                } else {
                    setMovie(response.data.data)
                }
                setIsLoading(false)
            }).catch((error) => {
                console.log(error)
            });
    },[]);

    function rankCount(){
        return count++;
    }

    function handelNull(data) {
        if(data == null){
            return('')
        } else {
            return(data)
        }
    }

    return (
        <div id='listpage'>
            <Header />

            <div className="rank-listpage-content">
                <div className='rank-listpage-content-result-wrap'>  
                    <div className="rank-listpage-content-result">
                        { isLoading ? "Loading..." : movie.map( movie => (
                            <TopRankMovieList key={movie.movieTitle}
                                id={movie.movieId}
                                rank={rankCount()}
                                title={movie.movieTitle}
                                poster={movie.moviePoster}
                                releaseDate={handelNull(movie.movieReleaseDate)}
                                filmrate={handelNull(movie.movieFilmrate)}
                                runningTime={handelNull(movie.movieRunningTime)}
                                nation={handelNull(movie.movieNation)}
                                genres={handelNull(movie.movieGenres)}
                                contentBold={handelNull(movie.movieContentBold)}
                                contentDetail={handelNull(movie.movieContentDetail)} />
                        )) }
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};


export default MovieTopRankPage;