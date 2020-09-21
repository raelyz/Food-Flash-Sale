import React, { Component } from "react";
import RatingStars from "./RatingStars";
import RatingStarsContainer from "./RatingStarsContainer";

export default class OrderDetails extends Component {
  constructor(props) {
    super();
    this.state = {
      details: [],
      fetch: false,
      receipt_id: props.receipt_id,
    };
  }

  componentDidMount() {
    fetch("/all/listing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ receipt_id: this.state.receipt_id }),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res)
        this.setState({
          details: res,
          fetch: true,
        });
      });
  }

  render() {
    const price = this.state.details.map((order) => {
      let total = parseInt(order.price) * parseInt(order.quantity);
      // console.log(total)
      total += parseInt(total);
      return total;
    });
    const listing_id = this.state.details.map((item) => {
      return item.listing_id;
    });
    const total = price.reduce(function (acc, val) {
      return acc + val;
    }, 0);
    return (
      <div>
        <RatingStarsContainer
          listing_id={listing_id[0]}
          merchant_id={this.props.merchant_id}
          user_id={this.props.user_id}
          receipt_id={this.props.receipt_id}
        />
        <div>{total}</div>
      </div>
    );
  }
}
