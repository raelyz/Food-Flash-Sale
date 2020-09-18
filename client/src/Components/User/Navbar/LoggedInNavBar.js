import React, { Component } from 'react'
export default class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <div>Image here</div>
                <div className="login break" onClick={this.props.orderHistory}>Order History</div>
                <div className="login break" onClick={this.props.timeline}>Timeline</div>
            </div>
        )
    }
}