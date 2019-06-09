import { FENTCH_LOGIN, FENTCH_LOGIN_ERROR } from "../actions";
import { delay } from "redux-saga";
import { take, all, fork, put, call } from "redux-saga/effects";
import axios from "axios";
import { authenicateSucess } from "../../utils/cookie";

import { login } from "../../utils/login";
export function* Login() {
  let length = 1;
  while (true) {
    const login_action = yield take("FENTCH_LOGIN");
    const response = yield call(
      axios.get,
      "http://localhost:4000/users?uname=" + login_action.uname
    );
    const wrong = login(response.data, login_action.uname, login_action.upass);
    if (wrong !== "no") {
      login_action.form.setFields(wrong);
      yield put({
        type: "FENTCH_LOGIN_ERROR"
      });
    } else {
      authenicateSucess(login_action.uname);

      login_action.history.replace("/index");
    }
    // console.log("saga-FENTCH_LOGIN_ERROR");
  }
}

export function* Logout() {
  while (true) {
    const login_action = yield take("FENTCH_OUT");
    login_action.history.replace("/");
  }
}

export function* runmysaga() {
  yield all([fork(Login), yield fork(Logout)]);
}
