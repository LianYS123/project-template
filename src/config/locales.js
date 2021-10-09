import en from "locales/en_US";
import zh from "locales/zh_CN";

import antd_zh_CN from "antd/lib/locale/zh_CN";
import antd_en_US from "antd/lib/locale/en_US";

const antdLocales = {
  zh: antd_zh_CN,
  en: antd_en_US
};

const locales = {
  en,
  zh
};

export { antdLocales, locales };
