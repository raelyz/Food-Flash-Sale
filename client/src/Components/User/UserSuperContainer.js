import React, { Component } from "react";
import OrderHistory from "./OrderHistory/OrderHistory";
import ListingContainer from "./IndivStore/ListingContainer";
import GeoLocation from "./GeoLocation/GeoLocation";
import LoggedInFooter from "./Footer/LoggedInFooter";

export default class UserSuperContainer extends Component {


    render() {
        return (
            <>
                <GeoLocation user_id={this.props.user_id} onLogout={this.props.onLogout} stripper={this.props.stripper} />
                <LoggedInFooter />
            </>
        )
    }
}