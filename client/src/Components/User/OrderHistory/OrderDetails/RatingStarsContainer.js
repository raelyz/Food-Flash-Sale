import React, { Component } from "react";
import RatingStars from "./RatingStars";

class RatingStarsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      html: "",
      receipt_id: props.receipt_id,
      user_id: props.user_id,
      displayStar: true,
      merchant_id: props.merchant_id,
      submitted: false,
      rating: 0,
    };

  }


  render() {
    return (
      <>
        <RatingStars
          displayStar={this.state.displayStar}
          receipt_id={this.state.receipt_id}
          user_id={this.state.user_id}
          listing_id={this.props.listing_id}
          merchant_id={this.state.merchant_id}
          onClick={this.onSubmitHandler}
          submitted={this.state.submitted}
          rating={this.state.rating}
          clicked={this.state.clicked}
        />
      </>
    );
  }
}

export default RatingStarsContainer;
