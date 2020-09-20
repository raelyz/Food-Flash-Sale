import React, { Component } from "react";
import RatingStars from "./RatingStars";

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

    const total = price.reduce(function (acc, val) {
      return acc + val;
    }, 0);
    return (
      <div>
        <RatingStars />
        <div>{total}</div>
      </div>
    );
  }
}
