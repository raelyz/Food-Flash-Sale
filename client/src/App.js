import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListingContainer from './Components/User/IndivStore/ListingContainer'
import Login from './Components/User/HomeLogin/Login'
export default class App extends React.Component {

    render() {
        return (
            <div className="App">
                <Login />
                <ListingContainer/>

            </div>
        );
    }
}