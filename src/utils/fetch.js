import history from "./history";
import i from "react-intl-universal";
import { notification } from "antd";

import routers from "config/routers";

const xFetch = function (url, options = {}, config = {}) {
  let { method = "GET", body = {}, ...otherOps } = options;
  const headers = {};
  const { autoHandleError = true } = config;
  // 处理参数
  method = method.toUpperCase();

  if (method === "POST") {
    body = JSON.stringify(body);
  }

  if (method === "POST" && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const ops = {
    method,
    headers: {
      lang: i.get("LANG"),
      token: localStorage.getItem("acc"),
      ...headers
    },
    ...otherOps
  };
  if (method !== "GET") {
    ops.body = body;
  }
  return fetch(url, ops)
    .then(res => res.json())
    .then((data = {}) => {
      const { code = "", message = i.get("service_api_err") } = data;
      if (code === "0000") {
        return data;
      } else if (code === "LGN4001000") {
        history.push(routers.LOGIN);
      } else if (autoHandleError) {
        if (message) {
          notification.error({ message });
        } else {
          notification.error({ message: i.get("SERVICE_API_ERR") });
        }
      }
      return data;
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error(error);
      if (autoHandleError) {
        notification.error({ message: i.get("SERVICE_API_ERR") });
      }
    });
};

export default xFetch;
