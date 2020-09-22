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
            changePage: "user"
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
        if (this.state.alternate) {
            this.setState({
                displayOverlaySignUp: "block",
                displayOverlayLogin: "none",
                alternate2: true,
                alternate: false
            })
        } else {
            this.setState({
                displayOverlaySignUp: "none",
                alternate: true
            })
        }
    }
    onClickLogin = (e) => {
        if (this.state.alternate2) {
            this.setState({
                displayOverlayLogin: "block",
                displayOverlaySignUp: "none",
                alternate: true,
                alternate2: false
            })
        } else {
            this.setState({
                displayOverlayLogin: "none",
                alternate2: true
            })
        }
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
                            changePage={this.changePage}
                        />

                        <Home
                            displaysignup={this.state.displayOverlaySignUp}
                            displaylogin={this.state.displayOverlayLogin}
                            onRegistered={this.onRegistered}
                            onLogin={this.onLogin}
                        />
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
                        />

                        <MercHome
                            displaysignup={this.state.displayOverlaySignUp}
                            displaylogin={this.state.displayOverlayLogin}
                            MercOnRegistered={this.MercOnRegistered}
                            MercOnLogin={this.MercOnLogin}
                        />
                        <MerchFooter />
                    </div>
                )
            }
        }
    }
}

export default withRouter(App);