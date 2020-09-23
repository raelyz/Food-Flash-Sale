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
            <>
                <nav class="navbar navbar-expand-lg navbar-trans fixed-top navbar-shrink" id="mainNav">
                    <div class="container">
                        <a class="navbar-brand js-scroll-trigger" href="#page-top"><img src="assets/img/navbar-logo.svg" alt="" /></a>
                        <button class="navbar-toggler navbar-toggler-right collapsed" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            Menu
                    <svg class="svg-inline--fa fa-bars fa-w-14 ml-1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg><i class="fas fa-bars ml-1"></i>
                        </button>
                        <div class="navbar-collapse collapse" id="navbarResponsive" >
                            <ul class="navbar-nav text-uppercase ml-auto">
                                <li class="nav-item"><a className="nav-link js-scroll-trigger active" href='#login' onClick={this.LoginShowModal}>Login</a></li>
                                <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#Register" onClick={this.RegisterShowModal}>Register</a></li>
                                <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#about">About</a></li>
                                <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#team">Team</a></li>
                                <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#contact">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <RegisterModal open={this.state.RisOpen} onClose={this.onClose} onClose={this.RegisterOnClose} onClick={this.props.onClickSignUp} onRegistered={this.props.onRegistered} />


                <LoginModal open={this.state.LisOpen} onClose={this.onClose} onClose={this.LoginOnClose} onClick={this.props.onClickLogin} onLogin={this.props.onLogin} />
            </>
        )
    }
}