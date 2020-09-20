import React, { Component } from 'react'
import EachMerchant from './EachMerchant/EachMerchant'
import OrderHistory from '../OrderHistory/OrderHistory'
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import IndivListing from '../IndivStore/IndivListing'
import ListingContainer from '../IndivStore/ListingContainer'
import ByCategory from './housekeeping switch'
import ByDiscount from './ByDiscount';
import ByDistance from './ByDistance';
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
        const routeArray = nArray.map((eachCard, index) => {
            let path = "/" + eachCard.merchant_id
            return <Route path={path} render={
                () => <ListingContainer listing_id={eachCard.listing_id} merchant_id={eachCard.merchant_id} stripper={this.props.stripper} />
            } />
        })
        return (<>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div class="container">
                    <a class="navbar-brand" href="#">Start Bootstrap</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active">
                                <Link to="/Timeline">Timeline<span class="sr-only">(current)</span></Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/Orderhistory">Order history</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/ByDistance">Distance</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/ByDiscount">Discount</Link>
                            </li>
                        </ul>
                        <button onClick={this.props.onLogout}>Log out</button>
                    </div>
                </div>
            </nav>
            <div className='container'>
                <div id="carouselExampleIndicators" class="carousel slide my-4" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner" role="listbox">
                        <div class="carousel-item active">
                            <img class="d-block img-fluid" src="https://picsum.photos/1110/350" alt="First slide" />
                        </div>
                        <div class="carousel-item">
                            <img class="d-block img-fluid" src="https://picsum.photos/1110/350" alt="Second slide" />
                        </div>
                        <div class="carousel-item">
                            <img class="d-block img-fluid" src="https://picsum.photos/1110/350" alt="Third slide" />
                        </div>
                    </div>
                </div>
                <div>
                    <select >
                        <option value="Time">Time Left</option>
                        <option value="Discount">Discount</option>
                        <option value="Distance">Distance</option>
                    </select>
                </div>
                <main>
                    <Switch>
                        {routeArray}
                        <Route path="/Orderhistory" render={
                            () => <OrderHistory />
                        } />
                        {/* <Route path="/ByCategory" render={
                            () => <ByCategory data={this.state.timeLine} lon={this.props.lon} lat={this.props.lat} />
                        } /> */}
                        <Route path="/ByDistance" render={() => <ByDistance lon={this.props.lon} lat={this.props.lat} />} />
                        <Route path="/ByDiscount" render={() => <ByDiscount lon={this.props.lon} lat={this.props.lat} />} />
                        <Route path="/" render={
                            () => <>
                                <h1>Ongoing Deals</h1>
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
//
// 1 hour 
//
