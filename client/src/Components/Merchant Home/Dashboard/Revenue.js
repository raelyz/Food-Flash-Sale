import React, { Component } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";

class Revenue extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="bigwrapper">
        <div className="chart">
          <Doughnut
            data={{
              labels: this.props.names,
              datasets: [
                {
                  label: "Highest Earners in Revenue",

                  backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                  hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                  borderColor: "rgba(255,99,132,1)",
                  borderWidth: 1,

                  hoverBorderColor: "rgba(255,99,132,1)",
                  data: this.props.revenues,
                },
              ],
            }}
          />
        </div>
      </div>
    );
  }
}

export default Revenue;
