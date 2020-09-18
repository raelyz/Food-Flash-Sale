import React, { Component } from 'react'
export default class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <div>Image here</div>
                <select className="options" onChange={this.props.changePage}>
                    <option value="user">User</option>
                    <option value="merchant">Merchant</option>
                </select>
                <div className="login break" onClick={this.props.onClickSignUp}>Sign up</div>
                <div className="login" onClick={this.props.onClickLogin}>Login</div>
            </div>
        )
    }
}