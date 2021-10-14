import { parseAPI } from "./apiUtils";

const langMap = {
  "zh-CN": "CN",
  "en-US": "EN",
  "ja-JP": "JP"
};

const xFetch = function (url, data, options = {}) {
  const { parsedUrl, method, parsedData } = parseAPI(url, data);
  const headers = {};

  const token = "Bearer " + localStorage.getItem("acc");
  const lang = (localStorage.getItem("lang") || "en").toUpperCase();
  const opts = {
    method,
    headers: {
      Authorization: token,
      "x-lang": lang,
      lang: lang,
      "Content-Type": "application/json",
      ...headers
    },
    ...options
  };
  if (method !== "GET") {
    opts.body = JSON.stringify(parsedData);
  }
  return fetch(parsedUrl, opts).then(res => res.json());
};

export default xFetch;
