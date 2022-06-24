import React, { Component } from 'react'
import AuthenticationService from 'service/AuthenticationService';

import 'style/logoutpage.css';

class LogoutComponent extends Component {

    constructor(props) {
        super(props)

        AuthenticationService.logout()
        console.log("logout")
    }

    backHome(){
        console.log("Good Bye");
        setTimeout(() => location.href="/",2000);
    }


    render() {
        return (
            <div className='logout-content' onLoad={this.backHome()}>
                <h1 className='logout-content-title'>You are logged out</h1>
                <div className="logout-content-container">
                    Thank You for Using Our Application.
                </div>
            </div>
        )
    }
}

export default LogoutComponent