import React, { Component } from "react";
import OrderDetails from "./OrderDetails/OrderDetails";
import { withRouter } from "react-router-dom";
import RatingStarsContainer from "./OrderDetails/RatingStarsContainer";

class OrderHistory extends Component {
  constructor() {
    super();
    this.state = {
      orderHistory: [],
      fetch: false,
    };
  }

  componentDidMount() {
    console.log(this.props.user_id)
    fetch(`/orderhistory/${this.props.user_id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          orderHistory: res,
          fetch: true,
        })
      });
  }

  // componentWillUnmount() {
  //     this.setState({
  //         fetch: false
  //     })
  // }
  render() {
    const orderHistory = this.state.orderHistory.map((orderHistory, index) => {
      return (
        <div>
          <div key={index}>
            {orderHistory.receipt_id}
            {orderHistory.name} {orderHistory.cuisine}
          </div>
          <OrderDetails
            user_id={orderHistory.user_id}
            receipt_id={orderHistory.receipt_id}
            merchant_id={orderHistory.merchant_id}
          />
          <button
            onClick={(e) => {
              e.persist();
              e.preventDefault();
            }}
          >
            Order Again
          </button>
        </div>
      );
    });

    return (
      <div className="orderHistoryWrapper">
        {/* {orderHistory} */}
        {this.state.fetch ? orderHistory : null}
      </div>
    );
  }
}

export default withRouter(OrderHistory);