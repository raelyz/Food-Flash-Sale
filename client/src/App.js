import React from "react";
import { withRouter } from 'react-router'
import logo from "./logo.svg";
import "./App.css";
import "./styles.css";
import PaymentOverlay from "./Components/User/IndivStore/PaymentOverlay";
import Home from "./Components/User/Home";
import Navbar from "./Components/User/Navbar/Navbar";
import Footer from "./Components/User/Footer/Footer";
import MercNavbar from "./Components/Merchant Home/Navbar/Navbar";
import MercHome from "./Components/Merchant Home/Home";
import MerchFooter from "./Components/Merchant Home/Footer/Footer";
import GeoLocation from "./Components/User/GeoLocation/GeoLocation";
import UserSuperContainer from "./Components/User/UserSuperContainer";
import './UserModalCss.scss'
import MerchantSuperContainer from "./Components/Merchant Home/MerchantSuperContainer";

const stripper = process.env.REACT_APP_PUBLISHABLE_KEY;

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: "",
            userName: "",
            merchant_id: "",
            merchantUsername: "",
            optionsChoice: "User",
            displayOverlaySignUp: "none",
            displayOverlayLogin: "none",
            alternate: true,
            alternate2: true,
            changePage: "user",
            isOpen: false
        }
    }

    componentDidMount() {
        fetch('/home')
            .then(res => res.json())
            .then(res => {
                // If we are receiving userId and userName
                if (res.userId && res.userName) {
                    this.setState({
                        userId: res.userId,
                        userName: res.userName
                    })
                } else if (res.merchant_id && res.merchantUsername) {
                    // If we are receiving merchant_id and merchantName
                    this.setState({
                        merchant_id: res.merchantId,
                        merchantUsername: res.merchantUsername
                    })
                } else {
                    this.setState({
                        merchant_id: "",
                        merchantUsername: "",
                        userId: "",
                        userName: ""
                    })
                }
            }).catch(err => {
                console.log(err)
            })
    }
    onClickSignUp = (e) => {
        // if (this.state.alternate) {
        //     this.setState({
        //         displayOverlaySignUp: "block",
        //         displayOverlayLogin: "none",
        //         alternate2: true,
        //         alternate: false
        //     })
        // } else {
        //     this.setState({
        //         displayOverlaySignUp: "none",
        //         alternate: true
        //     })
        // }
    }
    onClickLogin = (e) => {
        // if (this.state.alternate2) {
        //     this.setState({
        //         displayOverlayLogin: "block",
        //         displayOverlaySignUp: "none",
        //         alternate: true,
        //         alternate2: false
        //     })
        // } else {
        //     this.setState({
        //         displayOverlayLogin: "none",
        //         alternate2: true
        //     })
        // }
    }
    // PASS THIS 2 THINGS BELOW TO YOUR CHILD COMPONENTS IF YOU NEED THE ID OR USERNAME FOR LOGIN AND REGISTER
    // userId={this.state.userId} userName={this.state.userName}
    onRegistered = (id, name) => {
        this.setState({
            userId: id,
            userName: name
        })
    }
    onLogin = (id, name) => {
        this.setState({
            userId: id,
            userName: name
        })
    }
    MercOnRegistered = (id, name) => {
        this.setState({
            merchant_id: id,
            merchantUsername: name
        })
    }
    MercOnLogin = (id, name) => {
        this.setState({
            merchant_id: id,
            merchantUsername: name
        })
    }
    changePage = (e) => {
        this.setState({
            changePage: e.target.value
        })
    }
    onLogout = (e) => {
        fetch('/logout')
            .then(res => res.json())
            .then(res => { })
        this.setState({
            merchant_id: "",
            merchantUsername: "",
            userId: "",
            userName: ""
        })
        this.props.history.push("/")
    }

    render() {
        // If merchnatID and merchantUsername is present render the merchant dashboard page and pass in their respective data
        if (this.state.merchant_id && this.state.merchantUsername) {
            return (
                <MerchantSuperContainer className="App MainContainerMerchant" onLogout={this.onLogout} merchant_id={this.state.merchant_id} />
            )
        } else if (this.state.userId && this.state.userName) {
            // If userId and userName is present, render the timeline page and pass in their respective data
            return (
                <UserSuperContainer className="App MainContainerUser" user_id={this.state.userId} onLogout={this.onLogout} stripper={stripper} />
            );
        } else {
            if (this.state.changePage == 'user') {
                return (
                    <div className="App">
                        <Navbar
                            onClickSignUp={this.onClickSignUp}
                            onClickLogin={this.onClickLogin}

                            onLogin={this.onLogin}
                            onRegistered={this.onRegistered}

                            changePage={this.changePage}
                        />
                        <Home />
                        <Footer />
                    </div>
                );
            } else {
                return (
                    <div className="App">
                        <MercNavbar
                            onClickSignUp={this.onClickSignUp}
                            onClickLogin={this.onClickLogin}

                            changePage={this.changePage}

                            MercOnRegistered={this.MercOnRegistered}
                            MercOnLogin={this.MercOnLogin}
                        />
                        <header class="masthead">
                            <div class="container">
                                <div class="masthead-subheading">Food Flash Sale</div>
                                <div class="masthead-heading text-uppercase">Hey there Partner!</div>
                                <button className="buttons btn-hover color-6"><a id="whitebutton" class=" js-scroll-trigger" href="#earn">Tell Me More</a></button>
                            </div>
                        </header>
                        <section class="page-section" id="earn">
                            <div class="container">
                                <div class="text-center">
                                    <h2 class="section-heading text-uppercase">Ready to earn more?</h2>
                                    <h3 class="section-subheading text-muted">Make your inventory work harder </h3>
                                </div>
                                <div class="row text-center">
                                    <div class="col-md-4">
                                        <span class="fa-stack fa-4x">
                                            <i class="fas fa-circle fa-stack-2x text-primary"></i>
                                            <i class="fas fa-shopping-cart fa-stack-1x fa-inverse"></i>
                                        </span>
                                        <h4 class="my-3">Put your name out there</h4>
                                        <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
                                    </div>
                                    <div class="col-md-4">
                                        <span class="fa-stack fa-4x">
                                            <i class="fas fa-circle fa-stack-2x text-primary"></i>
                                            <i class="fas fa-laptop fa-stack-1x fa-inverse"></i>
                                        </span>
                                        <h4 class="my-3">Earn Money</h4>
                                        <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
                                    </div>
                                    <div class="col-md-4">
                                        <span class="fa-stack fa-4x">
                                            <i class="fas fa-circle fa-stack-2x text-primary"></i>
                                            <i class="fas fa-lock fa-stack-1x fa-inverse"></i>
                                        </span>
                                        <h4 class="my-3">Get a brand new customer base</h4>
                                        <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path className="gradient-bg" points="0,0 100,0 0,66" fill-opacity="1" d="M0,32L48,64C96,96,192,160,288,202.7C384,245,480,267,576,261.3C672,256,768,224,864,229.3C960,235,1056,277,1152,282.7C1248,288,1344,256,1392,240L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            <defs>
                                <linearGradient id="header-shape-gradient" x2="0.35" y2="1">
                                    <stop offset="0%" stop-color="var(--color-stop)" />
                                    <stop offset="30%" stop-color="var(--color-stop)" />
                                    <stop offset="100%" stop-color="var(--color-bot)" />
                                </linearGradient>
                            </defs>
                        </svg>

                        <MerchFooter />
                    </div>
                )
            }
        }
    }
}

export default withRouter(App);