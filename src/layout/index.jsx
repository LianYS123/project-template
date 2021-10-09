import AppHeader from "./header";
import Sidebar from "./sidebar";

// 页面布局
const AppLayout = ({ children }) => {
  return (
    <div className="h-full flex flex-col">
      <AppHeader />
      <div className="flex flex-auto">
        <div className="w-44 h-full">
          <Sidebar />
        </div>
        <main className="container m-auto h-full">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
