import { putFileLog } from "services/file";

async function recordLogFile(file, config) {
  const { md5, size, dir } = file;
  const { bizType, ownerType, ownerId } = config;
  const logtype = getLogtypeByFileType(file.type);
  const obj = {};

  if (ownerId) obj.ownerId = ownerId;
  const { code, resources = [] } = await putFileLog({
    rbsInfos: [
      {
        size,
        dir,
        md5Value: md5,
        type: logtype,
        fileName: file.name,
        transMsec: Date.now(),
        ownerType,
        bizType,
        ...obj
      }
    ]
  });

  if (code === "0000" && resources.length > 0) {
    return {
      status: "resolve",
      data: {
        ...resources[0],
        originFile: file
      }
    };
  }
  return {
    code: "4",
    status: "reject",
    message: "记录日志失败"
  };
}

function getLogtypeByFileType(fileType) {
  const [type] = fileType.split("/");

  switch (type) {
    case "image":
      return "picture";
    case "audio":
      return "audio";
    case "video":
      return "video";
    case "text":
      return "text";
    default:
      return "other";
  }
}

export default recordLogFile;
