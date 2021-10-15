import routers from "config/routers";
import { useMutation } from "hooks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { GET_USERINFO_URL, MENU } from "services/API";
import { appSlice } from "store/app";
import AppHeader from "./header";
import Sidebar from "./sidebar";

const useInitUserInfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loadUserInfo] = useMutation(GET_USERINFO_URL);
  const fetchUserInfo = async () => {
    const { userInfo, code } = await loadUserInfo();
    if (code === "0000") {
      dispatch(appSlice.actions.setUserInfo(userInfo));
    }
  };
  useEffect(() => {
    if (localStorage.getItem("acc")) {
      fetchUserInfo();
    } else {
      history.push(routers.LOGIN);
    }
  }, []);
};

const useInitMenu = () => {
  const dispatch = useDispatch();
  const { userInfo, local } = useSelector(({ app }) => app);
  const { userId } = userInfo;
  const [loadMenu] = useMutation(MENU);

  const fetchMenu = async () => {
    const { menuList, code } = await loadMenu();
    if (code === "0000") {
      dispatch(appSlice.actions.setMenu(menuList));
    }
  };
  useEffect(() => {
    if (userId) {
      fetchMenu();
    }
  }, [userId, local]);
};

// 页面布局
const AppLayout = ({ children }) => {
  useInitUserInfo();
  useInitMenu();
  return (
    <div className="h-full flex flex-col">
      <AppHeader />
      <div className="flex flex-1 overflow-auto">
        <div className="w-64 h-full overflow-auto">
          <Sidebar />
        </div>
        <main className="container px-8 py-4 h-full overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
