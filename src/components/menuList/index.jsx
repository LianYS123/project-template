import { Menu } from "antd";

const MenuList = ({ menus = [], ...props }) => {
  const renderMenuList = menuList => {
    return (
      <Menu {...props}>
        {menuList.map((menu, index) => {
          const { name, children, path } = menu;
          if (Array.isArray(children) && children.length) {
            return (
              <Menu.SubMenu title={name} key={path}>
                {renderMenuList(children)}
              </Menu.SubMenu>
            );
          } else {
            return (
              <Menu.Item title={name} key={path}>
                {name}
              </Menu.Item>
            );
          }
        })}
      </Menu>
    );
  };
  return <div>{renderMenuList(menus)}</div>;
};

export default MenuList;
