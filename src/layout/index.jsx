import AppHeader from "./header";

// 页面布局
const AppLayout = ({ children }) => {
  return (
    <div>
      <AppHeader />
      <main className="container m-auto h-full">{children}</main>
    </div>
  );
};

export default AppLayout;
