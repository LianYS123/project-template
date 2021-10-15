import xFetch from "utils/fetch";
import { CONFIG_APP, GET_USERINFO_URL } from "./API";

export function getAppConfig() {
  return xFetch(CONFIG_APP);
}

export function getUserInfo() {
  return xFetch(GET_USERINFO_URL);
}
