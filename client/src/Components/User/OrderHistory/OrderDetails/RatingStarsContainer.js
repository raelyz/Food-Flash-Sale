import React, { Component } from "react";
import RatingStars from "./RatingStars";

class RatingStarsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listing_id: props.listing_id,
      merchant_id: props.merchant_id,
      user_id: props.user_id,
      clicked: false,
      rating: 0,
      disappear: false,
    };
  }

  //Mounting when clicked = true

  //handle click function: set state clicked = true, disappear = true, inner TEXT to be ' thanks for rating'!

  //Unmount when disappear = true

  render() {
    return <div></div>;
  }
}

export default RatingStarsContainer;
