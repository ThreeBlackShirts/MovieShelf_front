import React, { Component } from 'react';

import MovieService from 'service/MovieService';

import { FiSearch } from "react-icons/fi";

class MainContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userEmail: localStorage.getItem("authenticatedUser") || '',
            token: localStorage.getItem("token") || '',
            hasLoginFailed: false,
            showSuccessMessage: false,
            testinput : ''
        }
        
    }
    handleChange(event) {
        this.setState(
            {
                [event.target.name] : event.target.value
            }
        )
    }

    searchMovie() {
        MovieService
            .search(this.state.testinput)
            .then((response) => {
                console.log(response)
                alert("search");
                /*
                this.setstate({
                    testresponse: response.data.data
                });
                */
                //document.location.href = "/listpage";
            }).catch(() => {
                console.log("searchfailed")
                alert("search fail");
            });
    }

    allMovie() {
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
                    <input id='testinput' placeholder="당신의 영화를 검색해 보세요!" type="text"></input>
                    <FiSearch id="testsearch_icon" onClick={this.searchMovie}/>
                    <FiSearch id="testsearch_icon" onClick={this.allMovie}/>
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