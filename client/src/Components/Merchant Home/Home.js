import React from 'react'
import MercRegister from './HomeLogin/Register'
import MercLogin from './HomeLogin/Login'

const Home =({displaysignup, displaylogin, MercOnRegistered, MercOnLogin}) => {
    return (
        <div className="hero">
            <MercRegister
                displaysignup={displaysignup}
                MercOnRegistered={MercOnRegistered}
                />
            <MercLogin
            displaylogin={displaylogin}
            MercOnLogin={MercOnLogin}
            />
        </div>
    )
}

export default Home;