// 放一些通用的常量

export const SPLITER = "###e76f825###";

export const IMAGE_PREFIX =
  process.env.NODE_ENV === "production"
    ? "https://cloudpick-doc.oss-cn-shanghai.aliyuncs.com/"
    : "https://cloudpick-doc.oss-cn-shanghai.aliyuncs.com/";

export const UPLOAD_HOST =
  process.env.NODE_ENV === "production" ? "cloudpick-doc" : "cloudpick-doc";

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

export const fileTypesMap = {
  picture: ["jpg", "jpeg", "png", "gif", "PNG", "JPG", "JPEG", "GIF"],
  video: ["mp4", "MP4"]
};
