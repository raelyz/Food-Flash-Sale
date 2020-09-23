import React, { Component } from "react";
import { Bar, Line, Pie, HorizontalBar } from "react-chartjs-2";

class Bestselling extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div id="bigwrapper">
          <h1>You earned ${this.props.totalRev} so far</h1>
          <h1>Your biggest order was {this.props.revMax.item_name}</h1>
        </div>

        <div id="bigwrapper">
          <div className="chart">
            <HorizontalBar
              data={{
                labels: this.props.names,
                datasets: [
                  {
                    label: "People loved to order",
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    borderColor: "rgba(255,99,132,1)",
                    borderWidth: 1,
                    hoverBorderColor: "rgba(255,99,132,1)",
                    data: this.props.times,
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Bestselling;
