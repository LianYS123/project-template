// eslint-disable-next-line no-unused-vars
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  EffectCallback
} from "react";
import isEqual from "fast-deep-equal";

/**
 * @description: 自定义useEffect的更新逻辑
 * @param {EffectCallback} effect 作用
 * @param {Array} deps 依赖
 * @param {Function} shouldUpdate 是否执行作用，返回true执行effect
 */
export const useShouldUpdateEffect = (effect, deps, shouldUpdate) => {
  const depsRef = useRef(deps);
  if (shouldUpdate(depsRef.current, deps)) {
    depsRef.current = deps;
  }
  useEffect(effect, depsRef.current);
};

/**
 * @description: 自定义useEffect的依赖比较逻辑
 * @param {EffectCallback} effect 作用
 * @param {Array} deps 依赖
 * @param {Function} compare 自定义比较函数
 */
export const useCustomCompareEffect = (effect, deps, compare) =>
  useShouldUpdateEffect(effect, deps, (...args) => !compare(...args));

/**
 * @description: 使用深比较的useEffect
 * @param {EffectCallback} effect 作用
 * @param {Array} deps 依赖
 */
export const useDeepCompareEffect = (effect, deps = []) => {
  return useCustomCompareEffect(effect, deps, isEqual);
};

/**
 * @description 真假值状态封装
 * @param {*} initialFlag 初始状态
 * @return {{ flag: Boolean, setTrue: Function, setFalse: Function, toggle: Function }}
 */
export const useFlag = initialFlag => {
  const [flag, setFlag] = useState(initialFlag);
  const setTrue = useCallback(() => setFlag(true), []);
  const setFalse = useCallback(() => setFlag(false), []);
  const toggle = useCallback(() => setFlag(f => !f), []);
  return {
    flag,
    setTrue,
    setFalse,
    toggle
  };
};

/**
 * @description 弹出框状态封装
 * @param {Object} [initialProps] modal属性初始值
 * @return {{ open: Function, close: Function, visible: Boolean }}
 */
export const useModalAction = initialProps => {
  const { flag, setFalse, setTrue } = useFlag(false);
  const [props, setProps] = useState(initialProps || {});
  const open = useCallback(props => {
    setTrue();
    setProps(props);
  }, []);
  const close = useCallback(() => {
    setFalse();
    setProps(initialProps);
  }, []);
  return {
    open,
    close,
    visible: flag,
    ...props
  };
};
