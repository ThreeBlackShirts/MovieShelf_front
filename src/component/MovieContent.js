import React from "react";
import PropTypes from "prop-types";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";


function setLocation(title) {
    localStorage.setItem('target', title)
    location.href = '/detail'
}

function SearchMovieResult({title, poster}) {
    return (
        <div className="listpage-content-result-item">
            <a onClick={() => setLocation(title)}>
                <div className="listpage-content-result-item-pic"><img src={poster}/></div>
                <div className="listpage-content-result-item-info">{title}</div>
            </a>
        </div>
    )
}

function BannerMovieView({title, stillcut, contentBold, contentDetail}) {
    return (
        <div className="banner-content-result-item" style={{backgroundImage: `url(${stillcut})`}} onClick={() => setLocation(title)}>
            <div className="banner-content-item-info">
                <div className="banner-content-item-title">{title}</div><br></br>
                <div className="banner-content-item-detail detail-bold">{contentBold}</div>
                <div className="banner-content-item-detail detail-detail">{contentDetail}</div>
            </div>
        </div>
    )
}

function RecommendMovieList({title, poster}) {
    return (
        <div className="main-content-result-item">
            <a onClick={() => setLocation(title)}>
                <div className="main-content-result-item-pic"><img src={poster}/></div>
                <div className="main-content-result-item-info">{title}</div>
            </a>
        </div>
    )
}

function CategoryMovieList({title, poster}) {
    return (
        <div className="main-content-result-item">
            <a onClick={() => setLocation(title)}>
                <div className="main-content-result-item-pic"><img src={poster}/></div>
                <div className="main-content-result-item-info">{title}</div>
            </a>
        </div>
    )
}

function MovieDetailTitle({title}) {
    return (
        <div id='detailpage-info-title'>{title}</div>
    )
}

function MovieDetail({poster, director, nation, actor, releaseDate, filmrate, runningTime, genres, contentBold, contentDetail}) {
    return (
        <div id="detailpage-info-major-data">
            <div id='detailpage-info-poster-img-wrap'>
                <img id='detailpage-info-poster-img' src={poster} />
                <div>★ ★ ★ ★ ☆</div>
            </div>
            <div id='detailpage-info-majorinfo-basic'>
                <div className='detailpage-info-majorinfo-basic-content' id='basic-release'>개봉: <span>{releaseDate}</span></div>
                <div className='detailpage-info-majorinfo-basic-content' id='basic-genre'>기본정보: <span>{filmrate}</span> | <span>{runningTime}</span>| <span>{nation}</span></div>
                <div className='detailpage-info-majorinfo-basic-content' id='basic-genre'>장르: <span>{genres}</span></div>
                <div className='detailpage-info-majorinfo-basic-content' id='basic-director'>감독/연출진: <span>{director}</span></div>
                <div className='detailpage-info-majorinfo-basic-content' id='basic-actor'>배우: <span>{actor}</span></div>
                <div id='detailpage-info-majorinfo-storyline'>
                    <p id='detailpage-info-majorinfo-bold-storyline'>{contentBold}</p>
                    <p id='detailpage-info-majorinfo-detail-storyline'>{contentDetail}</p>
                </div>
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

SearchMovieResult.propTypes, RecommendMovieList.propTypes, CategoryMovieList.propTypes = {
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
}

BannerMovieView.propTypes = {
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
  
export {SearchMovieResult, BannerMovieView, RecommendMovieList, CategoryMovieList, MovieDetailTitle, MovieDetail, MovieDetailTrailer, MovieDetailStillcut}
