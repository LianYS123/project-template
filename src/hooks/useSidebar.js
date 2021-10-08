import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  flatSidebarRouteList,
  flatSidebarAuthList,
  flatSibarConfig
} from "utils/flatSidebar";

// 提取出来方便以后(可能)添加功能
// 对侧边栏的操作放在这里, 包括修改侧边栏等
export const useSidebar = () => {
  const sidebar = useSelector(({ app }) => app.sidebar);
  const dispatch = useDispatch();
  const setSidebar = sidebar => {
    dispatch({
      type: "app/setState",
      payload: { sidebar }
    });
  };

  return { sidebar, setSidebar };
};

export const useFlatSidebar = () => {
  const { sidebar } = useSidebar();
  const flatSidebarList = useMemo(() => flatSibarConfig(sidebar), [sidebar]);
  return flatSidebarList;
};

export const useRouteList = () => {
  const flatSidebarList = useFlatSidebar();
  const routeList = useMemo(
    () => flatSidebarRouteList(flatSidebarList),
    [flatSidebarList]
  );
  return routeList;
};
