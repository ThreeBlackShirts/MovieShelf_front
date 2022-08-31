import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import {SearchMovieResult} from './MovieContent';
import MovieService from 'service/MovieService';
import 'style/listpage.css';

import { FiSearch } from "react-icons/fi";

const ListContent = () => {
    let navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [input] = useState(searchParams.get('search'));
    const [searchInput, setSearchInput] = useState(searchParams.get('search'));
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isNull, setIsNull] = useState(false);

    const onChangeInput = e => setSearchInput(e.target.value);
        
    useEffect(() => {
        if(searchInput !== null && searchInput !== ""){
            MovieService
                .search(searchInput)
                .then((response) => {
                    if(response.data.data == [] || response.data.data == null || response.data.data.length == 0){
                        setIsNull(true)
                    } else {
                        setMovie(response.data.data)
                    }
                    setIsLoading(false)
                }).catch(() => {
                });
        }else{
            navigate(-1)
        }
    },[]);
    
    function onKeyPress(e) {
        if(e.key == 'Enter')
            setInput()
    }

    function setInput() {
        location.href = `/list/?search=${searchInput}`
    }

    function SearchNull() {
        return (
            <div id='listpage-content-search-null'>'{input}'에 대한검색 결과가 없습니다.</div>
        )
    }

    return (
        <div className="listpage-content">
            <div className="listpage-content-search">
                <div className="listpage-content-search-btnwrap">
                    <input type="text" id="listpage-search-text" placeholder={" '" + input + "'를 검색한 결과입니다"} onKeyUp={onKeyPress} onChange={onChangeInput}></input>
                    <FiSearch className="listpage-search-btn-icon" onClick={setInput}/>
                </div>
            </div>
            <div className="listpage-content-result">
                <div>
                    { isNull ? SearchNull() : null}
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