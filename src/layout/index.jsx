import routers from "config/routers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import AppHeader from "./header";
import Sidebar from "./sidebar";

const useInitUserInfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("acc")) {
      dispatch({
        type: "app/getUserInfo"
      });
    } else {
      history.push(routers.LOGIN);
    }
  }, []);
};

const useInitMenu = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector(({ app }) => app.userInfo);
  useEffect(() => {
    if (userId) {
      dispatch({
        type: "app/getMenu"
      });
    }
  }, [userId]);
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
