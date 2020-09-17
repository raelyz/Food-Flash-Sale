

import React from 'react';
import logo from './logo.svg';
import './App.css';


import TimeLine from './Components/User/TimeLine/TimeLine';
import OrderHistory from './Components/User/OrderHistory/OrderHistory'
import Login from './Components/User/HomeLogin/Login'
import ItemList from './Components/Merchant/ItemList/ItemList'
import CreateItem from './Components/Merchant/CreateItem/CreateItem';
export default class App extends React.Component {



    render() {

    componentDidMount() {

        fetch('/timeline')
            .then(res => res.text())
            .then(res => res)
    }


        return (
            <div className="App">
                <Login></Login>
                <TimeLine></TimeLine>
                <OrderHistory />
                <ItemList></ItemList>
                <CreateItem></CreateItem>

            </div>
        );
    }
}