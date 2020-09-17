import React from 'react';
import logo from './logo.svg';
import './App.css';

import TimeLine from './Components/User/TimeLine/TimeLine';
import OrderHistory from './Components/User/OrderHistory/OrderHistory'
import Login from './Components/User/HomeLogin/Login'
export default class App extends React.Component {


    componentDidMount() {

        fetch('/timeline')
            .then(res => res.text())
            .then(res => res)
    }


        return (
            <div className="App">
                <Login />
                <TimeLine />
                <OrderHistory />

            </div>
        );
    }
}