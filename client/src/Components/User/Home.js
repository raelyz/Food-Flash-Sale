import React from 'react'
import Register from './HomeLogin/Register'
import Login from './HomeLogin/Login'

const Home =({displaysignup, displaylogin, onRegistered, onLogin}) => {
    return (
        <div className="hero">
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