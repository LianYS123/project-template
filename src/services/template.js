import { RESOURCE_HTML, RESOURCE_DOWN_LIST, TEMPLATE_EDIT_AUTH } from "./API";
import xFetch from "utils/fetch";

// 获取HTML资源
export function getOssHtml(resourceId) {
  const url = RESOURCE_HTML(resourceId);
  return xFetch(url);
}

// 获取图片资源
export function getImgResource(url) {
  return xFetch("/IMG/" + url);
}

// Oss云批量获取资源下载链接, list逗号分隔
export function getUrlList(list) {
  const url = RESOURCE_DOWN_LIST(list);
  return xFetch(url);
}

// 获取权限
export function getAuth(data) {
  return xFetch(TEMPLATE_EDIT_AUTH, data);
}
