import xFetch from "utils/fetch";
import { MENU } from "./API";

// 获取菜单列表
export function getMenuList() {
  const url = MENU;
  return xFetch(url);
}
