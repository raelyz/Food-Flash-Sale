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
            let timeFromData = new Date(eachCard.time)
            let timeElapsed = ((Date.now() - timeFromData) / (60000))
            let trueTime = timeElapsed / (eachCard.original_quantity - eachCard.quantity)
            if (eachCard.original_quantity == eachCard.quantity) {
                trueTime = timeElapsed
            }
            let theoreticalTime = (eachCard.time_limit_min - 10) / eachCard.original_quantity
            let discIncrement = (eachCard.price_ceiling - eachCard.price_floor) / eachCard.original_quantity
            let disc = 0
            let price = eachCard.price_ceiling
            if (theoreticalTime < trueTime) {
                console.log(`triggered`)
                disc = discIncrement * Math.floor((timeElapsed / theoreticalTime));
                price = eachCard.price_ceiling - disc;
            }
            console.log(theoreticalTime, trueTime, eachCard.item_name)
            const discount = ((eachCard.unit_price - price.toFixed(2)) / eachCard.unit_price * 100).toFixed(0)
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
                        <div className="portfolio-caption-heading">{eachCard.item_name} {discount}% off!</div>
                        <div className="portfolio-caption-subheading">{eachCard.name}</div>
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
            let timeFromData = new Date(eachCard.time)
            let timeElapsed = ((Date.now() - timeFromData) / (60000))
            let trueTime = timeElapsed / (eachCard.original_quantity - eachCard.quantity)
            let theoreticalTime = (eachCard.time_limit_min - 10) / eachCard.original_quantity
            let discIncrement = (eachCard.price_ceiling - eachCard.price_floor) / eachCard.original_quantity
            let disc = 0
            let price = eachCard.price_ceiling
            if (theoreticalTime < trueTime) {
                disc = discIncrement * Math.floor((timeElapsed / theoreticalTime));
                price = eachCard.price_ceiling - disc;
            }
            let path = "/" + eachCard.merchant_id + "/" + eachCard.listing_id
            return <Route path={path} render={
                () => <ListingContainer user_id={this.props.user_id} listing_id={eachCard.listing_id} merchant_id={eachCard.merchant_id} stripper={this.props.stripper} price={price} />
            } />
        })
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
                                <li class="nav-item"><Link to="/Timeline" class="nav-link js-scroll-trigger active" onClick={this.unhideSort}>Timeline</Link></li>
                                <li class="nav-item"><Link to="/Orderhistory" class="nav-link js-scroll-trigger" onClick={this.hideSort}>Order history</Link></li>
                                <li class="nav-item"><a class="nav-link js-scroll-trigger logout" onClick={this.props.onLogout} >Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <ControlledCarousel></ControlledCarousel>

                <section className="page-section  bg-trans portfolio wrapper" id="ongoing" >
                    <div className="container">
                        <div>
                            <label style={{ display: this.state.sortDisplay }}>Sort by:</label>
                            <select id="normal-select-1" onChange={this.changePage} style={{ display: this.state.sortDisplay }}>
                                <option className="select-dropdown__list-item" value="Time">Time Left</option>
                                <option className="select-dropdown__list-item" value="Discount">Discount</option>
                                <option className="select-dropdown__list-item" value="Distance">Distance</option>
                            </select>
                        </div>
                        <Switch>
                            {routeArray}
                            <Route path="/Orderhistory" render={
                                () => <OrderHistory user_id={this.props.user_id} />
                            } />
                            {/* <Route path="/ByCategory" render=
                            () => <ByCategory data={this.state.timeLine} lon={this.props.lon} lat={this.props.lat} />
                        } /> */}
                            <Route path="/ByDistance" render={() => <ByDistance lon={this.props.lon} lat={this.props.lat} />} />
                            <Route path="/ByDiscount" render={() => <ByDiscount lon={this.props.lon} lat={this.props.lat} />} />
                            <Route path="/" render={() => <><section className="page-section  bg-trans portfolio wrapper">
                                <div className="container">
                                    <div className="text-center" >
                                        <h2 className="section-heading text-uppercase">Ongoing Deals</h2>
                                        <h3 className="section-subheading text-muted">Catch them while you can!</h3>
                                    </div>
                                    <div className="row" >{merchantCard}</div>
                                </div >
                            </section>
                                <section className="page-section  bg-trans portfolio wrapper" id="expired" >
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
                    </div>
                </section>
            </>
        )
    }
}

