import React, { Component } from 'react'
import EachMerchant from './EachMerchant/EachMerchant'
import OrderHistory from '../OrderHistory/OrderHistory'
import {Route, Link, Redirect, Switch} from 'react-router-dom'
import IndivListing from '../IndivStore/IndivListing'
import ListingContainer from '../IndivStore/ListingContainer'
export default class TimeLine extends Component {
    constructor() {
        super()
        this.state = {
            timeLine: []
        }
    }
    componentDidMount() {
        fetch('/timeline')
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState({
                    timeLine: res
                })
            })
    }
    render() {
        const merchantCard = this.state.timeLine.map((eachCard, index) => {
            const discount = (eachCard.unit_price - eachCard.price_floor) / eachCard.unit_price * 100
            let path = "/" + eachCard.merchant_id
            return <Link to={path} >
                <EachMerchant  className="indMerc" key={index} duration={eachCard.time_limit_min} time={eachCard.time} merchant_Id={eachCard.merchant_id}>
                    <div>{eachCard.name}</div>
                    <div>up to{discount}%</div>
                </EachMerchant>
            </Link>
        })
        const routeArray = this.state.timeLine.map((eachCard, index) => {
            let path = "/" + eachCard.merchant_id
            return <Route path={path} render={
                            ()=> <ListingContainer merchant_id={eachCard.merchant_id} />
                        }/>
        })
        return (
            <div>
                <div className="navbar">
                    <div>Image here</div>
                    <Link className="login break" to="/Timeline">Timeline</Link>
                    <Link className="login break" to="/Orderhistory">Order history</Link>
                    <button onClick={this.props.onLogout}>Log out</button>
                </div>
                <main>
                    <Switch>
                        {routeArray}
                        <Route path="/Orderhistory" render = {
                            ()=><OrderHistory />
                        }/>
                        <Route path="/" render= {
                            ()=> <div>{merchantCard}</div>
                        }/>
                    </Switch>
                </main>
            </div>
        )
    }
}