import { authenicateUname } from "../../utils/cookie";
const fuckme = authenicateUname("sessionId");
const userState = { isLogin: 0, uname: fuckme };
export default (state = userState, action) => {
  switch (action.type) {
    case "FENTCH_LOGIN":
      return Object.assign({}, state, { isLogin: 1, uname: action.uname });
    case "FENTCH_LOGIN_ERROR":
      return Object.assign({}, state, { isLogin: 0, uname: "" });

    case "FENTCH_OUT": {
      return Object.assign({}, state, { isLogin: 0, uname: "" });
    }
    default:
      return state;
  }
};
