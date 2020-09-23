import React from 'react'
import Register from './HomeLogin/Register'
import Login from './HomeLogin/Login'
import NavBar from './Navbar/Navbar'

const Home = ({ displaysignup, displaylogin, onRegistered, onLogin }) => {
    return (
        <div className="hero">
            <div id="background"></div>

            <Register
                displaysignup={displaysignup}
                onRegistered={onRegistered}
            />
            <Login
                displaylogin={displaylogin}
                onLogin={onLogin}
            />
        </div>
    )
}

export default Home;