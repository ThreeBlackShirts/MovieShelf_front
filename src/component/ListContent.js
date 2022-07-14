import React, { Component, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import {SearchMovieResult} from './MovieContent';
import MovieService from 'service/MovieService';
import 'style/listpage.css';

import { FiSearch } from "react-icons/fi";

const ListContent = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchInput, serSearchInput] = useState(searchParams.get('search'));
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [hasLoginFailed, setHasLoginFailed] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
        
    useEffect(() => {
        console.log("search start")
        if(searchInput !== null && searchInput !== ""){
            console.log(searchInput +" search")
            MovieService
                .search(searchInput)
                .then((response) => {
                    console.log(response.data.data)
                    if(response.data.data == [] || response.data.data == null || response.data.data.length == 0){
                        alert("검색 결과가 없습니다. 다시 검색해주세요.")
                        history.back()
                    }
                    setMovie(response.data.data)
                    setIsLoading(false)
                    console.log(movie)
                }).catch(() => {
                    console.log("search failed")
                });
        }else{
            console.log("input to listpage error")
            history.back()
        }
    },[]);
    
    
    function onKeyPress(e) {
        if(e.key == 'Enter')
            setInput()
    }

    function setInput() {
        let url = `/list/?search=${document.getElementById("listpage-search-text").value}`
        location.href = url
    }

    return (
        <div className="listpage-content">
            <div className="listpage-content-search">
                <div className="listpage-content-search-btnwrap">
                    <input type="text" id="listpage-search-text" placeholder={" '" + searchInput + "'를 검색한 결과입니다"} onKeyUp={onKeyPress}></input>
                    <FiSearch className="listpage-search-btn-icon" onClick={setInput}/>
                </div>
            </div>
            <div className="listpage-content-result">
                <div>
                    { isLoading ? "Loading..." : movie.map( movie => (
                        <SearchMovieResult   key={movie.movieId}
                            id = {movie.movieId}
                            title={movie.movieTitle}
                            poster={movie.moviePoster} />
                )) }</div>
            </div>
        </div>
    );

}

export default ListContent;