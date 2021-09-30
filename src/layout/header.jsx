import { Select, Typography } from "antd";
import { useLanguage } from "hooks";

// header
const AppHeader = () => {
  const { setLanguage } = useLanguage();
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <Typography.Title level={3} style={{ color: "white", margin: 0 }}>
          Smart
        </Typography.Title>
      </div>
      <div style={{ flex: 1, textAlign: "right" }}>
        <Select
          onChange={lang => setLanguage(lang)}
          defaultValue="zh-CN"
          options={[
            {
              label: "Chinese",
              value: "zh-CN"
            },
            {
              label: "English",
              value: "en-US"
            }
          ]}
        />
      </div>
    </div>
  );
};

export default AppHeader;
