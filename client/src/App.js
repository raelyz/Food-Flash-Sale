import React from 'react';
import logo from './logo.svg';
import './App.css';
import TimeLine from './Components/User/TimeLine/TimeLine';
import OrderHistory from './Components/User/OrderHistory/OrderHistory'
import Home from './Components/User/Home'
import Navbar from './Components/User/Navbar/Navbar'
import Footer from './Components/User/Footer/Footer'
import MercNavbar from './Components/Merchant Home/Navbar/Navbar'
import MercHome from './Components/Merchant Home/Home'
import MerchFooter from './Components/Merchant Home/Footer/Footer'
export default class App extends React.Component {
    constructor() {
        super()
        this.state = {
            userId: "",
            userName: "",
            merchantId: "",
            merchantUsername: "",
            optionsChoice: "User",
            displayOverlaySignUp: "none",
            displayOverlayLogin: "none",
            alternate: true,
            alternate2: true,
            changePage: "user"
        }
    }
    static getDerivedStateFromProps(props, state) {
        return null
    }
    componentDidMount() {
        fetch('/home')
            .then(res => res.json())
            .then(res => {
                // If we are receiving userId and userName
                if(res.userId && res.userName) {
                    this.setState({
                        userId: res.userId,
                        userName: res.userName
                    })
                }
                if(res.merchantId && res.merchantUsername) {
                // If we are receiving merchantId and merchantName
                    this.setState({
                        merchantId: res.merchantId,
                        merchantUsername: res.merchantUsername
                    })
                }
            })
    }
    onClickSignUp=(e)=> {
        if(this.state.alternate) {
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
    onClickLogin=(e)=> {
        if(this.state.alternate2) {
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
    onRegistered=(id,name)=> {
            this.setState({
            userId: id,
            userName: name
        })
    }
    onLogin=(id,name)=> {
        this.setState({
            userId: id,
            userName: name
        })
    }
    MercOnRegistered=(id,name)=> {
            this.setState({
            merchantId: id,
            merchantUsername: name
        })
    }
    MercOnLogin=(id,name)=> {
        this.setState({
            merchantId: id,
            merchantUsername: name
        })
    }
    changePage=(e)=> {
        this.setState({
            changePage: e.target.value
        })
    }
    render() {
        // If merchnatID and merchantUsername is present render the merchant dashboard page and pass in their respective data
        if(this.state.merchantId && this.state.merchantUsername) {
            return (
                <div className="App MainContainerMerchant">
                    This is the start of the merchant page
                </div>
                )
        } else if(this.state.userId && this.state.userName) {
            // If userId and userName is present, render the timeline page and pass in their respective data
            return (
                <div className="App MainContainerUser" userId={this.state.userId}>
                    <TimeLine />
                    <OrderHistory />
                </div>
            );
        } else {
            if(this.state.changePage == 'user') {
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