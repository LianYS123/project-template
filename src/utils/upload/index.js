import UploadFlow from "./UploadFlow";

export async function uploadFile(file, options) {
  const result = await new UploadFlow(file, options)
    .checkValidation()
    .getSignature()
    .uploadFile()
    .logFile()
    .execute();

  return result;
}
