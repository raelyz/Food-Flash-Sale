import React, { Component } from 'react'
export default class LogedInNavbar extends Component {
    render() {
        return (
            <div className="navbar">
                <div>Image here</div>
                <div className="login break" onClick={this.props.onClickSignUp}>Sign up</div>
                <div className="login" onClick={this.props.onClickLogin}>Login</div>
            </div>
        )
    }
}