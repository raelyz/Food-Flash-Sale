import React, { Component } from 'react'
import RegisterModal from '../HomeLogin/RegisterModal'
import LoginModal from '../HomeLogin/LoginModal'

export default class Navbar extends Component {
    constructor() {
        super()
        this.state = {
            RisOpen: false,
            LisOpen: false
        }
    }
    RegisterShowModal = () => {
        this.setState({
            RisOpen: true
        });
    };
    LoginShowModal = () => {
        this.setState({
            LisOpen: true
        });
    };
    RegisterOnClose = () => {
        this.setState({ RisOpen: false });
    };
    LoginOnClose = () => {
        this.setState({ LisOpen: false });
    };
    render() {
        return (
            <div className="navbar">
                <div>Image here</div>
                <select className="options" onChange={this.props.changePage}>
                    <option value="user">User</option>
                    <option value="merchant">Merchant</option>
                </select>

                <button type="button" onClick={this.RegisterShowModal} >Sign Up 2</button>
                <RegisterModal  open={this.state.RisOpen} onClose={this.onClose} onClose={this.RegisterOnClose} onClick={this.props.onClickSignUp} onRegistered={this.props.onRegistered} />

                <button type="button" onClick={this.LoginShowModal} >Login</button>
                <LoginModal  open={this.state.LisOpen} onClose={this.onClose} onClose={this.LoginOnClose} onClick={this.props.onClickLogin} onLogin={this.props.onLogin} />
            </div>
            )
    }
}