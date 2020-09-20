import React, { useState, Component } from 'react'
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import EachMerchant from './EachMerchant/EachMerchant'
import ListingContainer from '../IndivStore/ListingContainer'
import OrderHistory from '../OrderHistory/OrderHistory'
import IndivListing from '../IndivStore/IndivListing'
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
            lat: this.props.lat,
            lon: this.props.lon,
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
        let lat = this.props.lat
        let lon = this.props.lon

        nArray.sort(function (a, b) {
            var radlatUser = Math.PI * lat / 180;
            var radlatA = Math.PI * a.latitude / 180;
            var theta = lon - a.longitude;
            var radtheta = Math.PI * theta / 180;
            var distA = Math.sin(radlatUser) * Math.sin(radlatA) + Math.cos(radlatUser) * Math.cos(radlatA) * Math.cos(radtheta);
            if (distA > 1) {
                distA = 1;
            }
            distA = Math.acos(distA);
            distA = distA * 180 / Math.PI;
            distA = distA * 60 * 1.1515;
            distA = distA * 1.609344
            let distanceA = distA * 1.609344
            var radlatB = Math.PI * b.latitude / 180;
            var theta = lon - b.longitude;
            var radtheta = Math.PI * theta / 180;
            var distB = Math.sin(radlatUser) * Math.sin(radlatB) + Math.cos(radlatUser) * Math.cos(radlatB) * Math.cos(radtheta);
            if (distB > 1) {
                distB = 1;
            }
            distB = Math.acos(distB);
            distB = distB * 180 / Math.PI;
            distB = distB * 60 * 1.1515;
            distB = distB * 1.609344
            let distanceB = distB * 1.609344
            console.log(a.latitude)
            console.log(a.longitude)
            return distanceA - distanceB
        })
        if (nArray.length > 20) {
            nArray.splice(19, nArray.length - 20)
        }
        let merchantCard = nArray.map((eachCard, index) => {
            const discount = (eachCard.unit_price - eachCard.price_floor) / eachCard.unit_price * 100
            let path = "/" + eachCard.merchant_id
            var radlatUser = Math.PI * lat / 180;
            var radlatA = Math.PI * eachCard.latitude / 180;
            var theta = lon - eachCard.longitude;
            var radtheta = Math.PI * theta / 180;
            var distA = Math.sin(radlatUser) * Math.sin(radlatA) + Math.cos(radlatUser) * Math.cos(radlatA) * Math.cos(radtheta);
            if (distA > 1) {
                distA = 1;
            }
            distA = Math.acos(distA);
            distA = distA * 180 / Math.PI;
            distA = distA * 60 * 1.1515;
            distA = distA * 1.609344;
            let distance = distA * 1.609344;

            return < Link className="col-lg-4 col-md-6 mb-4" to={path} >
                <EachMerchant className="card h-100" key={index} duration={eachCard.time_limit_min} time={eachCard.time} merchant_Id={eachCard.merchant_id} what={this.testing}>
                    <img class="card-img-top" src="https://picsum.photos/700/400" alt="" />
                    <h4>{eachCard.name} {discount}%</h4>
                    <p>{distance}km</p>
                    <p class="card-text">Lorem ipsum dolor sit amet</p>
                </EachMerchant>
            </Link >
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
                                <h1>By Distance</h1>
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