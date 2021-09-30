import MenuList from "components/menuList";
import { useSidebar } from "hooks";

// 侧边栏
const Sidebar = () => {
  const { sidebar } = useSidebar();
  return <MenuList menus={sidebar} />;
};

export default Sidebar;
