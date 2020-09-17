import React from 'react';
import axios from 'axios';


export default class PaymentOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        revenue: this.props.cart.[0].count/2* this.props.cart[0].price,
        quantity: this.props.cart.[0].count/2,
        user_id: 1

    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData("submission");

    console.log(data)

    fetch('/submitOrder', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
          });
  }


  render() {
    return (
        <div>
        <h1>Order Summary</h1>
        <p>{this.props.cart[0].name}</p>
        <p>quantity {this.props.cart.[0].count/2}</p>
        <p>Total: {this.props.cart.[0].count/2* this.props.cart[0].price}</p>

      <form action="/submitOrder" method="POST">
        <label htmlFor="name">Enter name</label>
        <input id="username" name="username" type="text" />

        <label htmlFor="credit">Credit Card</label>
        <input id="credit" name="credit" type="text" />
        <input type="hidden" value={this.props.cart[0].merchant_id} name="merchant_id"/>
        <input type="hidden" value={this.state.user_id} name="user_id"/>
        <input type="hidden" value={this.props.cart[0].price} name="price"/>
        <input type="hidden" value={this.props.cart[0].listing_id} name="listing_id"/>
        <input type="hidden" value={this.state.quantity} name="quantity"/>
        <input type="hidden" value={this.state.revenue} name="revenue"/>

        <input type="submit" value="submit" />
      </form>
      </div>
    );
  }
}