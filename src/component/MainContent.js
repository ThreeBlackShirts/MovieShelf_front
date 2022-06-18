import React, { Component } from 'react';

import MovieService from 'service/MovieService';

class MainContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userEmail: localStorage.getItem("authenticatedUser") || '',
            token: localStorage.getItem("token") || '',
            //target 예시. 나중에 위시리스트 적용되면 변경해야함.
            target: '범죄도시2',
            recommendData : [],
            categoryData : [],
            hasLoginFailed: false,
            showSuccessMessage: false,
        }
    }

    recommendMovieList() {
        console.log("Recommendation Movie")
        if(this.state.target !== null && this.state.target !== ""){
            console.log(this.state.target +"'s recommnedation")
            MovieService
                .recommendation(this.state.target)
                .then((response) => {
                    console.log(response.data.data)
                    this.state = ({ recommendData: response.data.data })
                }).catch(() => {
                    console.log("Recommendation failed")
                    alert("Recommendation fail");
                });
        }else{
            console.log("target error")
            history.back()
        }
    }

    categoryMovieList() {
        console.log("MovieShelf's category Movie")
        MovieService
            .category()
            .then((response) => {
                console.log(response.data.data)
                this.state = ({ categoryData: response.data.data })
            }).catch(() => {
                console.log("category failed")
                alert("category fail");
            });
    }

    render() {
        return (

            <div className="main-content">
                <div className="main-content-userpick">
                    영화 포스터가 나열될 수 있게 리스트 html 작성 필요
                </div>
                
            </div>
    
            /*
                    <input type="text" className="header-content-userbtn-search-btn-text" list='header-content-search-list'></input>
                    <datalist id='header-content-search-list'>
                        <option value="제목"></option>
                        <option value="배우"></option>
                        <option value="장르"></option>
                    </datalist>
    
             */
        );
    }
}

export default MainContent;