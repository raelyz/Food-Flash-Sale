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

        <tr key={index}>
          <OrderDetails
            name={orderHistory.name}
            cuisine={orderHistory.cuisine}
            user_id={orderHistory.user_id}
            receipt_id={orderHistory.receipt_id}
            merchant_id={orderHistory.merchant_id}
          />
        </tr>
      );
    });

    return (
      <div>
        {this.state.fetch ?
          <section className="page-section  bg-trans" >
            <table className="table">
              <tr>
                <th className="th">Store</th>
                <th className="th">Cuisine</th>
                <th className="th">Total</th>
                <th className="th">Rate it</th>
              </tr>

              {orderHistory}

            </table>
          </section>

          : null}
      </div>
    )
  }
}

export default withRouter(OrderHistory);