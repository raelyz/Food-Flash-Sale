import React, { Component } from 'react'
import ItemList from '../Merchant/ItemList/ItemList'
import CreateItem from '../Merchant/CreateItem/CreateItem';
import EditForm from './Edit/EditForm'
import EditContainer from './Edit/EditContainer'
import OrderListContainer from './AllOrders/OrderListContainer'
import LogedInNavbar from './Navbar/LogedInNavbar'
import {Route, Link, Redirect, Switch} from 'react-router-dom'
export default class UserSuperContainer extends Component {
    // When loged in render the dashbard first
    // Navbar
        // create item
        // Item list
            // Each item(Item List) has one Edit container
                // inside edit container(EditContainer) is and edit form (EditForm)
        // Orderlist containers (All orders)
    render() {
        return (
            <>
                <div className="navbar">
                    <div>Image here</div>
                    <Link to="/" className="login break" >Dashboard</Link>
                    <Link to="/ItemList" className="login" >Item List</Link>
                    <Link to="/CreateItem" className="login" >Create Item</Link>
                    <Link to="/AllOrders" className="login" >All Orders</Link>
                    <button onClick={this.props.onLogout}>Log out</button>
                </div>
                <Switch>
                    <Route path="/ItemList" render= {
                        ()=><ItemList />
                    }/>
                    <Route path="/CreateItem" render= {
                        ()=><CreateItem />
                    }/>
                    <Route path="/AllOrders" render= {
                        ()=><OrderListContainer />
                    }/>
                    <Route path="/" render= {
                        ()=><div>This here is the merchant dashboard</div>
                    }/>
                </Switch>
            </>
        )
    }
}