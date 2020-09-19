import React, { Component } from 'react'
import EachMerchant from './EachMerchant/EachMerchant'
import OrderHistory from '../OrderHistory/OrderHistory'
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import IndivListing from '../IndivStore/IndivListing'
import ListingContainer from '../IndivStore/ListingContainer'

var fetching = true

export default class TimeLine extends Component {
    constructor(props) {
        super()
        this.state = {
            timeLine: [],
            deletedArray: [],
            fetch: true
        }
    }
    componentDidMount() {
        fetch('/timeline')
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                this.setState({
                    timeLine: res,
                    newTimeLine: res
                })
            })

        fetch('/deletedlisting')
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                res.sort(function (a, b) {
                    const uploadTimeA = new Date(a.time)
                    const uploadTimeB = new Date(b.time)
                    return uploadTimeB - uploadTimeA
                })
                this.setState({
                    deletedArray: res
                })
            })

    }

    testing = (prop) => {

        if (fetching === true) {
            fetching = false
            setTimeout(() => {
                console.log(`fetching new list soon`)
                fetch('/timeline')
                    .then(res => res.json())
                    .then(res => {
                        console.log(res, `fetched`)
                        fetching = true
                        this.setState({
                            timeLine: res,
                            fetch: !this.state.fetch
                        })
                    })
            }, 5000)

            setTimeout(() => {
                console.log(`fetching deleted list soon`)
                fetch('/deletedlisting')
                    .then((res) => res.json())
                    .then((res) => {
                        res.sort(function (a, b) {
                            const uploadTimeA = new Date(a.time)
                            const uploadTimeB = new Date(b.time)
                            return uploadTimeB - uploadTimeA
                        })
                        let result = res.slice(0, 5)
                        this.setState({
                            deletedArray: result
                        })
                    })
            }, 5000)

            setTimeout(() => {
                let defunctArray = this.state.timeLine.map((item, index) => {
                    const uploadTime = new Date(item.time)
                    uploadTime.setMinutes(uploadTime.getMinutes() + item.time_limit_min)
                    let difference = +uploadTime - +new Date();
                    if (difference < 0) {
                        return item
                    }
                })
                let newArray = defunctArray.filter((item) => {
                    return item
                })
                console.log(`deleting soon`)
                fetch('/tidyuplisting', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ toBeDeleted: newArray })
                })
                    .then((res) => res.text())
                    .then((res) => {
                        console.log(res)
                    })
            }, 10000)
        }
    }
    render() {
        let newArray = this.state.timeLine.map((item, index) => {
            const uploadTime = new Date(item.time)
            uploadTime.setMinutes(uploadTime.getMinutes() + item.time_limit_min)
            let difference = +uploadTime - +new Date();
            if (difference > 0) {
                return item
            }
        })
        let newerArray = newArray.filter((item) => {
            return item
        })


        newerArray.sort(function (a, b) {
            const uploadTimeA = new Date(a.time)
            uploadTimeA.setMinutes(uploadTimeA.getMinutes() + a.time_limit_min)
            const uploadTimeB = new Date(b.time)
            uploadTimeB.setMinutes(uploadTimeB.getMinutes() + b.time_limit_min)
            return uploadTimeA - uploadTimeB
        })
        // console.log(newerArray, `before splice`)
        if (newerArray.length > 20) {
            newerArray.splice(19, newerArray.length - 20)
        }
        // console.log(newerArray, `After splice`)
        let merchantCard = newerArray.map((eachCard, index) => {
            const discount = (eachCard.unit_price - eachCard.price_floor) / eachCard.unit_price * 100
            let path = "/" + eachCard.merchant_id
            return <Link to={path}>

                <EachMerchant className="indMerc" key={index} duration={eachCard.time_limit_min} time={eachCard.time} merchant_Id={eachCard.merchant_id} what={this.testing}>
                    <div>{index}{eachCard.name}</div>
                    <div>up to{discount}%</div>
                </EachMerchant>

            </Link>
        })

        let deletedMerchantCard = this.state.deletedArray.map((eachCard, index) => {
            const discount = (eachCard.unit_price - eachCard.price_floor) / eachCard.unit_price * 100
            let path = "/" + eachCard.merchant_id
            return <Link to={path}>

                <>
                    <div>{eachCard.Merchant}</div>
                    <div>{index}{eachCard.name}</div>
                    <div>up to{discount}%</div>
                </>

            </Link>
        })

        const routeArray = newerArray.map((eachCard, index) => {
            let path = "/" + eachCard.merchant_id
            return <Route path={path} render={
                () => <ListingContainer merchant_id={eachCard.merchant_id} stripper={this.props.stripper} />
            } />
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
                        <Route path="/Orderhistory" render={
                            () => <OrderHistory />
                        } />
                        <Route path="/" render={
                            () => <><div>{merchantCard}</div>
                                <div>{deletedMerchantCard}</div></>
                        } />
                    </Switch>
                </main>
            </div >
        )
    }
}