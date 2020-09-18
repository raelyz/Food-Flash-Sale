import React from 'react';
import logo from './logo.svg';
import './App.css';

import TimeLine from './Components/User/TimeLine/TimeLine';
import OrderHistory from './Components/User/OrderHistory/OrderHistory'
import Login from './Components/User/HomeLogin/Login'
import ItemList from './Components/Merchant/ItemList/ItemList'
import CreateItem from './Components/Merchant/CreateItem/CreateItem';
import PaymentOverlay from './Components/User/IndivStore/PaymentOverlay';
import ListingContainer from './Components/User/IndivStore/ListingContainer';


const stripper = process.env.REACT_APP_PUBLISHABLE_KEY

export default class App extends React.Component {

    componentDidMount() {

        fetch('/timeline')
            .then(res => res.text())
            .then(res => res)
    }

    render() {

        return (
            <div className="App">
                <ListingContainer stripper={stripper}></ListingContainer>
                <Login></Login>
                <TimeLine></TimeLine>
                <OrderHistory />
                <ItemList></ItemList>
                <CreateItem></CreateItem>
            </div>
        );
    }
}