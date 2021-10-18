import React from "react";
import MenuList from "components/menuList";
import routers from "config/routers";
import { parse, stringifyUrl } from "query-string";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

const findOpenKeys = (menus = [], menuId, openKeys = []) => {
  if (!menuId) {
    return [];
  }
  for (const menu of menus) {
    if (menu.menuId.toString() === menuId.toString()) {
      return openKeys;
    } else if (menu.nextMenuList) {
      const keys = findOpenKeys(menu.nextMenuList, menuId, [
        ...openKeys,
        menu.menuId
      ]);
      if (keys && keys.length) {
        return keys;
      }
    }
  }
};

// 侧边栏
const Sidebar = () => {
  const { search } = useLocation();
  const { menu, resourcePath, resourceId } = parse(search);

  const [openKeys, setOpenKeys] = useState([]);

  const menus = useSelector(state => state.app.menuList);
  const menuConfig = {
    menuNameKey: "menuName",
    menuChildrenKey: "nextMenuList",
    menuIdKey: "menuId"
  };
  useEffect(() => {
    const openKeys = findOpenKeys(menus, menu);
    setOpenKeys(openKeys);
  }, [menus]);

  const history = useHistory();
  const handleMenuChange = menu => {
    const { menuId, menuName, resourceId, resourcePath } = menu;
    const basePath = routers.TEMPLATE.replace(":id", resourceId);
    const path = stringifyUrl({
      url: basePath,
      query: { menu: menuId, resourcePath }
    });
    history.push(path);
  };

  return (
    <MenuList
      openKeys={openKeys}
      defaultSelectedKeys={[menu]}
      mode="inline"
      onMenuClick={handleMenuChange}
      onOpenChange={setOpenKeys}
      menuConfig={menuConfig}
      className="h-full"
      menus={menus}
    />
  );
};

export default Sidebar;
