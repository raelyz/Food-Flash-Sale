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
          <div class="rating">
            <div>
              <p
                className="rating"
                onClick={(e) => this.props.onClick(e)}
                value="5"
                id="5"
              >
                ☆
              </p>
              <p
                className="rating"
                onClick={(e) => this.props.onClick(e)}
                value="4"
                id="4"
              >
                ☆
              </p>
              <p
                className="rating"
                onClick={(e) => this.props.onClick(e)}
                value="3"
                id="3"
              >
                ☆
              </p>
              <p
                className="rating"
                onClick={(e) => this.props.onClick(e)}
                value="2"
                id="2"
              >
                ☆
              </p>
              <p
                className="rating"
                onClick={(e) => this.props.onClick(e)}
                value="1"
                id="1"
              >
                ☆
              </p>
            </div>
          </div>
        );
      }
    } else if (!this.props.display && !this.state.rated) {
      return <div>You have already rated this!</div>;
    } else if (this.props.display && this.state.rated) {
      return <div>Thanks for your feedback</div>;
    } else {
      return <div>You have already rated this!</div>;
    }
  }
}

export default RatingStars;
