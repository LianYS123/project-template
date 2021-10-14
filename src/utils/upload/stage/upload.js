async function uploadFile(file, options) {
  const { storageLocation = "cos" } = options;
  const uploadPlatformFile =
    storageLocation === "cos" ? uploadCOSFile : uploadOSSFile;
  const bool = await uploadPlatformFile(file, options);

  if (bool) return { next: true };
  else
    return {
      next: false,
      result: {
        code: "3",
        status: "reject",
        message: "上传至云平台失败"
      }
    };
}

/**
 * COS 文件上传  腾讯云
 */
function uploadCOSFile(file, options) {
  const { sign: authorization, bucketUrl, dir, fileName } = options;

  return new Promise(resolve => {
    const url = `${bucketUrl}${dir}${fileName}`;
    const xhr = new XMLHttpRequest();

    file.url = url;
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Authorization", authorization);
    xhr.send(file);

    xhr.onerror = err => {
      resolve(false);
    };
    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 206) {
        file.maybeUrl = url;
        resolve(true);
      } else {
        resolve(false);
      }
    };
  });
}

/**
 * OSS 文件上传  阿里云
 */
async function uploadOSSFile(file, opts) {
  return new Promise(resolve => {
    const { accessId, host, policy, sign, dir } = opts;

    const formData = new FormData();
    const xhr = new XMLHttpRequest();

    formData.append("key", `${dir}${file.name}`);
    formData.append("policy", policy);
    formData.append("OSSAccessKeyId", accessId);
    formData.append("success_action_status", 200);
    formData.append("signature", sign);
    formData.append("file", file);

    xhr.open("POST", host, true);
    xhr.send(formData);
    xhr.onerror = () => {
      resolve(false);
    };
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          file.maybeUrl = `${host}${dir}${file.name}`;
          resolve(true);
        } else {
          resolve(false);
        }
      }
    };
  });
}

export default uploadFile;
