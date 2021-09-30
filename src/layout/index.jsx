import { Layout } from "antd";
import AppHeader from "./header";
import Sidebar from "./sidebar";

// 页面布局
const AppLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100%" }}>
      <Layout.Header>
        <AppHeader />
      </Layout.Header>
      <Layout.Content style={{ display: "flex", flexDirection: "column" }}>
        <Layout style={{ flex: "auto" }}>
          <Layout.Sider theme="light">
            <Sidebar />
          </Layout.Sider>
          <Layout.Content>{children}</Layout.Content>
        </Layout>
      </Layout.Content>
    </Layout>
  );
};

export default AppLayout;
