import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ColumnGroup from "antd/lib/table/ColumnGroup";

export class PrivateRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false // 是否於權限檢核中
    };
  }

  checkAuth = async () => {
    const { uname } = this.props;
    console.log(this.props);
    uname === 0
      ? this.setState(state => ({ ...state, isAuthed: false }))
      : this.setState(state => ({ ...state, isAuthed: true }));
    // else this.setState(state => ({ ...state, isAuthed: false }));
  };

  componentWillMount = async () => {
    await this.checkAuth();
  };

  // componentWillReceiveProps = async nextProps => {
  //   if (nextProps.location.pathname !== this.props.location.pathname) {
  //     await this.checkAuth();
  //   }
  // };

  render() {
    const { component: Component, ...rest } = this.props;
    const { isLogin } = this.state;
    const { uname } = this.props;
    console.log(uname);
    return (
      <Route
        {...rest}
        render={props =>
          !uname == "" ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    );
    // uname === true ? (
    //   <LoadingIndicator />
    // ) :
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    uname: state.uname
  };
};

const mapStateToDispatch = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(PrivateRoute);
