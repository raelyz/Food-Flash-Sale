import React, { Component } from "react";

class RatingStars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rated: false,
      displayStar: props.displayStar,
      receipt_id: props.receipt_id,
      user_id: props.user_id,
      merchant_id: props.merchant_id,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("outside the conditional");
    if (prevProps.submitted !== this.props.submitted) {
      console.log("inside conditional");
      fetch("/ratelisting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating_receipt_id: this.state.receipt_id,
          listing_id: this.props.listing_id,
          merchant_id: this.state.merchant_id,
          rating_stars: this.props.rating,
          user_id: this.props.user_id,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("done with fetch");
          this.setState({
            displayStar: false,
            rated: true,
          });
        });
    }
  }

  render() {
    if (this.state.displayStar) {
      if (!this.state.rated) {
        return (
          <td class="rating">
            <input type="radio" name="rating" value="5" id="5" onClick={(e) => this.props.onClick(e)} />
            <label for="5">☆</label>
            <input type="radio" name="rating" value="4" id="4" onClick={(e) => this.props.onClick(e)} />
            <label for="4">☆</label>
            <input type="radio" name="rating" value="3" id="3" onClick={(e) => this.props.onClick(e)} />
            <label for="3">☆</label>
            <input type="radio" name="rating" value="2" id="2" onClick={(e) => this.props.onClick(e)} />
            <label for="2" >☆</label>
            <input type="radio" name="rating" value="1" id="1" onClick={(e) => this.props.onClick(e)} />
            <label for="1">☆</label>

          </td>
        );
      }
    } else if (!this.props.display && !this.state.rated) {
      return <td>You have already rated this!</td>;
    } else if (this.props.display && this.state.rated) {
      return <td>Thanks for your feedback</td>;
    } else {
      return <td>You have already rated this!</td>;
    }
  }
}

export default RatingStars;

