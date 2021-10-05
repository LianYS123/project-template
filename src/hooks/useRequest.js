import { useRef } from "react";
import { useMutation } from "./useMutation";
import { useDeepCompareEffect } from "./useUtils";

/**
 * @description: 请求方法的简单封装，处理请求的loading状态
 * @param {Object} config
 * @param {*} config.service 请求方法
 * @param {*} config.defaultParams 默认参数
 * @param {*} config.necessaryParams 必要参数
 * @param {*} config.ready === true时发起请求，默认值为true
 * @param {*} config.initialData === 初始数据
 * @param {*} config.rest 请求方法额外参数, onError事件等options可以通过这个参数传递
 */
export const useRequest = ({
  service,
  defaultParams = {},
  necessaryParams,
  ready = true,
  initialData,
  ...rest
}) => {
  const [_service, requestState] = useMutation(service, initialData);
  const paramRef = useRef(defaultParams);
  const necessaryParamsRef = useRef(necessaryParams);
  necessaryParamsRef.current = necessaryParams;

  const loadData = (_params = paramRef.current) => {
    paramRef.current = _params;
    if (!requestState.loading) {
      const realParams = { ...necessaryParamsRef.current, ..._params }; //每次请求都带上necessaryParams
      _service(realParams, rest);
    }
  };

  //使用上次的参数重新请求
  const reload = () => {
    loadData();
  };

  useDeepCompareEffect(() => {
    if (ready === true) {
      loadData();
    }
  }, [necessaryParams, ready]);

  return {
    search: loadData,
    reload,
    params: { ...necessaryParamsRef.current, ...paramRef.current },
    ...requestState
  };
};
