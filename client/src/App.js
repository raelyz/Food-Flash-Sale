

import React from 'react';
import logo from './logo.svg';
import './App.css';
import OrderListContainer from './Components/Merchant Home/AllOrders/OrderListContainer';
export default class App extends React.Component {

    render() {
        return (
            <div className="App">

                <OrderListContainer/>

            </div>
        );
    }
}