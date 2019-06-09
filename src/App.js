import React, { lazy, Supense, Component } from "react";

import "./App.css";
import "./assets/font/iconfont.css";
import Login from "./routes/Login/index";
import {
  BrowserRouter as Router,
  withRouter,
  Route,
  Switch
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import BlogIndex from "./routes/BlogIndex";
import Test from "./routes/test";
import PrivateRoute from "./utils/PrivateRoute";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/index" component={BlogIndex} />
      </Switch>
    );
  }
}

export default withRouter(App);
