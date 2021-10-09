import { useMessageUtils } from "hooks";
import { useState } from "react";
import { getAPIMethod } from "utils/apiUtils";
import xFetch from "utils/fetch";

/**
 * @description: 异步方法的简单封装，处理请求的loading状态
 * @param {function} service 异步方法
 * @return {array} 异步方法和状态信息
 */
export const useMutation = (service, initialData, config = {}) => {
  const { autoHandleError = true, showActionMessage = true } = config;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState(initialData);
  const { showError, showSuccess } = useMessageUtils();

  const loadData = async (params, config) => {
    try {
      setLoading(true);
      const res = await xFetch(service, params, config);
      const { code = "", message } = res;

      // 处理操作成功和失败的提示
      if (code === "0000") {
        const method = getAPIMethod(service);
        const actionMessageMap = {
          POST: "OPERATE_SUCCESS",
          PUT: "OPERATE_SUCCESS",
          DELETE: "OPERATE_SUCCESS"
        };
        if (showActionMessage && actionMessageMap[method]) {
          showSuccess({ id: actionMessageMap[method] });
        }
      } else if (autoHandleError) {
        showError({ id: "SERVICE_API_ERR", message });
      }

      setLoading(false);
      setData(res);
      return res;
    } catch (e) {
      setLoading(false);
      setError(e);
      if (autoHandleError) {
        showError({ id: "SERVICE_API_ERR" });
      }
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  return [loadData, { loading, error, data }];
};
