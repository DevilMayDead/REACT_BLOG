import Cookies from "js-cookie";

const LOGIN_COOKIE_NAME = "sessionId";

export function authenicateSucess(token) {
  _setCookie(LOGIN_COOKIE_NAME, token);
}

export function authenicateUname(token) {
  const value = _getCookie(token);
  return value === undefined ? "" : value;
}

function _setCookie(name, value) {
  // let date = new Date();
  // let expire = 10;
  // date.setDate(date.getDate() + 7);
  // console.log(date.toGMTString());
  // console.log(expire);

  // document.cookie =
  //   name +
  //   "=" +
  //   escape(value) +
  //   "; path=/login" +
  //   ";expires=" +
  //   date.toUTCString();
  Cookies.set(name, value, { expires: 7, path: "/" });
}

function _getCookie(name) {
  // let allcookies = document.cookie;
  // let cookie_pos = allcookies.indexOf(cookie_name); //索引的长度
  // let value = "";
  // // 如果找到了索引，就代表cookie存在，
  // // 反之，就说明不存在。
  // if (cookie_pos != -1) {
  //   // 把cookie_pos放在值的开始，只要给值加1即可。
  //   cookie_pos += cookie_name.length + 1; //这里容易出问题，所以请大家参考的时候自己好好研究一下
  //   let cookie_end = allcookies.indexOf(";", cookie_pos);

  //   if (cookie_end == -1) {
  //     cookie_end = allcookies.length;
  //   }

  //   value = unescape(allcookies.substring(cookie_pos, cookie_end)); //这里就可以得到你想要的cookie的值了。。。
  // }
  // return value;

  const uname = Cookies.get(name);
  console.log(uname);
  return uname;
}
