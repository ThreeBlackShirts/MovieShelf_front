import React, { Component } from 'react';

import MovieService from 'service/MovieService';

import { FiSearch } from "react-icons/fi";

class MainContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userEmail: localStorage.getItem("authenticatedUser") || '',
            token: localStorage.getItem("token") || '',
            testinput: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
        }
        // this.handleChange = this.handleChange.bind(this)
        this.searchMovie = this.searchMovie.bind(this)
    }
    handleChange = (e) => {
        this.setState(
            {
                [e.target.id]: e.target.value
            }
        )
    }

    searchMovie() {
        console.log("searchbtn clicked")
        MovieService
            .search(this.state.testinput)
            .then((response) => {
                console.log(response)
                alert(this.state.testinput +"search");
                /*
                this.setstate({
                    testresponse: response.data.data
                });
                */
                document.location.href = "/listpage";
            }).catch(() => {
                console.log("searchfailed")
                alert("search fail");
            });
    }

    allMovie() {
        console.log("allbtn clicked")
        MovieService
            .all()
            .then((response) => {
                console.log(response)
                alert("all");
            }).catch(() => {
                console.log("allfailed")
                alert("all fail");
            })
    }

    render() {
        return (

            <div className="main-content">
                <div className="main-content-userpick">
                    carousel
                    <input id='testinput' name='testinput' placeholder="당신의 영화를 검색해 보세요!" type="text" onChange={this.handleChange}/>
                    <FiSearch id="testsearch_icon1" onClick={this.searchMovie}/>
                    <FiSearch id="testsearch_icon2" onClick={this.allMovie}/>
                    <div id='testresponse'></div>
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