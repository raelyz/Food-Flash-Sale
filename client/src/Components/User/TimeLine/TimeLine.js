import React, { Component } from 'react'
import EachMerchant from './EachMerchant/EachMerchant'
import OrderHistory from '../OrderHistory/OrderHistory'
import { Route, Link, Redirect, Switch, withRouter } from 'react-router-dom'
import IndivListing from '../IndivStore/IndivListing'
import ListingContainer from '../IndivStore/ListingContainer'
import ByCategory from './housekeeping switch'
import ByDiscount from './ByDiscount';
import ByDistance from './ByDistance';
import ControlledCarousel from './ControlledCarousel';
var fetching = true
var newArray = []


class TimeLine extends Component {
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
            mode: 'default',
            sortDisplay: "block"

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
    changePage = (e) => {
        if (e.target.value === "Discount") {
            this.props.history.push("/ByDiscount")
        } else if (e.target.value === "Distance") {
            this.props.history.push("/ByDistance")
        } else {
            this.props.history.push("/")
        }
    }

    hideSort = () => {
        this.setState({
            sortDisplay: "none"
        })
    }
    unhideSort = () => {
        this.setState({
            sortDisplay: "block"
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
                    if (difference < 0 || item.quantity === 0) {
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
            const uploadTimeA = new Date(a.time)
            uploadTimeA.setMinutes(uploadTimeA.getMinutes() + a.time_limit_min)
            const uploadTimeB = new Date(b.time)
            uploadTimeB.setMinutes(uploadTimeB.getMinutes() + b.time_limit_min)
            return uploadTimeA - uploadTimeB
        })
        // console.log(newerArray, `before splice`)
        if (nArray.length > 20) {
            nArray.splice(19, nArray.length - 20)
        }
        let merchantCard = nArray.map((eachCard, index) => {
            const discount = ((eachCard.unit_price - eachCard.price_floor) / eachCard.unit_price * 100).toFixed(0)
            let path = "/" + eachCard.merchant_id + "/" + eachCard.listing_id
            return (
                <EachMerchant key={index} duration={eachCard.time_limit_min} time={eachCard.time} merchant_Id={eachCard.merchant_id} what={this.testing}>
                    <Link className="portfolio-link" to={path}>
                        <div className="portfolio-hover">
                            <div class="portfolio-hover-content">
                            </div>
                        </div>
                        <img class="img-fluid" src={`https://picsum.photos/id/${Math.pow(index, 2)}/700/400`} alt="" />
                    </Link>
                    <div className="portfolio-caption">
                        <div className="portfolio-caption-heading">{eachCard.name} {discount}%</div>
                        <div className="portfolio-caption-subheading text-muted">{eachCard.description}</div>
                    </div>
                </EachMerchant>
            )
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
                        </Link>
                        <div className="portfolio-caption">
                            <div className="portfolio-caption-heading">{eachCard.name}up to{discount}%</div>
                            <div className="portfolio-caption-subheading text-muted">{eachCard.description}</div>
                        </div>
                    </div>
                </div>
            </div>
        })
        const routeArray = nArray.map((eachCard, index) => {
            let path = "/" + eachCard.merchant_id + "/" + eachCard.listing_id
            return <Route path={path} render={
                () => <ListingContainer user_id={this.props.user_id} listing_id={eachCard.listing_id} merchant_id={eachCard.merchant_id} stripper={this.props.stripper} />
            } />
        })
        return (
            <>
                <div id="background"></div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <div className="container">
                        <a className="navbar-brand" href="#">Start Bootstrap</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <Link to="/Timeline" onClick={this.unhideSort}>Timeline<span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Orderhistory" onClick={this.hideSort}>Order history</Link>
                                </li>
                            </ul>
                            <button onClick={this.props.onLogout}>Log out</button>
                        </div>
                    </div>
                </nav>

                <ControlledCarousel></ControlledCarousel>
                <div className="dropdown">
                    <label style={{ display: this.state.sortDisplay }}>Sort by:</label>
                    <select onChange={this.changePage} style={{ display: this.state.sortDisplay }}>
                        <option value="Time">Time Left</option>
                        <option value="Discount">Discount</option>
                        <option value="Distance">Distance</option>
                    </select>
                </div>

                <Switch>
                    {routeArray}
                    <Route path="/Orderhistory" render={
                        () => <OrderHistory user_id={this.props.user_id} />
                    } />
                    {/* <Route path="/ByCategory" render={
                            () => <ByCategory data={this.state.timeLine} lon={this.props.lon} lat={this.props.lat} />
                        } /> */}
                    <Route path="/ByDistance" render={() => <ByDistance lon={this.props.lon} lat={this.props.lat} />} />
                    <Route path="/ByDiscount" render={() => <ByDiscount lon={this.props.lon} lat={this.props.lat} />} />
                    <Route path="/" render={() => <><section className="page-section  bg-trans portfolio wrapper" id="services" >
                        <div className="container">
                            <div className="text-center">
                                <h2 className="section-heading text-uppercase">Ongoing Deals</h2>
                                <h3 className="section-subheading text-muted">Catch them while you can!</h3>
                            </div>
                            <div className="row">{merchantCard}</div>
                        </div>
                    </section>
                        <section className="page-section  bg-trans portfolio wrapper">
                            <div className="container">
                                <div className="text-center">
                                    <h2 className="section-heading text-uppercase">They are gone..</h2>

                                    <h3 className="section-subheading text-muted">You were too late!</h3>
                                </div>
                                <div className="row">
                                    {deletedMerchantCard}
                                </div>
                            </div>
                        </section></>
                    } />
                </Switch>




            </>
        )
    }
}

export default withRouter(TimeLine)
//
// First Option
// 1) Starting Price is our price ceiling
// 2) When timeleft = time left / 2
// 3) price will be price ceiling + price floor /2
// 4) taking time left split into 4 Segements
//
// segement1
//   price ceiling -  80/100 * price difference = 6.54
// segment2
//   price ceiling - 60/100 * price difference = 6.28
// segment3
//   price ceiling - 40/100 * price difference = 6.02
// segment4
// if 10% or>
//     price ceiling - 20/100 * price difference =5.76
//     else
//     price floor
//     else (based on time set to price floor)
// up 7
// price ceiling 6.80
// price floor   5.50         price difference 1.30 0-100%
// price c
// hard code average time on item creation into the database
//
//                                                       qty is static in our DB, possibly carry out second fetch on orders to sum qty to     ////////////                                                       calcualte OR write into DB a new column to keep adding to check sale
// average time taken to sell an item  get current time - upload time = price difference divide by uploaded qty - remaining qty  ( ) <---------------------how?
// compare it to the "estimated time" to sell 1hr 10
//
// if more/ less
// metric duration = time taken to sell out / tiem set by the user
// 10 items 0:00
// 9items   0:06
// 8         0:12<-------  average time setimt time_limit_min /items

//
// 1 hour
//