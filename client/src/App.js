import React from 'react';
import logo from './logo.svg';
import './App.css';


import OrderListContainer from './Components/Merchant Home/AllOrders/OrderListComponent';

export default class App extends React.Component {


    componentDidMount() {

        fetch('/timeline')
            .then(res => res.text())
            .then(res => res)
    }


        return (
            <div className="App">

                <OrderListContainer />

            </div>
        );
    }
}