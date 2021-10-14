import xFetch from "utils/fetch";
import { CONFIG_APP, GET_USERINFO_URL, MENU } from "./API";

export function getAppConfig() {
  return xFetch(CONFIG_APP);
}

// 获取菜单列表
export function getMenuList() {
  const url = MENU;
  return xFetch(url);
}

export function getUserInfo() {
  return xFetch(GET_USERINFO_URL);
}
