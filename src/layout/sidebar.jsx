import MenuList from "components/menuList";
import routers from "config/routers";
import { stringifyUrl } from "query-string";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

// 侧边栏
const Sidebar = () => {
  const menus = useSelector(state => state.app.menuList);
  const menuConfig = {
    menuNameKey: "menuName",
    menuChildrenKey: "nextMenuList",
    menuIdKey: "menuId"
  };
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
      mode="inline"
      onMenuClick={handleMenuChange}
      menuConfig={menuConfig}
      className="h-full"
      menus={menus}
    />
  );
};

export default Sidebar;
