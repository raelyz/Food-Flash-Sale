import React from "react";
import IndivListing from "./IndivListing";
import Basket from "./Basket";
import CheckoutForm from "./CheckoutForm";
import PaymentOverlay from "./PaymentOverlay";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
export default class ListingContainer extends React.Component {
  constructor(props) {
    //mounting
    super(props);
    console.log("----inside Listing constructor");
    this.state = {
      merchant_id: props.merchant_id,
      merchant_name: "",
      merchant_img: "",
      html: [],
      result: [],
      cart: [],
      viewCart: false,
      checkout: false,
      listing_id: props.listing_id,
    };
    // this.addToCart = this.addToCart.bind(this);
    this.navigateTo = this.navigateTo.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
    this.handleCheckOut = this.handleCheckOut.bind(this);
  }
  //
  //payment click handlling
  handleCheckOut() {
    this.setState({ checkout: true });
  }
  //delete from cart
  handleRemoveFromCart(e, item) {
    if (this.state.cart[0]) {

      this.setState((state) => {
        if (state.cart[0].count > 2) {
          const cart = state.cart.filter((element) => element.count = element.count - 1);
          // localStorage.setItem("cart", cart);
          return { cart };
        } else {
          console.log(`hello`)
          const cart = state.cart.filter((element) => element.count = 0);
          // localStorage.setItem('cart', cart);
          return { cart };
        }

      });
    }
  }
  //   //add to cart button
  //   addToCart(e, addToCart) {
  //     console.log(addToCart);
  //     this.setState((prevState) => ({ cart: [...prevState.cart, addToCart] }));
  //   }
  // view cart button
  navigateTo() {
    if (this.state.cart[0]) {
      this.setState({ viewCart: !this.state.viewCart });
    }
  }
  //add to cart button
  handleAddToCart(e, product) {
    console.log(product);
    this.setState((state) => {
      const cart = state.cart;
      console.log(state.cart, `statecart`)
      console.log(cart, `cart`)
      let productAlreadyInCart = false;
      cart.forEach((item) => {
        if (item.name === product.name) {
          if (item.count / 2 < product.quantity) {
            productAlreadyInCart = true;
            console.log(`you're adding`)
            item.count++;
          } else {
            productAlreadyInCart = true;
          }
        }
      });
      if (!productAlreadyInCart) {
        if (product.quantity > 0) {
          cart.push({ ...product, count: 1 });
        }
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log(this.state.cart, "----cart");
      return cart;
    });
  }
  //when state is changed, FETCH results from aPI
  //side effects ie: HTTP requests are allowed here
  componentDidMount() {
    fetch(`/indivshop/${this.state.listing_id}`)
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          result: res,
          html: this.format(res),
          merchant_name: res[0].name,
        })
      );
  }
  //update and re-render once checkout is clicked and this.state.checkout=true;
  //helper functions
  //take the res.json and convert into nice HTML
  format(array) {
    let item_name = array[0].item_name;
    let quantity = array[0].quantity;
    let discPrice = array[0].price_ceiling;
    let originalPrice = array[0].unit_price;
    let discount = (originalPrice - discPrice) / originalPrice;
    let merchant_name = array[0].name;
    let cuisine = array[0].cuisine;
    let listing_id = array[0].listing_id;
    let merchant_id = array[0].merchant_id;

    return (
      <IndivListing
        item_name={item_name}
        quantity={quantity}
        discPrice={discPrice}
        originalPrice={originalPrice}
        discPrice={discPrice}
        discount={discount}
        merchant_name={merchant_name}
        cuisine={cuisine}
        onClick={this.handleAddToCart}
        onDel={this.handleRemoveFromCart}
        listing_id={listing_id}
        merchant_id={merchant_id}
      />
    );
  }
  render() {
    const stripePromise = loadStripe(this.props.stripper);
    console.log(this.state.html)
    // if (this.state.checkout) {
    //     return (
    //         <div><PaymentOverlay cart={this.state.cart} stripper={this.props.stripper} /></div>
    //     )
    // }

    let data = {}
    if (this.state.cart[0]) {
      data = {
        merchant_id: this.state.cart[0].merchant_id,
        user_id: this.props.user_id,
        name: this.state.cart[0].name,
        listing_id: this.state.cart[0].listing_id,
        price: this.state.cart[0].price,
        quantity: this.state.cart[0].count / 2,
        revenue: (this.state.cart[0].count / 2) * this.state.cart[0].price,
      };
    }
    return (
      <div>
        <div>

          <h1>You are viewing deals from {this.state.merchant_name}</h1>
          <br />
          <div className="ListItems">{this.state.html}</div>
          <button onClick={this.navigateTo}>
            View Cart {this.state.cart.length}
          </button>
          {(this.state.viewCart && this.state.cart[0]) ?
            <>
              <h1>Order Summary</h1>
              <table style={{ maxWidth: "300px", margin: "0 auto" }}>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
                <tr>
                  <td>{this.state.cart[0].name}</td>
                  <td>{this.state.cart[0].count / 2}</td>
                  <td>
                    Total: $
                  {(this.state.cart[0].count / 2) * this.state.cart[0].price}
                  </td>
                </tr>
              </table>
              <Elements stripe={stripePromise}>
                <CheckoutForm data={data}></CheckoutForm>
              </Elements>
            </> : null}
        </div>

      </div>
    );

  }
}