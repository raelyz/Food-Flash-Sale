import React, { Component } from "react";
import Popularity from "./Popularity";

class RatingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchantRating: 0,
      averageRatePerListing: [],
      ratedListingsName: [],
      display: true,
    };
    this.getTotalRatingListing = this.getTotalRatingListing.bind(this);
    this.ratedTimes = this.ratedTimes.bind(this);
    this.getAverage = this.getAverage.bind(this);
  }

  componentDidMount() {
    //mounting
    if (this.state.display) {
      fetch(`/ratings/${this.props.merchant_id}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.length < 1) {
            console.log("no ratings yet");
          } else {
            console.log(res);
            let ratingTotal = res.reduce(function (prev, cur) {
              return prev + cur.rating_stars;
            }, 0);
            let merchantAve = ratingTotal / res.length;
            let listingRates = this.getTotalRatingListing(res);
            console.log(listingRates, "----listing total ratings");
            let listingRateTimes = this.ratedTimes(res);
            console.log(listingRateTimes, "---times each were rated");
            let ratetimes = Object.values(listingRateTimes);
            let ratings = Object.values(listingRates);
            let listingsNameRated = Object.keys(listingRates);

            let ave = this.getAverage(ratings, ratetimes);
            console.log(ave, "---this is a the ave of each ");

            this.setState({
              merchantRating: merchantAve,
              averageRatePerListing: ave,
              ratedListingsName: listingsNameRated,
            });
          }
        })
        .catch((error) => {
          console.log(
            "error happened--- at GET MERCHANT ratings MOUNT",
            error.message
          );
        });
    }
  }

  //function map items + ratings

  getTotalRatingListing = (arr) => {
    let listingRating = {};
    for (let i = 0; i < arr.length; i++) {
      let listing = arr[i].item_name;
      if (!listingRating[listing]) {
        listingRating[listing] = arr[i].rating_stars;
      } else {
        listingRating[listing] += arr[i].rating_stars;
      }
    }
    console.log(listingRating);
    return listingRating;
  };

  //function map items by number of times they were rated
  ratedTimes = (arr) => {
    let listingRateTimes = {};
    for (let i = 0; i < arr.length; i++) {
      let listing = arr[i].item_name;
      if (!listingRateTimes[listing]) {
        listingRateTimes[listing] = 1;
      } else {
        listingRateTimes[listing] += 1;
      }
    }
    console.log(listingRateTimes);
    return listingRateTimes;
  };
  //function get average rating

  getAverage = (arr1, arr2) => {
    let average = [];

    for (let i = 0; i < arr1.length; i++) {
      average.push(arr1[i] / arr2[i]);
    }
    console.log(average);
    return average;
  };
  render() {
    return (
      <Popularity
        merchantRating={this.state.merchantRating}
        averageRatePerListing={this.state.averageRatePerListing}
        ratedListingsName={this.state.ratedListingsName}
      />
    );
  }
}

export default RatingContainer;
