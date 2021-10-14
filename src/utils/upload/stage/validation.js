import { resourceVailidationV2 } from "services/upload";

async function checkValidation(file, config = {}) {
  const { bizType, dir } = config;
  const data = [file].map(({ name, md5 }) => ({
    md5Value: md5,
    fileName: name,
    bizType,
    dir
  }));
  const { fileList: errorList = [] } = await resourceVailidationV2(data);

  if (errorList.length > 0) {
    const { errCode, resourceId, fileName } = errorList[0];

    if (errCode === "00" || errCode === "01") {
      return {
        next: false,
        result: {
          status: "resolve",
          data: {
            resourceId,
            fileName,
            originFile: file
          }
        }
      };
    } else {
      return {
        next: false,
        result: {
          code: "1",
          status: "reject",
          resourceId,
          message:
            errCode === "02" ? "资源名称和另外一个资源重复" : "验证MD5出错"
        }
      };
    }
  }

  return {
    next: true
  };
}

export default checkValidation;
