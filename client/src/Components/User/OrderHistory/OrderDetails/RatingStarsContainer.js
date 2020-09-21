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
    this.decide = this.decide.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onSubmitHandler(e) {
    console.log("clicked star");
    e.preventDefault();
    this.setState({ submitted: true, rating: e.target.value });
  }
  componentDidMount() {
    if (this.state.display) {
      fetch(`/getratingsuser/${this.state.user_id}/${this.state.receipt_id}`)
        .then((res) => res.json())
        .then((res) =>
          this.setState({
            displayStar: this.decide(res),
            submitted: !this.decide(res),
          })
        );
    }
  }

  //helper function
  decide(array) {
    let displayStar;
    if (array.rating_stars === null) {
      displayStar = true;
    } else {
      displayStar = false;
    }
    return displayStar;
  }
  render() {
    return (
      <div>
        <RatingStars
          displayStar={this.state.displayStar}
          receipt_id={this.state.receipt_id}
          user_id={this.state.user_id}
          listing_id={this.props.listing_id}
          merchant_id={this.state.merchant_id}
          onClick={this.onSubmitHandler}
          submitted={this.state.submitted}
          rating={this.state.rating}
        />
      </div>
    );
  }
}

export default RatingStarsContainer;
