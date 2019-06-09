import React, { Component } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import "./style.css";

class Login extends Component {
  state = {};
  componentDidMount() {
    this.setState({ showBox: "login" });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  switchShowBox = box => {
    this.setState({
      showBox: box
    });
  };

  render() {
    const { showBox } = this.state;
    return (
      <div className="loginPage" id="loginPage">
        <div className="backImg" />
        <div className="container">
          <LoginForm
            className={
              showBox === "login" ? "loginBox showBox" : "loginBox hiddenBox"
            }
            tableIndex={showBox === "login" ? "0" : "-1"}
            switchShowBox={this.switchShowBox}
          />
          <RegisterForm
            className={
              showBox === "register" ? "loginBox showBox" : "loginBox hiddenBox"
            }
            tabIndex={showBox === "register" ? "0" : "-1"}
            switchShowBox={this.switchShowBox}
          />
        </div>
      </div>
    );
  }
}
export default Login;
