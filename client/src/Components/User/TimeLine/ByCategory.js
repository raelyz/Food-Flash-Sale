import React, { useState } from 'react'
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import EachMerchant from './EachMerchant/EachMerchantbyCategory'
import ListingContainer from '../IndivStore/ListingContainer'


export default function ByCategory(props) {

    const [dropdown, setDropdown] = useState("Time");

    let newArray = props.data.map((item, index) => {
        const uploadTime = new Date(item.time)
        uploadTime.setMinutes(uploadTime.getMinutes() + item.time_limit_min)
        let difference = +uploadTime - +new Date();
        if (difference > 0) {
            return item
        }
    })
    const [sorted, setSorted] = useState(newArray)

    let dropDownOnChangeHandler = (e) => {

        switch (e.target.value) {
            default:
                newArray.sort(function (a, b) {
                    const uploadTimeA = new Date(a.time)
                    uploadTimeA.setMinutes(uploadTimeA.getMinutes() + a.time_limit_min)
                    const uploadTimeB = new Date(b.time)
                    uploadTimeB.setMinutes(uploadTimeB.getMinutes() + b.time_limit_min)
                    // console.log(`A`, uploadTimeA)
                    // console.log(`B`, uploadTimeB)
                    // console.log(uploadTimeA - uploadTimeB)
                    return uploadTimeA - uploadTimeB
                })
                setSorted(newArray)
                break;
            case "Discount":
                newArray.sort(function (a, b) {
                    var Adiscount = (a.unit_price - a.price_floor) / a.unit_price * 100
                    var Bdiscount = (b.unit_price - b.price_floor) / b.unit_price * 100
                    return Bdiscount - Adiscount
                })
                setSorted(newArray)
                break;
            case "Distance":
                newArray.sort(function (a, b) {
                    var radlatUser = Math.PI * props.lat / 180;
                    var radlatA = Math.PI * a.latitude / 180;
                    var theta = props.lon - a.longitude;
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
                    var theta = props.lon - b.longitude;
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
                setSorted(newArray)
                break;

        }
    }

    const merchantCard = sorted.map((eachCard, index) => {
        const discount = (eachCard.unit_price - eachCard.price_floor) / eachCard.unit_price * 100
        let path = "/" + eachCard.merchant_id
        return (

            <Link class="col-lg-4 col-md-6 mb-4" to={path}>
                <EachMerchant className="card h-100" key={index} duration={eachCard.time_limit_min} time={eachCard.time} merchant_Id={eachCard.merchant_id}>
                    <img class="card-img-top" src="https://picsum.photos/700/400" alt="" />
                    <h4>{eachCard.name} {discount}%</h4>
                    <p class="card-text">Lorem ipsum dolor sit amet</p>
                </EachMerchant>
            </Link>)
    })



    const routeArray = newArray.map((eachCard, index) => {
        let path = "/" + eachCard.merchant_id
        return <Route path={path} render={
            () => <ListingContainer listing_id={eachCard.listing_id} merchant_id={eachCard.merchant_id} stripper={this.props.stripper} />
        } />
    })


    return (
        <div>
            <select onChange={(e) => {
                dropDownOnChangeHandler(e)
            }}>
                <option value="Time">Time Left</option>
                <option value="Discount">Discount</option>
                <option value="Distance">Distance</option>
            </select>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {merchantCard}
            </div>
        </div>
    )
}
