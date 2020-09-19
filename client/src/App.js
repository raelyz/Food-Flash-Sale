import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TimeLine from "./Components/User/TimeLine/TimeLine";
import OrderHistory from "./Components/User/OrderHistory/OrderHistory";
import Login from "./Components/User/HomeLogin/Login";
import ItemList from "./Components/Merchant/ItemList/ItemList";
import CreateItem from "./Components/Merchant/CreateItem/CreateItem";
import PaymentOverlay from "./Components/User/IndivStore/PaymentOverlay";
import ListingContainer from "./Components/User/IndivStore/ListingContainer";
import Home from "./Components/User/Home";
import Navbar from "./Components/User/Navbar/Navbar";
import Footer from "./Components/User/Footer/Footer";
import MercNavbar from "./Components/Merchant Home/Navbar/Navbar";
import MercHome from "./Components/Merchant Home/Home";
import MerchFooter from "./Components/Merchant Home/Footer/Footer";
import EditForm from "./Components/Merchant Home/Edit/EditForm";
import EditContainer from "./Components/Merchant Home/Edit/EditContainer";
import OrderListContainer from "./Components/Merchant Home/AllOrders/OrderListContainer";
import GeoLocation from "./Components/User/GeoLocation/GeoLocation";

import UserSuperContainer from "./Components/User/UserSuperContainer";
import DashboardContainer from "./Components/Merchant Home/Dashboard/DashboardContainer";

const stripper = process.env.REACT_APP_PUBLISHABLE_KEY;

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <DashboardContainer />;
  }
}
