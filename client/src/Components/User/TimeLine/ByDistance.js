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
            let path = "/" + eachCard.merchant_id + "/" + eachCard.listing_id
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
            return <EachMerchant key={index} duration={eachCard.time_limit_min} time={eachCard.time} merchant_Id={eachCard.merchant_id} what={this.testing}>
                <Link className="portfolio-link" to={path}>
                    <div className="portfolio-hover">
                        <div class="portfolio-hover-content">
                        </div>
                    </div>
                    <img class="img-fluid" src={`https://picsum.photos/id/${Math.pow(index, 2)}/700/400`} alt="" />
                </Link >
                <div className="portfolio-caption">
                    <div className="portfolio-caption-heading">{eachCard.name} {discount}%</div>
                    <div className="portfolio-caption-subheading text-muted">{eachCard.description}</div>
                </div>
            </EachMerchant>
        })
        let deletedMerchantCard = this.state.deletedArray.map((eachCard, index) => {
            const discount = ((eachCard.unit_price - eachCard.price_floor) / eachCard.unit_price * 100).toFixed(0)
            let path = "/" + eachCard.merchant_id
            return <div className="col-lg-4 col-sm-6 mb-4">
                <div className="itemWrapper">
                    <div className="portfolio-item">
                        <Link className="portfolio-link" to={path}>
                            <div className="portfolio-hover">
                                <div className="portfolio-hover-content">
                                </div>
                            </div>
                            <img className="img-fluid" src={`https://picsum.photos/id/${Math.pow(index, 2)}/700/400`} alt="" />
                        </Link >
                        <div className="portfolio-caption">
                            <div className="portfolio-caption-heading">{eachCard.name}up to{discount}%</div>
                            <div className="portfolio-caption-subheading text-muted">{eachCard.description}</div>
                        </div>
                    </div>
                </div>
            </div>
        })
        return (
            <>
                <Switch>
                    <Route path="/Orderhistory" render={
                        () => <OrderHistory />
                    } />
                    <Route path="/" render={() => <><section className="page-section  bg-trans portfolio wrapper" id="services" >
                        <div className="container">
                            <div className="text-center">
                                <h2 className="section-heading text-uppercase">Ongoing Deals</h2>
                                <h3 className="section-subheading text-muted">Catch them while you can!</h3>
                            </div>
                            <div className="row">{merchantCard}</div>
                        </div>
                    </section>
                        <section className="page-section  bg-trans portfolio wrapper" id="expired">
                            <div className="container">
                                <div className="text-center">
                                    <h2 className="section-heading text-uppercase">They are gone..</h2>

                                    <h3 className="section-subheading text-muted">You were too late!</h3>
                                </div>
                                <div className="row">
                                    {deletedMerchantCard}
                                </div>
                            </div>
                        </section></>} />
                </Switch>
            </>
        )
    }
}