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
            return (

                <Link class="col-lg-4 col-md-6 mb-4" to={path}>
                    <EachMerchant className="card h-100" key={index} duration={eachCard.time_limit_min} time={eachCard.time} merchant_Id={eachCard.merchant_id} what={this.testing}>
                        <img class="card-img-top" src="https://picsum.photos/700/400" alt="" />
                        <h4>{eachCard.name} {discount}%</h4>
                        <p class="card-text">Lorem ipsum dolor sit amet</p>
                    </EachMerchant>
                </Link>)
        })

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

        const routeArray = newerArray.map((eachCard, index) => {
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
                                <a class="nav-link" href="#">Services</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Contact</a>
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
                <main>
                    <Switch>
                        {routeArray}
                        <Route path="/Orderhistory" render={
                            () => <OrderHistory />
                        } />
                        <Route path="/" render={
                            () => <><h1>Ongoing Deals</h1><div className="row">{merchantCard}</div>
                                <h1>Expired Deals</h1>
                                <div className="row">{deletedMerchantCard}</div></>
                        } />
                    </Switch>
                </main>
            </div >
        </>
        )
    }
}