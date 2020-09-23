import React, { Component } from "react";

class RatingStars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayStar: props.displayStar,
      receipt_id: props.receipt_id,
      user_id: props.user_id,
      merchant_id: props.merchant_id,


    };
    this.decide = this.decide.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }
  onSubmitHandler(e) {
    console.log("clicked star");
    e.preventDefault();
    this.setState({ clicked: true, rating: e.target.value });
  }
  componentDidMount() {
    fetch(`/getratingsuser/${this.state.user_id}/${this.state.receipt_id}`)
      .then((res) => res.json())
      .then((res) => {
        let result = this.decide(res)
        this.setState({
          displayStar: result,
          submitted: !result,
        })
      }
      );
  }

  //helper function
  decide(array) {
    let displayStar;
    if (array[0].rating_stars === null) {
      displayStar = true;
    } else {
      displayStar = false;
    }
    return displayStar;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.clicked !== this.state.clicked && this.state.clicked === true) {
      console.log(this.props.clicked);
      fetch("/ratelisting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating_receipt_id: this.state.receipt_id,
          listing_id: this.props.listing_id,
          merchant_id: this.state.merchant_id,
          rating_stars: this.state.rating,
          user_id: this.state.user_id,
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
            <input type="radio" name="rating" value="5" id="5" onClick={(e) => this.onSubmitHandler(e)} />
            <label for="5">☆</label>
            <input type="radio" name="rating" value="4" id="4" onClick={(e) => this.onSubmitHandler(e)} />
            <label for="4">☆</label>
            <input type="radio" name="rating" value="3" id="3" onClick={(e) => this.onSubmitHandler(e)} />
            <label for="3">☆</label>
            <input type="radio" name="rating" value="2" id="2" onClick={(e) => this.onSubmitHandler(e)} />
            <label for="2" >☆</label>
            <input type="radio" name="rating" value="1" id="1" onClick={(e) => this.onSubmitHandler(e)} />
            <label for="1">☆</label>
          </td>
        );
      }
    } else if (!this.props.display && !this.state.rated) {
      return <td>You have already rated this!</td>;
    } else if (this.props.clicked && this.state.rated) {
      return <td>Thanks for your feedback</td>;
    } else {
      return <td>You have already rated this!</td>;
    }
  }
}

export default RatingStars;

