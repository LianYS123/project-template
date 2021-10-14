import MenuList from "components/menuList";
import routers from "config/routers";
import { useIntl } from "react-intl";

// 侧边栏
const Sidebar = () => {
  const intl = useIntl();
  const sidebar = [
    // { name: intl.formatMessage({ id: "sidebar_home" }), path: routers.HOME }
  ];
  return <MenuList className="h-full" menus={sidebar} />;
};

export default Sidebar;
