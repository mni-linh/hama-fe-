import React from "react";

import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import Courses from "../pages/Courses";
import Stories from "../pages/Stories/Stories";
import Contact from "../pages/Contact";
import Checkout from "../pages/Checkout";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import LiveStream from "../pages/LiveStream/LiveStream";
import LiveChat from "../pages/LiveChat/LiveChat";
import CalculateDistance from "../pages/Distance/CalculateDistance";
// import OrderStatus from "../pages/OrderStatus/OrderStatus";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/products/:id" component={Product} />
      <Route path="/products" component={Catalog} />
      <Route path="/cart" component={Cart} />
      <Route path="/courses" component={Courses} />
      <Route path="/stories" component={Stories} />
      <Route path="/contact" component={Contact} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/livestream" component={LiveStream} />
      <Route path="/logout" component={Logout} />
      <Route path="/caldis" component={CalculateDistance} />
      {/* <Route path="/orders" component={OrderStatus} /> */}
      {/* <Route path="/livechat" component={LiveChat} /> */}
      <Route path="*" component={Home} />
    </Switch>
  );
};

export default Routes;
