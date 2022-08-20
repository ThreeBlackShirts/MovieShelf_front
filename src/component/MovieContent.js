import React from "react";
import PropTypes from "prop-types";

import * as MovieRateUtil from "./MovieRateUtil";

function setLocation(id) {
    location.href = `/detail/${id}`
}

function SearchMovieResult({id, title, poster}) {
    return (
        <div className="listpage-content-result-item">
            <a onClick={() => setLocation(id)}>
                <div className="listpage-content-result-item-pic"><img src={poster}/></div>
                <div className="listpage-content-result-item-info">{title}</div>
            </a>
        </div>
    )
}

function BannerMovieView({id, title, stillcut, contentBold, contentDetail}) {
    return (
        <div className="banner-content-result-item" style={{backgroundImage: `url(${stillcut})`}} onClick={() => setLocation(id)}>
            <div className="banner-content-item-info">
                <div className="banner-content-item-title">{title}</div><br></br>
                { contentBold == '' ? null :
                    <div className="banner-content-item-detail detail-bold">{contentBold}</div>
                }
                { contentDetail == '' ? null :
                    <div className="banner-content-item-detail detail-detail">{contentDetail}</div>
                }
            </div>
        </div>
    )
}

function RecommendMovieList({id, title, poster}) {
    return (
        <div className="main-content-result-item">
            <a onClick={() => setLocation(id)}>
                <div className="main-content-result-item-pic"><img src={poster}/></div>
                <div className="main-content-result-item-info">{title}</div>
            </a>
        </div>
    )
}

function CategoryMovieList({id, title, poster}) {
    return (
        <div className="main-content-result-item">
            <a onClick={() => setLocation(id)}>
                <div className="main-content-result-item-pic"><img src={poster}/></div>
                <div className="main-content-result-item-info">{title}</div>
            </a>
        </div>
    )
}

function GenreMovieList({id, title, poster}) {
    return (
        <div className="listpage-content-result-item">
            <a onClick={() => setLocation(id)}>
                <div className="listpage-content-result-item-pic"><img src={poster}/></div>
                <div className="listpage-content-result-item-info">{title}</div>
            </a>
        </div>
    )
}

function MovieDetailTitle({title}) {
    return (
        <div id='detailpage-info-title'>{title}</div>
    )
}

function MovieDetail({poster, rate, director, nation, actor, releaseDate, filmrate, runningTime, genres, contentBold, contentDetail}) {
    return (
        <div id="detailpage-info-major-data">
            <div id='detailpage-info-poster-img-wrap'>
                <img id='detailpage-info-poster-img' src={poster} />
                <div><MovieRateUtil.MovieRateView rate={rate}/></div>
            </div>
            <div id='detailpage-info-majorinfo-basic'>
                    { contentBold == '' ? null :
                        <div className='detailpage-info-majorinfo-basic-content' id='basic-release'>
                            <span>개봉일: {releaseDate}</span>
                        </div>
                    }
                    { filmrate != '' || runningTime != '' || nation != '' ? 
                        <div className='detailpage-info-majorinfo-basic-content' id='basic-release'>
                            기본정보: 
                            {filmrate == '' ? null : <span> {filmrate} |</span> }
                            {runningTime == '' ? null : <span> {runningTime} |</span> }
                            {nation == '' ? null : <span> {nation}</span> }
                        </div> : null
                    }
                    { genres == '' ? null :
                        <div className='detailpage-info-majorinfo-basic-content' id='basic-release'>
                            <span>장르: {genres}</span>
                        </div>
                    }
                    { director == '' ? null :
                        <div className='detailpage-info-majorinfo-basic-content' id='basic-release'>
                            <span>감독/연출진: {director}</span>
                        </div>
                    }
                    { actor == '' ? null :
                        <div className='detailpage-info-majorinfo-basic-content' id='basic-release'>
                            <span>배우: {actor}</span>
                        </div>
                    }
                    { contentBold != '' || contentDetail != '' ? 
                        <div id='detailpage-info-majorinfo-storyline'>
                            {contentBold == '' ? null : <p id='detailpage-info-majorinfo-bold-storyline'>{contentBold}</p> }
                            {contentDetail == '' ? null : <p id='detailpage-info-majorinfo-detail-storyline'>{contentDetail}</p> }
                        </div> : null
                    }
            </div>
        </div>
    )
}

function MovieDetailTrailer({trailer}) {
    return (
        <li className='detailpage-img-trailer-td'>
            <a href={trailer[2]}>
                <img src={trailer[1]}></img>
            </a><br></br>
            <span className="detailpage-img-trailer-td-title">{trailer[0]}</span>
        </li>
    )
}

function MovieDetailStillcut({stillcut}) {
    return (
        <li className='detailpage-img-stillcut-td'><img src={stillcut}/></li>
    )
}

SearchMovieResult.propTypes, RecommendMovieList.propTypes, CategoryMovieList.propTypes, GenreMovieList.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
}

BannerMovieView.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    stillcut: PropTypes.string.isRequired,
    contentBold: PropTypes.string.isRequired,
    contentDetail: PropTypes.string.isRequired
}

MovieDetailTitle.propTypes = {
    title: PropTypes.string.isRequired
}


MovieDetail.propTypes = {
    poster: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    nation: PropTypes.string.isRequired,
    actor: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    filmrate: PropTypes.string.isRequired,
    runningTime: PropTypes.string.isRequired,
    genres: PropTypes.string.isRequired,
    contentBold: PropTypes.string.isRequired,
    contentDetail: PropTypes.string.isRequired
}

MovieDetailTrailer.propTypes = {
    trailer: PropTypes.array.isRequired
}

MovieDetailStillcut.propTypes = {
    stillcut: PropTypes.string.isRequired
}
  
export {SearchMovieResult, BannerMovieView, RecommendMovieList, CategoryMovieList, GenreMovieList, MovieDetailTitle, MovieDetail, MovieDetailTrailer, MovieDetailStillcut}
