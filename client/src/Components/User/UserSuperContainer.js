import React, { Component } from 'react'
import OrderHistory from './OrderHistory/OrderHistory'
import ListingContainer from './IndivStore/ListingContainer';
import GeoLocation from './GeoLocation/GeoLocation';
import LoggedInNavBar from './Navbar/LoggedInNavBar'
import LoggedInFooter from './Footer/LoggedInFooter'

export default class UserSuperContainer extends Component {
    // <LoggedInNavBar />
    // Order history linked from navbar
    // Timeline/Geolocation by default
    // Listing when clicked on each shop in time line/Or when clicked on buy again in order history

    // <OrderHistory />
    // <ListingContainer />
    constructor(props) {
        super()
        this.state = {
        }
    }

    onClickOrderHistory = () => {

    }
    onClickTimeline = () => {

    }
    render() {
        return (
            <>
                <GeoLocation stripper={this.props.stripper} />
                <LoggedInFooter orderHistory={this.onClickOrderHistory} timeline={this.onClickTimeline} />
            </>
        )
    }
}