import React, { useState, Component } from 'react'
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import EachMerchant from './EachMerchant/EachMerchant'
import ListingContainer from '../IndivStore/ListingContainer'
import OrderHistory from '../OrderHistory/OrderHistory'

var fetching = true
var newArray = []

export default class TimeLine extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timeLine: [],
            deletedArray: [],
            filter: "",
            sorted: [],
            lat: props.lat,
            lon: props.lon,
            status: 'True',
            mode: 'default'

        }
    }
    componentDidMount() {
        fetch('/timeline')
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                this.setState({
                    timeLine: res,
                })
            })

        fetch('/deletedlisting')
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                if (res && res.length > 0) {
                    res.sort(function (a, b) {
                        const uploadTimeA = new Date(a.time)
                        const uploadTimeB = new Date(b.time)
                        return uploadTimeB - uploadTimeA
                    })
                    this.setState({
                        deletedArray: res
                    })
                }
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
                        })
                    })
            }, 5000)

            setTimeout(() => {
                console.log(`fetching deleted list soon`)
                fetch('/deletedlisting')
                    .then((res) => res.json())
                    .then((res) => {
                        if (res && res.length > 0) {
                            res.sort(function (a, b) {
                                const uploadTimeA = new Date(a.time)
                                const uploadTimeB = new Date(b.time)
                                return uploadTimeB - uploadTimeA
                            })
                            this.setState({
                                deletedArray: res
                            })
                        }
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

        let Array = this.state.timeLine.map((item, index) => {
            const uploadTime = new Date(item.time)
            uploadTime.setMinutes(uploadTime.getMinutes() + item.time_limit_min)
            let difference = +uploadTime - +new Date();
            if (difference > 0) {
                return item
            }
        })
        let nArray = Array.filter((item) => {
            return item
        })


        nArray.sort(function (a, b) {
            var Adiscount = (a.unit_price - a.price_floor) / a.unit_price * 100
            var Bdiscount = (b.unit_price - b.price_floor) / b.unit_price * 100
            return Bdiscount - Adiscount
            console.log(`sorting discount`)
        })
        // console.log(newerArray, `before splice`)
        if (nArray.length > 20) {
            nArray.splice(19, nArray.length - 20)
        }
        let merchantCard = nArray.map((eachCard, index) => {
            const discount = (eachCard.unit_price - eachCard.price_floor) / eachCard.unit_price * 100
            let path = "/" + eachCard.merchant_id
            return (

                <Link class="col-lg-4 col-md-6 mb-4" to={path}>
                    <EachMerchant className="card h-100" key={index} duration={eachCard.time_limit_min} time={eachCard.time} merchant_Id={eachCard.merchant_id} what={this.testing}>
                        <img class="card-img-top" src="https://picsum.photos/700/400" alt="" />
                        <h4>{eachCard.name} {discount}%</h4>
                        <p class="card-text">Lorem ipsum dolor sit amet</p>
                    </EachMerchant>
                </Link>)
        })
        // console.log(newerArray, `After splice`)
        let deletedMerchantCard = this.state.deletedArray.map((eachCard, index) => {
            const discount = (eachCard.unit_price - eachCard.price_floor) / eachCard.unit_price * 100
            let path = "/" + eachCard.merchant_id
            return <Link class="col-lg-4 col-md-6 mb-4" to={path}>
                <div className="card h-100">
                    <img class="card-img-top" src="https://picsum.photos/700/400" alt="" />
                    <div className="card-body">
                        <h4 class="card-title">
                            {eachCard.Merchant}
                        </h4>
                        <div>{eachCard.name}</div>
                        <div>up to{discount}%</div>
                    </div>
                </div>
            </Link>
        })
        console.log(this.state.status)
        const routeArray = nArray.map((eachCard, index) => {
            let path = "/" + eachCard.merchant_id
            return <Route path={path} render={
                () => <ListingContainer listing_id={eachCard.listing_id} merchant_id={eachCard.merchant_id} stripper={this.props.stripper} />
            } />
        })
        return (<>
            <div className='container'>
                <main>
                    <Switch>
                        {routeArray}
                        <Route path="/Orderhistory" render={
                            () => <OrderHistory />
                        } />
                        {/* <Route path="/ByCategory" render={
                            () => <ByCategory data={this.state.timeLine} lon={this.props.lon} lat={this.props.lat} />
                        } /> */}
                        <Route path="/" render={
                            () => <>
                                <h1>By Discount</h1>
                                <div className="row">{(this.state.status) ? merchantCard : <div>sortedCard</div>}</div>
                                <h1>Expired Deals</h1>
                                <div className="row">{deletedMerchantCard}</div>
                            </>
                        } />
                    </Switch>
                </main>
            </div >
        </>
        )
    }
}