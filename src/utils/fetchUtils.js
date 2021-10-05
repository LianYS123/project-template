import xFetch from "./fetch";
import { stringify as serializeQuery } from "query-string";

export const get = (url, data, options, config) => {
  const urlWithQuery = `${url}${serializeQuery(data)}`;
  return xFetch(urlWithQuery, options, config);
};

export const post = (url, data, options, config) => {
  const newOptions = {
    method: "POST",
    body: data,
    ...options
  };
  return xFetch(url, newOptions, config);
};

export const put = (url, data, options, config) => {
  const newOptions = {
    method: "PUT",
    body: data,
    ...options
  };
  return xFetch(url, newOptions, config);
};

export const del = (url, data, options, config) => {
  const urlWithQuery = `${url}${serializeQuery(data)}`;
  const newOptions = {
    method: "DELETE",
    ...options
  };
  return xFetch(urlWithQuery, newOptions, config);
};

export const getService =
  (url, method) =>
  (params, ...rest) =>
    method(url, params, ...rest);
