import md5 from "utils/md5";

async function readFile(file, fileNameEvent) {
  const list = [file]
    // .map(info => info.originFileObj)
    .filter(({ readed }) => !readed);
  const readedList = [];

  for (const item of list) {
    const newItem = new File([item], fileNameEvent(item.name), {
      type: item.type
    });
    const file = await readOneFile(newItem);

    if (file) readedList.push(file);
  }

  return readedList.length > 0
    ? { next: true, result: readedList[0] }
    : {
        next: false,
        result: {
          code: "0",
          status: "reject",
          message: "读取文件失败"
        }
      };
}

function readOneFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsBinaryString(file);
    reader.onload = async e => {
      const data = e.target.result;

      await setFileExtraProp(file);
      file.md5 = md5(data);
      resolve(file);
    };
    reader.onerror = err => {
      reject(false);
    };
  });
}

function setFileExtraProp(file) {
  const reader = new FileReader();

  reader.readAsDataURL(file);

  return new Promise((resolve, reject) => {
    reader.onload = e => {
      const fileType = file.type;

      if (fileType.includes("image")) {
        const image = new Image();

        image.onerror = reject;
        image.src = e.target.result;
        image.onload = function () {
          file.width = image.width;
          file.height = image.height;
          resolve();
        };
      } else if (fileType.includes("video") || fileType.includes("audio")) {
        const url = URL.createObjectURL(file);
        const video = document.createElement("video");

        video.oncanplay = function () {
          file.duration = this.duration;
          file.width = this.videoWidth;
          file.height = this.videoHeight;
          URL.revokeObjectURL(url); // Revoke when you don't need the url any more to release any reference
          resolve();
        };
        video.src = url;
        video.load();
      } else {
        resolve();
      }
    };
  });
}

export default readFile;
