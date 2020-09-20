import React, { Component } from "react";

class RatingStars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listing_id: 1,
      merchant_id: 1,
      user_id: 1,
      rated: false,
    };
  }
  onSubmitHandler(e) {
    e.preventDefault();
    this.setState({ rated: true });
  }
  render() {
    if (!this.state.rated) {
      return (
        <div>
          <form
            action="/ratelisting"
            method="post"
            onSubmit={(e) => this.onSubmitHandler(e)}
          >
            <div className="rating">
              <p>Leave a review!</p>
              <input
                type="hidden"
                name="listing_id"
                value={this.state.listing_id}
                readOnly
              />
              <input
                type="hidden"
                name="merchant_id"
                value={this.state.merchant_id}
                readOnly
              />
              <input
                type="hidden"
                name="user_id"
                value={this.state.user_id}
                readOnly
              />
              <input type="text" placeholder="Tell us what you think" />
              <input type="submit" name="rating" value="5" id="5" />
              <label for="5">☆</label>
              <input type="submit" name="rating" value="4" id="4" />
              <label for="4">☆</label>
              <input type="submit" name="rating" value="3" id="3" />
              <label for="3">☆</label>
              <input type="submit" name="rating" value="2" id="2" />
              <label for="2">☆</label>
              <input type="submit" name="rating" value="1" id="1" />
              <label for="1">☆</label>
            </div>
          </form>
        </div>
      );
    } else {
      return <div>Thanks for your feedback!</div>;
    }
  }
}

export default RatingStars;
