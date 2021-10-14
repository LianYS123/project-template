import { nanoid } from "nanoid";

import readFile from "./stage/read";
import checkValidation from "./stage/validation";
import checkSignature from "./stage/signature";
import uploadFile from "./stage/upload";
import recordLogFile from "./stage/record";

class UploadFlow {
  constructor(file, options) {
    const { config, randomName } = options;

    this.config = config;
    this.continue = true;
    this.file = null;
    this.events = [];
    this.platformParms = {};
    this.result = {
      code: "0",
      status: "reject",
      message: "还未读取文件"
    };

    this.readFile(file, getFileName(randomName));
  }

  readFile(sourceFile, fileNameEvent) {
    this.events.push(async () => {
      const { next, result } = await readFile(sourceFile, fileNameEvent);

      this.continue = next;
      if (next) this.file = result;
      else this.result = result;
    });

    return this;
  }

  checkValidation() {
    this.events.push(async () => {
      if (this.continue) {
        const { next, result } = await checkValidation(this.file, this.config);

        this.continue = next;
        if (!next) this.result = result;
      }
    });

    return this;
  }

  getSignature() {
    this.events.push(async () => {
      if (this.continue) {
        const { next, result } = await checkSignature(this.file, this.config);

        this.continue = next;
        if (next) this.platformParms = result;
        else this.result = result;
      }
    });

    return this;
  }

  uploadFile() {
    this.events.push(async () => {
      if (this.continue) {
        const { next, result } = await uploadFile(
          this.file,
          this.platformParms
        );

        this.continue = next;
        if (!next) this.result = result;
      }
    });

    return this;
  }

  logFile() {
    this.events.push(async () => {
      if (this.continue) {
        this.result = await recordLogFile(this.file, this.config);
      }
    });

    return this;
  }

  async execute() {
    for (let event of this.events) {
      await event();
    }

    return this.result;
  }
}

function getFileName(randomName) {
  return function (name) {
    const type = typeof randomName === "function";

    if (type === "function") {
      return randomName(name);
    } else {
      if (randomName) {
        return createRandomName(name);
      } else {
        return name;
      }
    }
  };
}
//  随机文件名称函数
function createRandomName(name) {
  const randomId = nanoid();

  return `$[${randomId}]-${name}`;
}

export default UploadFlow;