export default withRouter(TimeLine)




//
// we have access to total quantity put out for sale, quantity remaining, price ceiling, price floor, unit_price, timestamp in EachCard, 
//  
//  true time taken to sell an item = (timestampnow - timestamp from data) / (quantity - quantity remaining) 
//  expected time to sell an item = sale duration / quantity
//  TT = current time - starting time / quantity initial - quantity remaining
//  TT = 0 / 20 = 0 min / item (price ceiling price)
//  TT = 9:40 - 9-30 / 20-20 = 10 min / item flaw in the formula if denominator is 0 we set it to 1
//  TT = 9:45 - 9:30 / 20-20 = 15min / item
//  TT = 9:54-9:30 / 20-15 = 5min / item 
//  ET = 80 mins / 20 = 4mins / item
//  
//  Discount quantum (abs disc) = price ceiling - price floor 
//  abs disc / qty = discount quantum per ET (lets call this D where D is the absolute discount value you're giving when you trigger the code)
//  Every ET,  compare ET and TT
//  case 1 if ET > TT, DO NOTHING
//  case 2 if ET < TT, kick in ++D until it caps out at discount quantum (abs disc)
//  
//  Discount Quantum (abs disc)= 5.80 - 4.50 = 1.30
//  IF quantity to sell is 20, discount given per item = 1.30/20 = 0.065 
//  The first item, we give a discount of 0.065, if it doesnt sell, at the 4 min mark, increase it to 0.065+0.065
//  If the first item still doesn't sell at the 12 min mark, up it to 0.065*3 and caps out at 1.30
//  
//  80 min mark = price floor
//  Trigger timings = Total time / Discount Tranches eg (60 min/ 4 tranches) = 15 mins (every 15 mins check and compare TT to ET)
//  First Option
//  1) Starting Price is our price ceiling
//  2) When timeleft = time left / 2
//  3) price will be price ceiling + price floor /2
//  4) taking time left split into 4 Segements
// 
//  segment1
//  price ceiling -  80/100 * price difference = 6.54
//  segment2
//  price ceiling - 60/100 * price difference = 6.28
//  segment3
//  price ceiling - 40/100 * price difference = 6.02
//  segment4
//  if 10% or>
//     price ceiling - 20/100 * price difference =5.76
//     else
//     price floor
//     else (based on time set to price floor)
//  up 7
//  price ceiling 6.80
//  price floor   5.50         price difference 1.30 0-100%
//  price c
//  hard code average time on item creation into the database
//
//                                                       qty is static in our DB, possibly carry out second fetch on orders to sum qty to     //////////////                                                       calcualte OR write into DB a new column to keep adding to check sale
//  average time taken to sell an item , get current time - upload time = price difference divide by uploaded qty - remaining qty  ( ) <---------------------how?
//  compare it to the "estimated time" to sell 1hr 10
//
// if more/ less
// metric duration = time taken to sell out / tiem set by the user
// 10 items 0:00
// 9items   0:06
// 8         0:12<-------  average time setimt time_limit_min /items
//
//
// 1 hour
//
//
// Quantity demanded = -m1x + c1
// Day 1- 10 
// day 1 you put 10 for sale, the first item sold straight away at like maybe $8, but the 2nd item didn't move until you dropped it to about $4. At $4 we sold about maybe // 5, reduction of $2 you sold the remainder of 4
//
//
// Quantity Supplied = +m2x +c2 
//
//
//
//
//
//
//
//
//
