export const languageList = [
  {
    label: "English",
    value: "en-US"
  },
  {
    label: "中文",
    value: "zh-CN"
  },
  {
    label: "日本語",
    value: "ja-JP"
  },
  {
    label: "한국어",
    value: "ko-KR"
  }
];

export const languageListMap = languageList.reduce(
  (res, cur) => ({ ...res, [cur.value]: [cur.label] }),
  {}
);

export const languageCodeMap = {
  zh_CN: "CN",
  en_US: "EN"
};

export const localMap = {
  zh_CN: "zh",
  en_US: "en"
};
