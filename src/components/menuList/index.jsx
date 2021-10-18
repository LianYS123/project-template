import React from "react";
import { Menu } from "antd";

const MenuList = ({
  menus = [],
  onMenuClick = () => null,
  menuConfig = {},
  ...props
}) => {
  const renderMenuList = menuList => {
    return menuList.map((menu, index) => {
      const {
        menuNameKey = "name",
        menuChildrenKey = "children",
        menuIdKey = "menuId"
      } = menuConfig;
      const name = menu[menuNameKey];
      const children = menu[menuChildrenKey];
      const menuId = menu[menuIdKey];
      if (Array.isArray(children) && children.length) {
        return (
          <Menu.SubMenu title={name} key={menuId}>
            {renderMenuList(children)}
          </Menu.SubMenu>
        );
      } else {
        return (
          <Menu.Item
            onClick={() => onMenuClick(menu, index)}
            title={name}
            key={menuId}
          >
            {name}
          </Menu.Item>
        );
      }
    });
  };
  return <Menu {...props}>{renderMenuList(menus)}</Menu>;
};

export default MenuList;
