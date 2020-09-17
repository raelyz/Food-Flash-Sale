

import React from 'react';
import logo from './logo.svg';
import './App.css';
import EditContainer from './Components/Merchant Home/Edit/EditContainer';
export default class App extends React.Component {

    render() {
        return (
            <div className="App">

                <EditContainer/>

            </div>
        );
    }
}