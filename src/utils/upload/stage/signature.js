import { getBatchSign } from "services/file";

async function checkSignature(file, config = {}) {
  const { bizType, dir } = config;
  const data = [
    {
      put: "put",
      fileName: file.name,
      dir,
      bizType
    }
  ];
  const { code, sigList = [] } = await getBatchSign({
    resourceList: data
  });

  if (code === "0000" && sigList.length > 0) {
    const { dir } = sigList[0];

    file.dir = dir;
    return {
      next: true,
      result: sigList[0]
    };
  }
  return {
    next: false,
    result: {
      code: "2",
      status: "reject",
      message: "获取签名失败"
    }
  };
}

export default checkSignature;
