import { BATCH_SIGN, FILE_LOG } from "services/API";
import xFetch from "utils/fetch";

//  批量获取签名
export function getBatchSign(data) {
  const url = BATCH_SIGN;

  return xFetch(url, data);
}

//  批量上传成功日志
export function putFileLog(data) {
  const url = FILE_LOG;

  return xFetch(url, data);
}
