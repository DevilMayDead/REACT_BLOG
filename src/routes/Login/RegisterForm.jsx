import React, { Component } from "react";
import { Form, Row, Input, Col, Button, Checkbox, message } from "antd";
import Promptbox from "../../components/Promptbox";
import { calculateWidth } from "../../utils/utils";
import store from "../../store";
import { register } from "../../utils/login";

import axios from "axios";

@Form.create()
class RegisterForm extends Component {
  state = {};

  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log("Received values of form: ", values);
  //     }
  //   });
  // };
  componentDidMount() {
    this.setState({ focus: 0 });
  }

  handleRegister = () => {
    console.log(this.state);
    this.props.form.validateFields((err, values) => {
      let wrong = {};
      if (!err) {
        // axios
        //   .get("http://localhost:4000/users?uname=" + values.uname)
        //   .then(response => {
        //     this.setState({ user: response.data });
        //     wrong = register(
        //       this.state.user,
        //       values.uname,
        //       values.upass,
        //       values.confirmPassword
        //     );
        //     console.log(wrong);
        //     if (wrong === "no") {
        //       // const action = {
        //       //   type: IS_LOGIN,
        //       //   uname: values.uname
        //       // };
        //       // store.dispatch(action);
        //     } else {
        //       this.props.form.setFields(wrong);
        //     }
        //   })
        //   .catch(error => {
        //     console.log(error);
        //     message.info("网络异常");
        //   });

        axios
          .post("http://localhost:4000/users", {
            id: Date.now(),
            uname: "fss",
            upass: "fss"
          })
          .then(function(resposne) {
            let data = resposne.data;
            console.log(data);
            if (data < 1) {
              console.log("error");
            } else {
              console.log("Sucee");
            }
          })
          .catch(error => {
            console.log("fuck");
          });
      }
    });
  };
  componentDidMount() {}

  gobackLogin = () => {
    this.props.switchShowBox("login");
    setTimeout(() => this.props.form.resetFields(), 500);
  };

  render() {
    const { getFieldDecorator, getFieldError } = this.props.form;
    return (
      <div className={this.props.className}>
        <h3 className="loginTitle">欢迎注册</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            help={
              getFieldError("uname") && (
                <Promptbox
                  info={getFieldError("uname")}
                  width={calculateWidth(getFieldError("uname"))}
                />
              )
            }
          >
            {getFieldDecorator("uname", {
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
              getFieldError("upass") && (
                <Promptbox
                  info={getFieldError("upass")}
                  width={calculateWidth(getFieldError("upass"))}
                />
              )
            }
          >
            {getFieldDecorator("upass", {
              rules: [{ required: true, message: "请输入密码" }]
            })(
              <Input
                tabIndex={this.props.tabIndex}
                placeholder="密码"
                type="password"
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
              getFieldError("confirmPassword") && (
                <Promptbox
                  info={getFieldError("confirmPassword")}
                  width={calculateWidth(getFieldError("confirmPassword"))}
                />
              )
            }
          >
            {getFieldDecorator("confirmPassword", {
              rules: [{ required: true, message: "请确认密码" }]
            })(
              <Input
                tabIndex={this.props.tabIndex}
                onFocus={() => this.setState({ focus: 3 })}
                onBlur={() => this.setState({ focus: -1 })}
                type="password"
                maxLength={16}
                placeholder="确认密码"
                addonBefore={
                  <span
                    className="iconfont icon-suo1"
                    style={this.state.focus === 3 ? styles.onFocus : {}}
                  />
                }
              />
            )}
          </Form.Item>
          <div className="bottom">
            <input
              tabIndex={this.props.tabIndex}
              className="loginBtn"
              type="submit"
              value="登录"
              onClick={this.handleRegister}
            />
            <span className="registerBtn" onClick={this.gobackLogin}>
              返回登录
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

const styles = {
  onFocus: {
    width: "20px",
    opacity: 1
  }
};

export default RegisterForm;
