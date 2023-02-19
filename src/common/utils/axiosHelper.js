import axios from "axios";
import { message } from "ant-design-vue";
import { Session } from "@utils/index.js";
// import { resolve } from "path";

const ApiClient = axios.create({
  //   baseURL: "http://localhost:3000",
  timeout: 2000,
  headers: { "Content-Type": "application/json; charset=UTF-8", device: "PC" },
  withCredentials: true
});

ApiClient.interceptors.request.use(
  (config) => {
    const token = Session.get("token");
    if (token) {
      config.headers.knuth = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ApiClient.interceptors.response.use(
  (res) => {
    return Promise.resolve(res.data);
  },
  (error) => {
    if (error) {
      return Promise.reject(error);
    }
  }
);

const errorHandler = (status, otherMsg) => {
  switch (status) {
    case 500:
    case 503:
    case 504:
      message.warn("服务发生内部错误");
      break;
    case 404:
      message.warn("访问URL不存在");
      break;
    case 400:
      message.warn("请求参数有误");
      break;
    case 401:
      message.warn("未登录，即将跳转到登录页");
      location.hash = "#/login";
      break;
    case 403:
      message.warn("无权限访问");
      break;
    default:
      message.warn(otherMsg || "网络发生问题");
      break;
  }
};

export const post = (url, data = {}, config = {}) => {
  return new Promise((resolve, reject) => {
    ApiClient.post(url, JSON.stringify(data), config).then(
      (response) => {
        resolve(response);
        if (response.code !== 200) {
          errorHandler(response.code, response.msg);
        }
      },
      (err) => {
        errorHandler(err.code, err.msg);
        reject(err);
      }
    );
  });
};

export const get = (url, params = {}, config = {}) => {
  return new Promise((resolve, reject) => {
    ApiClient.get(
      url,
      {
        params: params
      },
      config
    ).then(
      (response) => {
        resolve(response);
        if (response.code !== 200) {
          errorHandler(response.code, response.msg);
        }
      },
      (err) => {
        errorHandler(err.code, err.msg);
        reject(err);
      }
    );
  });
};

export default ApiClient;
