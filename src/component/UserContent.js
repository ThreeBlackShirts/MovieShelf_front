import React, { Component } from 'react';
import AuthenticationService from 'service/AuthenticationService';
import UserService from 'service/UserService';


class UserContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userEmail: localStorage.getItem("authenticatedUser") || '',
            token: localStorage.getItem("token") || '',
            userName: '',
            userNickname: '',
            hasLoginFailed: false,
        }
        // console.log(this.state);
        this.getUserInfo();
        // this.handleChange = this.handleChange.bind(this)
    }

   
    getUserInfo = () => {
        UserService
            .findUserByEmail(this.state.userEmail)
            .then((response) => {
                console.log(response.data)
                // this.setState({
                //     token: response.data.data
                // });
            }).catch(() => {
                console.log(error.response)
            });
    }

    render() {
        return (

            <div className="user-info">
                <div className="user-info-content">
                    content
                </div>
            </div>
        );
    }

}

export default UserContent;