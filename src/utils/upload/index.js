import UploadFlow from "./UploadFlow";
import { getUrlList } from "services/template";
import { IMAGE_PREFIX } from "constants";

export async function uploadFile(file, options) {
  // try {
  const { data } = await new UploadFlow(file, options)
    .checkValidation()
    .getSignature()
    .uploadFile()
    .logFile()
    .execute();

  const { originFile, resourceId } = data;
  const { name, md5, size, duration, width, height } = originFile;
  const uploadUrl = `${IMAGE_PREFIX}media/${options.resourcePath}/${name}`;
  const { code, urlList } = await getUrlList(uploadUrl);

  return { code, url: urlList[0].newUrl };
  // } catch (err) {
  //   // eslint-disable-next-line no-console
  //   console.error(`upload error: ${err}`);
  //   return { status: 'reject', message: '上传出错' };
  // }
}
