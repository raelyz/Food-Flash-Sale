import React, { Component } from "react";
import Bestselling from "./Bestselling";
import Revenue from "./Revenue";
import RatingContainer from "./RatingContainer";

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchant_id: this.props.merchant_id,
      display: true,
      res: "",
      totalRev: 0,
      revMax: 0,
      names: [],
      revenues: [],
      time: [],
    };
    this.obj = this.obj.bind(this);
    this.orderTimes = this.orderTimes.bind(this);
  }

  //fetch from backend data to pass down as props to children
  componentDidMount() {
    //mounting
    if (this.state.display) {
      fetch(`/merchantorders/${this.state.merchant_id}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.length < 1) {
            console.log("no orders yet");
          } else {
            console.log(res);
            let revTotal = res.reduce(function (prev, cur) {
              return prev + cur.revenue;
            }, 0);
            let revMax = res.reduce(function (prev, current) {
              return prev.revenue > current.revenue ? prev : current;
            });
            console.log(res);
            let orderqty = this.orderTimes(res);
            let ordertimes = Object.values(orderqty);
            let product_names = Object.keys(this.obj(res));
            let product_rev = Object.values(this.obj(res));
            console.log(orderqty, "----orderqty");
            this.setState({
              res: res,
              totalRev: revTotal,
              revMax: revMax,
              names: product_names,
              revenues: product_rev,
              times: ordertimes,
            });
          }
        })
        .catch((error) => {
          console.log(
            "error happened--- at GET MERCHANT ORDER MOUNT",
            error.message
          );
        });
    }
  }

  //function map items

  obj = (arr) => {
    let listingRevenue = {};
    for (let i = 0; i < arr.length; i++) {
      let listing = arr[i].item_name;
      if (!listingRevenue[listing]) {
        listingRevenue[listing] = arr[i].revenue;
      } else {
        listingRevenue[listing] += arr[i].revenue;
      }
    }
    console.log(listingRevenue);
    return listingRevenue;
  };

  //function map items by number of times they were ordered
  orderTimes = (arr) => {
    let listingOrderTimes = {};
    for (let i = 0; i < arr.length; i++) {
      let listing = arr[i].item_name;
      if (!listingOrderTimes[listing]) {
        listingOrderTimes[listing] = 1;
      } else {
        listingOrderTimes[listing] += 1;
      }
    }
    console.log(listingOrderTimes);
    return listingOrderTimes;
  };

  render() {
    return (
      <div>
        Hello from Dashboard DashboardContainer
        <Bestselling
          res={this.state.res}
          totalRev={this.state.totalRev}
          revMax={this.state.revMax}
          names={this.state.names}
          times={this.state.times}
        />
        <Revenue names={this.state.names} revenues={this.state.revenues} />
        <RatingContainer merchant_id={this.props.merchant_id} />
      </div>
    );
  }
}

export default DashboardContainer;