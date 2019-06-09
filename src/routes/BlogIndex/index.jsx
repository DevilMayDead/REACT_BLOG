import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
class BlogIndex extends Component {
  handleClick = () => {
    const { Logout } = this.props;
    Logout(this.props.history);
  };

  componentWillMount() {
    // const { uname } = this.props;
    // if (uname === "") {
    //   this.props.history.replace("/");
    // }
  }

  render() {
    const { uname } = this.props;
    return (
      <div>
        <h1>{uname}</h1>
        <button onClick={this.handleClick}>exit</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // uname: state.uname
  };
};

const mapStateToDispatch = dispatch => {
  return {
    Logout: history => {
      dispatch({ type: "FENTCH_OUT", history });
    }
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapStateToDispatch
  )(BlogIndex)
);
