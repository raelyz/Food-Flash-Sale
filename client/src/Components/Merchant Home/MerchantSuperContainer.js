import React, { Component } from 'react'
import ItemList from '../Merchant/ItemList/ItemList'
import CreateItem from '../Merchant/CreateItem/CreateItem';
import EditForm from './Edit/EditForm'
import EditContainer from './Edit/EditContainer'
import OrderListContainer from './AllOrders/OrderListContainer'
import { Route, Link, Redirect, Switch, withRouter } from 'react-router-dom'
import DashboardContainer from './Dashboard/DashboardContainer'

class MerchantSuperContainer extends Component {
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
                this.setState({
                    list: res
                })
            }).catch(err => {
                console.log(err)
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
            }).then(res => {
                this.props.history.push("/ItemList")
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
                <nav class="navbar navbar-expand-lg navbar-trans fixed-top navbar-shrink" id="mainNav">
                    <div class="container">
                        <a class="navbar-brand js-scroll-trigger" href="#page-top"><img src="assets/img/navbar-logo.svg" alt="" /></a>
                        <button class="navbar-toggler navbar-toggler-right collapsed" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            Menu
                    <svg class="svg-inline--fa fa-bars fa-w-14 ml-1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg><i class="fas fa-bars ml-1"></i>
                        </button>
                        <div class="navbar-collapse collapse" id="navbarResponsive" >
                            <ul class="navbar-nav text-uppercase ml-auto">
                                <li class="nav-item"><Link to="/" className="nav-link js-scroll-trigger active" >Dashboard</Link></li>
                                <li class="nav-item"><Link to="/ItemList" className="nav-link js-scroll-trigger" >Item List</Link></li>
                                <li class="nav-item"><Link to="/CreateItem" className="nav-link js-scroll-trigger" >Create Item</Link></li>
                                <li class="nav-item"><Link to="/AllOrders" className="nav-link js-scroll-trigger" >All Orders</Link></li>
                                <li class="nav-item"><a className="nav-link js-scroll-trigger logout" onClick={this.props.onLogout} >Log out</a></li>
                            </ul>
                        </div>
                    </div >
                </nav>

                <div style={{ marginTop: "140px" }}>

                </div>





                <Switch>
                    <Route path="/ItemList" render={
                        () => <ItemList list={this.state.list} merchant_id={this.props.merchant_id} />
                    } />

                    <Route path="/CreateItem" render={
                        () => <CreateItem merchant_id={this.props.merchant_id} onClick={this.onClickHandler} />
                    } />

                    <Route path="/AllOrders" render={
                        () => <OrderListContainer merchant_id={this.props.merchant_id} />
                    } />

                    <Route path="/EditItem/:listing_id/:category_id/:time_limit_min" render={
                        (props) => <EditContainer {...props} list={this.state.list} onClick={this.onClickHandler} />
                    } />

                    <Route path="/" render={
                        () => <DashboardContainer merchant_id={this.props.merchant_id} />
                    } />
                </Switch>
            </>
        )
    }
}

export default withRouter(MerchantSuperContainer)