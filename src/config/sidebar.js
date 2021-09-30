import routers from "./routers";

const sidebar = [
  {
    name: "概览", // 概览
    path: routers.HOME,
    authList: ["*"],
    component: "home"
  }
];

export default sidebar;
