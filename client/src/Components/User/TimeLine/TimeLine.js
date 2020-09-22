import React, { Component } from 'react'
import EachMerchant from './EachMerchant/EachMerchant'
import OrderHistory from '../OrderHistory/OrderHistory'
import { Route, Link, Redirect, Switch, withRouter } from 'react-router-dom'
import IndivListing from '../IndivStore/IndivListing'
import ListingContainer from '../IndivStore/ListingContainer'
import ByCategory from './housekeeping switch'
import ByDiscount from './ByDiscount';
import ByDistance from './ByDistance';
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
                <Link class="col-lg-4 col-md-6 mb-4" to={path}>
                    <EachMerchant className="card h-100" key={index} duration={eachCard.time_limit_min} time={eachCard.time} merchant_Id={eachCard.merchant_id} what={this.testing}>
                        <img class="card-img-top" src={`https://picsum.photos/id/${Math.pow(index, 2)}/700/400`} alt="" />
                        <h4>{eachCard.name} {discount}%</h4>
                        <p class="card-text">{eachCard.description}</p>
                    </EachMerchant>
                </Link>)
        })
        // console.log(newerArray, `After splice`)
        let deletedMerchantCard = this.state.deletedArray.map((eachCard, index) => {
            const discount = ((eachCard.unit_price - eachCard.price_floor) / eachCard.unit_price * 100).toFixed(0)
            let path = "/" + eachCard.merchant_id
            return <Link className="col-lg-4 col-sm-6 mb-4" to={path}>
                <div className="col-lg-4 col-sm-6 mb-4">
                    <div className="portfolio-item">
                        <div className="portfolio-hover">
                            <div className="portfolio-hover-content"><i className="fas fa-plus fa-3x">
                            </i></div>
                        </div>
                        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal2"></a>
                        <img class="img-fluid" src={`https://picsum.photos/id/${Math.pow(index, 2)}/700/400`} alt="" />
                        <div className="portfolio-caption">
                            <div className="portfolio-caption-heading">{eachCard.Merchant}</div>
                            <div className="portfolio-caption-subheading text-muted"> {eachCard.name}  up to{discount}%</div>
                        </div>
                    </div>
                </div>


            </Link>
        })
        const routeArray = nArray.map((eachCard, index) => {
            let path = "/" + eachCard.merchant_id + "/" + eachCard.listing_id
            return <Route path={path} render={
                () => <ListingContainer user_id={this.props.user_id} listing_id={eachCard.listing_id} merchant_id={eachCard.merchant_id} stripper={this.props.stripper} />
            } />
        })
        return (<>
            <div id="background"></div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div class="container">
                    <a class="navbar-brand" href="#">Start Bootstrap</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active">
                                <Link to="/Timeline" onClick={this.unhideSort}>Timeline<span class="sr-only">(current)</span></Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/Orderhistory" onClick={this.hideSort}>Order history</Link>
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
                    <label style={{ display: this.state.sortDisplay }}>Sort by:</label>
                    <select onChange={this.changePage} style={{ display: this.state.sortDisplay }}>
                        <option value="Time">Time Left</option>
                        <option value="Discount">Discount</option>
                        <option value="Distance">Distance</option>
                    </select>
                </div>
                <main className="mainDisplay">
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
                        <Route path="/" render={
                            () => <>

                                <section className="page-section  bg-trans portfolio wrapper" >
                                    <div class="container">
                                        <div class="text-center">
                                            <h2 class="section-heading text-uppercase">Ongoing Deals</h2>

                                            <h3 class="section-subheading text-muted">Catch them while you can!</h3>
                                        </div>
                                        <div>{merchantCard}</div>
                                    </div>
                                </section>
                                <section className="page-section  bg-trans portfolio wrapper">
                                    <div class="container">
                                        <div class="text-center">
                                            <h2 class="section-heading text-uppercase">They are gone..</h2>

                                            <h3 class="section-subheading text-muted">You were too late!</h3>
                                        </div>
                                        {deletedMerchantCard}
                                    </div>
                                </section>
                            </>
                        } />
                    </Switch>
                </main>
            </div >
        </>
        )
    }
}

export default withRouter(TimeLine)
