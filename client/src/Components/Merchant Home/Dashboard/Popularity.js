import React, { Component } from "react";
import { Polar } from "react-chartjs-2";

class Popularity extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='bigwrapper'>
        <div className="chart">
          <Polar
            data={{
              labels: this.props.ratedListingsName,
              datasets: [
                {
                  label: "Best Rated",
                  backgroundColor: [
                    "#FF6384",
                    "#4BC0C0",
                    "#FFCE56",
                    "#E7E9ED",
                    "#36A2EB",
                  ],
                  hoverBackgroundColor: "rgba(255,99,132,0.4)",
                  hoverBorderColor: "rgba(255,99,132,1)",
                  data: this.props.averageRatePerListing,
                },
              ],
            }}
          />
        </div>

        <h1>Your average rating: {this.props.merchantRating.toFixed(2)}</h1>
      </div>
    );
  }
}

export default Popularity;