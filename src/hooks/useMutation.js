import { useState, useRef } from "react";
import { get, getService } from "utils/fetchUtils";
/**
 * @description: 异步方法的简单封装，处理请求的loading状态
 * @param {function} service 异步方法
 * @return {array} 异步方法和状态信息
 */
export const useMutation = (service, initialData) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState(initialData);
  const serviceRef = useRef(service);
  serviceRef.current = service;

  const loadData = async (...params) => {
    try {
      setLoading(true);
      const method = serviceRef.current;
      const service =
        typeof method === "string" ? getService(method, get) : method;
      const res = await service(...params);
      setLoading(false);
      setData(res);
      return res;
    } catch (e) {
      setLoading(false);
      setError(e);
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  return [loadData, { loading, error, data }];
};
