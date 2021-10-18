import React from "react";
import MenuList from "components/menuList";
import { useSelector } from "react-redux";

// 侧边栏
const Sidebar = () => {
  const menus = useSelector(state => state.app.menuList);

  return <MenuList mode="inline" className="h-full" menus={menus} />;
};

export default Sidebar;
