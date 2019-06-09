import React, { Component } from "react";
import { Redirect, Prompt, withRouter } from "react-router-dom";
import {
  Form,
  Row,
  Input,
  Col,
  Spin,
  message,
  Icon,
  Button,
  Checkbox,
  Tooltip
} from "antd";
import Captcha from "../../utils/Capacha";
import { calculateWidth } from "../../utils/utils";
import PromptBox from "../../components/Promptbox";
import { connect } from "react-redux";
import { authenicateUname } from "../../utils/cookie";
// import _ from "lodash";

@Form.create()
class LoginForm extends Component {
  state = {};

  handleLogin = async () => {
    const { Login } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (!this.captchaCode.validate(values.verification)) {
          this.props.form.setFields({
            verification: {
              value: values.verification,
              errors: [new Error("验证码错误")]
            }
          });
        } else {
          Login(
            this.props.history,
            values.username,
            values.password,
            this.props.form
          );
        }
      }
    });
  };

  componentDidMount() {
    this.captchaCode = new Captcha("v_container");
    this.setState({ bool: false, isLoading: false });
  }

  componentWillUnmount() {
    this.captchaCode = null;
  }

  register = () => {
    this.props.switchShowBox("register");
    setTimeout(() => this.props.form.resetFields(), 500);
  };

  render() {
    const { getFieldDecorator, getFieldError } = this.props.form;

    const antIcon = <Icon type="loading" style={{ fontSize: 50 }} spin />;
    const { isLogin } = this.props;

    return (
      <div className={this.props.className}>
        <div style={{ position: "absolute", left: "40%", top: "40%" }}>
          <Spin indicator={antIcon} spinning={this.state.isLoading} />
        </div>
        <h3 className="loginTitle">欢迎登陆</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            help={
              getFieldError("username") && (
                <PromptBox
                  info={getFieldError("username")}
                  width={calculateWidth(getFieldError("username"))}
                />
              )
            }
          >
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "请输入用户名" }]
            })(
              <Input
                tabIndex={this.props.tabIndex}
                placeholder="用户名"
                addonBefore={
                  <span
                    className="iconfont icon-User"
                    style={this.state.focus === 1 ? styles.onFocus : {}}
                  />
                }
                onFocus={() => {
                  this.setState({ focus: 1 });
                }}
                onBlur={() => this.setState({ focus: 0 })}
              />
            )}
          </Form.Item>
          <Form.Item
            help={
              getFieldError("password") && (
                <PromptBox
                  info={getFieldError("password")}
                  width={calculateWidth(getFieldError("password"))}
                />
              )
            }
          >
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入密码" }]
            })(
              <Input
                tabIndex={this.props.tabIndex}
                placeholder="密码"
                addonBefore={
                  <span
                    className="iconfont icon-suo1"
                    style={this.state.focus === 2 ? styles.onFocus : {}}
                  />
                }
                onFocus={() => {
                  this.setState({ focus: 2 });
                }}
                onBlur={() => this.setState({ focus: 0 })}
              />
            )}
          </Form.Item>
          <Form.Item
            help={
              getFieldError("verification") && (
                <PromptBox
                  info={getFieldError("verification")}
                  width={calculateWidth(getFieldError("verification"))}
                />
              )
            }
          >
            {getFieldDecorator("verification", {
              validateFirst: true,
              rules: [{ required: true, message: "请输入验证码" }]
            })(
              <Row>
                <Col span={15}>
                  <Input
                    tabIndex={this.props.tabIndex}
                    placeholder="验证码"
                    addonBefore={
                      <span
                        className="iconfont icon-securityCode-b"
                        style={this.state.focus === 3 ? styles.onFocus : {}}
                      />
                    }
                    onFocus={() => this.setState({ focus: 3 })}
                    onBlur={() => this.setState({ focus: -1 })}
                  />
                </Col>
                <Col span={9}>
                  <div id="v_container" style={{ height: 39 }} />
                </Col>
              </Row>
            )}
          </Form.Item>
          <div className="bottom">
            <input
              tabIndex={this.props.tabIndex}
              className="loginBtn"
              type="submit"
              value="登录"
              onClick={() => this.handleLogin.call(this)}
            />
            <span className="registerBtn" onClick={this.register}>
              {isLogin}
            </span>
          </div>
        </Form>
        <div className="footer">
          <div>欢迎登陆我的个人网站</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapStateToDispatch = dispatch => {
  return {
    Login: (history, uname, upass, form) => {
      dispatch({ type: "FENTCH_LOGIN", history, uname, upass, form });
    }
  };
};

const styles = {
  onFocus: {
    width: "20px",
    opacity: 1
  }
};

export default withRouter(
  connect(
    mapStateToProps,
    mapStateToDispatch
  )(LoginForm)
);
