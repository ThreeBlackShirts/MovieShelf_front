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

    handleChange = (e) => {
        this.setState(
            {
                [e.target.id]: e.target.value
            }
        )
    }
   
    getUserInfo = () => {
        UserService
            .findUserByEmail(this.state.userEmail)
            .then((response) => {
                console.log(response.data)
                // this.setState({
                //     token: response.data.data
                // });
                this.state.userName = response.data.userName
                this.state.userNickname = response.data.userNickname
                console.log(response.data.userName)
                console.log(this.state.userName)
                console.log(this.state.userNickname)
            }).catch((error) => {
                console.log(error.response)
            });
    }

    render() {
        return (

            <div className="user-info">
                <div className="user-info-content">
                    content
                    <div className="userName" name="userName" id="userName" onChange={this.handleChange}>
                        {this.state.userName}
                    </div>
                </div>
            </div>
        );
    }

}

export default UserContent;