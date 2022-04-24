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
            <div className="main-content">
                <div className="main-content-userpick">
                    carousel
                </div>
                <div className="main-content-recommended-popular">
                    <div>
                        
                    </div>
                </div>
                <div className="main-content-recommended-new">
    
                </div>
                <div className="main-content-recommended-genre">
    
                </div>
            </div>
    
             */
        );
    }
}

export default MainContent;