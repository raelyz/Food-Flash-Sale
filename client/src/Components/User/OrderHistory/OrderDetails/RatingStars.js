import React, { Component } from "react";

class RatingStars extends Component {
    constructor(props){
        super(props);
        this.state={
            listing_id : props.listing_id,
            merchant_id : props.merchant_id,
            user_id : props.user_id
        }
    }
  render() {
    return (
      <div>
        <div className="rating">
          <input type="radio" name="rating" value="5" id="5" />
          <label for="5">☆</label>
          <input type="radio" name="rating" value="4" id="4" />
          <label for="4">☆</label>
          <input type="radio" name="rating" value="3" id="3" />
          <label for="3">☆</label>
          <input type="radio" name="rating" value="2" id="2" />
          <label for="2">☆</label>
          <input type="radio" name="rating" value="1" id="1" />
          <label for="1">☆</label>
        </div>
      </div>
    );
  }
}

export default RatingStars;
