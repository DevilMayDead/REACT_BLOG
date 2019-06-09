import axios from "axios";
import { message, Spin } from "antd";

//拦截请求
axios.interceptors.request.use(
  config => {
    // message.info("request");
    console.log(config);
    return config;
  },
  error => {
    message.error("requesterror");
    return Promise.reject(error);
  }
);

// //拦截响应
// axios.interceptors.response.use(
//   config => {
//     console.log(config);
//     return config;
//   },
//   error => {
//     message.error("error");
//     return Promise.reject(error);
//   }
// );

export default axios;
