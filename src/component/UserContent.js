import React, { Component, useEffect, useState } from 'react';
import UserService from 'service/UserService';

const UserContent = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        UserService
            .findUserByEmail(localStorage.getItem("authenticatedUser"))
            .then((response) => {
                console.log(response.data)
                // this.setState({
                //     token: response.data.data
                // });
                // this.state.userName = response.data.data.userName
                // this.state.userNickname = response.data.data.userNickname
                // console.log(response.data.data.userName)
                // console.log(this.state.userName)
                // console.log(this.state.userNickname)
                setUsers(response.data.data);
            }).catch((error) => {
                console.log(error.response)
            });
    }, []);
    return (
        <div>
            <div id={users.userName} key={users.userName}>
                {users.userName}
            </div>
            <div id={users.userNickame} key={users.userNickame}>
                {users.userNickname}
            </div>
        </div>
    )
}

export default UserContent;