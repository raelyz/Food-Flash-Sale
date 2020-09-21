import React, { Component } from 'react'
import ItemList from '../Merchant/ItemList/ItemList'
import CreateItem from '../Merchant/CreateItem/CreateItem';
import EditForm from './Edit/EditForm'
import EditContainer from './Edit/EditContainer'
import OrderListContainer from './AllOrders/OrderListContainer'
import LogedInNavbar from './Navbar/LogedInNavbar'
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import DashboardContainer from './Dashboard/DashboardContainer'

export default class UserSuperContainer extends Component {
    constructor() {
        super()
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        fetch(`/all/listing/${this.props.merchant_id}`) // change to this.props.merchantId
            .then(res => res.json())
            .then(res => {
                console.log(res, "------ inside fetch request")
                this.setState({
                    list: res
                })
            })
    }

    onClickHandler = (e) => {
        fetch(`/all/listing/${this.props.merchant_id}`) // change to this.props.merchantId
            .then(res => res.json())
            .then(res => {
                console.log(res, "------ inside fetch request")
                this.setState({
                    list: res
                })
            })
    }

    // <Route path="/EditItem/:listing_id" component={()=> <EditContainer list={this.state.list} />} />


    // <Route path="/EditItem/:listing_id" component={EditContainer} />
    //
    //     <Route path="/EditItem/:listing_id" render= {
    //     ()=><EditContainer list={this.state.list[0]} />
    // }/>

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
                    <Route path="/ItemList" render={
                        () => <ItemList list={this.state.list} />
                    } />

                    <Route path="/CreateItem" render={
                        () => <CreateItem merchant_id={this.props.merchant_id} onClick={this.onClickHandler} />
                    } />

                    <Route path="/AllOrders" render={
                        () => <OrderListContainer merchant_id={this.props.merchant_id} />
                    } />

                    <Route path="/EditItem/:listing_id" render={
                        (props) => <EditContainer {...props} list={this.state.list} />
                    } />

                    <Route path="/" render={
                        () => <DashboardContainer merchant_id={this.props.merchant_id} />
                    } />

                </Switch>
            </>
        )
    }
}