import React, { Component } from 'react';

import MovieService from 'service/MovieService';
import 'style/listpage.css';

import { FiSearch } from "react-icons/fi";

class ListContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userEmail: localStorage.getItem("authenticatedUser") || '',
            token: localStorage.getItem("token") || '',
            input: localStorage.getItem("input") || '',
            data: [],
            hasLoginFailed: false,
            showSuccessMessage: false,
        }
        this.searchMovie = this.searchMovie.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    searchMovie() {
        console.log("search start")
        if(this.state.input !== null && this.state.input !== ""){
            console.log(this.state.input +" search")
            MovieService
                .search(this.state.input)
                .then((response) => {
                    console.log(response.data.data)
                    localStorage.removeItem("input")
                    //this.state.data에 검색된 영화(제목, 포스터url)들 리스트로 담겨있음.
                    //잘 모르겠으면 콘솔 출력된 것 보기!
                    this.state = ({ data: response.data.data })
                }).catch(() => {
                    console.log("search failed")
                });
        }else{
            console.log("input to listpage error")
            history.back()
        }
    }

    targetNameSet() {
        //const target = document.getElementById("").innerText
        //window.localStorage.setItem('target', target)
        window.localStorage.setItem('target', "범죄도시2")
        //location.href(`/detail/${target}`)
        location.href = "/detail"
    }

    render() {
        return (
            <div className="listpage-content" onLoad={this.searchMovie}>
                <div className="listpage-content-search">
                    <div className="listpage-content-search-btnwrap">
                        <input type="text" id="listpage-search-text" placeholder='검색한 단어' value={this.state.input}></input>
                        <FiSearch className="listpage-search-btn-icon"/>
                    </div>
                </div>
                <div className="listpage-content-result">
                    <div className="listpage-content-result-item" onClick={this.targetNameSet}>
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
        );
    }
}

export default ListContent;