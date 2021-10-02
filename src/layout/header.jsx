import { Select, Typography } from "antd";
import { useLanguage } from "hooks";

// header
const AppHeader = () => {
  const { setLanguage, language } = useLanguage();
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
          value={language}
          options={[
            {
              label: "Chinese",
              value: "zh_CN"
            },
            {
              label: "English",
              value: "en_US"
            }
          ]}
        />
      </div>
    </div>
  );
};

export default AppHeader;
