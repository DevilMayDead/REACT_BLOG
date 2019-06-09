import _ from "lodash";
import axios from "axios";

export function login(user, username, password) {
  let wrong = {};
  if (user.length === 1) {
    wrong = "no";
    if (user[0].upass === password) {
    } else {
      wrong = {
        password: {
          value: "",
          errors: [new Error("密码错误")]
        }
      };
    }
  } else {
    wrong = {
      username: {
        value: "",
        errors: [new Error("用户名不存在")]
      }
    };
  }
  return wrong;
}
export function register(user, uname, upass, confirmPassword) {
  let wrong = {};
  if (user.length === 1) {
    wrong = {
      uname: {
        value: uname,
        errors: [new Error("用户已存在")]
      }
    };
  } else {
    if (upass !== confirmPassword) {
      wrong = {
        confirmPassword: {
          value: "",
          errors: [new Error("两次密码不同")]
        }
      };
    } else {
      wrong = "no";
    }
  }
  return wrong;
}
