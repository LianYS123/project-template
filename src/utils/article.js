// 处理存储在oss的文章
import { SPLITER } from "constants";
import $ from "jquery";
import { getOssHtml, getUrlList } from "services/template";

// 给img/video标签修改src参数，或增加属性
export const addAttrToHtml = (attrs, doc) => {
  for (let i = 0; i < doc.length; i++) {
    if (!attrs[i]) return;
    // 如果newUrl为空
    if (!attrs[i].newUrl) {
      // 用户没权限查看此资源
      doc[i].src = "default.jpg";
    } else {
      const fatherDiv = document.createElement("div");
      $(fatherDiv).attr("id", "parent");
      doc[i].src = attrs[i].newUrl;
      doc[i].setAttribute("class", "shuiyin");
      // $(doc[i]).wrap("#parent");
      $(doc[i]).wrap(fatherDiv);
      // 造水印
      const waterPrint = "Cloudpick";
      $(doc[i]).after(`<span class="shui-yin">${waterPrint}</span>`);
      $(doc[i]).after(`<span class="shui-yin shui-yin2">${waterPrint}</span>`);
      $(doc[i]).after(`<span class="shui-yin shui-yin3">${waterPrint}</span>`);
      $(doc[i]).after(`<span class="shui-yin shui-yin4">${waterPrint}</span>`);
      $(doc[i]).after(`<span class="shui-yin shui-yin5">${waterPrint}</span>`);
      $(doc[i]).after(`<span class="shui-yin shui-yin6">${waterPrint}</span>`);
    }
  }
};

// 处理视频
export const addAttrToVideo = (attrs, doc) => {
  for (let i = 0; i < doc.length; i++) {
    if (!attrs[i]) return;
    // 如果newUrl为空
    if (!attrs[i].newUrl) {
      doc[i].src = "default.jpg";
    } else {
      const fatherDiv = document.createElement("div");
      $(fatherDiv).attr("class", "media-wrap");
      doc[i].src = attrs[i].newUrl;
      //  给video一些操作限制，禁止下载、禁止全屏
      doc[i].setAttribute("controls", "true");
      doc[i].setAttribute("controlslist", "nodownload nofullscreen");
      doc[i].setAttribute("class", "shuiyin");
      // $(doc[i]).wrap(".media-wrap");
      $(doc[i]).wrap(fatherDiv);
    }
  }
};

const cleanUrl = url => {
  const index = url.indexOf("?");
  // 故意>0，因为？不可能出现在第一位
  if (index > 0) {
    return url.slice(0, index);
  } else {
    return url;
  }
};

// 提交修改之前统一对url再做剥离
export const cleanUrlBeforeSubmit = (nodeList = []) => {
  nodeList.length &&
    nodeList.forEach(node => {
      node.src = cleanUrl(node.src);
    });
};

export const enrichHtml = async html => {
  // 渲染编辑器内容
  const doc = document.createElement("div");
  doc.innerHTML = html;
  const imgNodeList = doc.getElementsByTagName("img");
  const videoNodeList = doc.getElementsByTagName("video");

  // 所有img标签src list, 并过滤空src，过滤base64图片
  const imgUrlList = [...imgNodeList]
    .map(({ src }) => src)
    .filter(item => item)
    .filter(item => item.indexOf("data:image") < 0);

  // 所有video标签src list
  const videoSrcList = [...videoNodeList]
    .map(({ src }) => src)
    .filter(item => item);

  // 数组转成字符串拼接，后端所需
  const imgUrlStr = imgUrlList.map(cleanUrl).join(",");
  const videoSrcStr = videoSrcList.map(cleanUrl).join(",");
  if (imgNodeList.length) {
    const { urlList, code } = await getUrlList(imgUrlStr);
    if (code === "0000" && urlList) {
      addAttrToHtml(urlList, imgNodeList);
    }
  }
  if (videoNodeList.length) {
    const { urlList, code } = await getUrlList(videoSrcStr);
    if (code === "0000" && urlList) {
      addAttrToVideo(urlList, videoNodeList);
    }
  }
  const outline = renderOutline(doc);
  return { html: doc.innerHTML, outline };
};

export const cleanHtml = html => {
  const doc = document.createElement("div");
  doc.innerHTML = html;
  const imgNodeList = [...doc.getElementsByTagName("img")];
  const videoList = [...doc.getElementsByTagName("video")];
  // 去掉query参数
  cleanUrlBeforeSubmit(imgNodeList);
  cleanUrlBeforeSubmit(videoList);
  return doc.innerHTML;
};

const obj2array = obj => {
  const res = [];
  for (let index in obj) {
    if (Number.isInteger(+index)) {
      res[index] = obj[index];
    }
  }
  return res;
};

const changeRawUrl = (raw, getNewUrl) => {
  const { entityMap } = raw; // entityMap是一个伪数组
  for (let index in entityMap) {
    const entity = entityMap[index];
    const { data = {} } = entity;
    const { url } = data;
    if (url) {
      entity.data.url = getNewUrl(url, index, entity);
    }
  }
  return raw;
};

export const enrichRaw = async _raw => {
  const raw = JSON.parse(_raw);
  const { entityMap } = raw;
  const entityArray = obj2array(entityMap);
  const urls = entityArray
    .filter(it => it.data && it.data.url)
    .map(it => it.data.url)
    .map(cleanUrl)
    .join(",");
  if (urls.length) {
    const { urlList, code } = await getUrlList(urls);
    if (code === "0000") {
      changeRawUrl(raw, (url, index) => (urlList[index] || {}).newUrl || url);
    }
  }
  return JSON.stringify(raw);
};

export const cleanRaw = _raw => {
  const raw = JSON.parse(_raw);
  changeRawUrl(raw, cleanUrl);
  return JSON.stringify(raw);
};

export const getHtmlAndOutline = async ({ resourceId }) => {
  const data = await getOssHtml(resourceId);
  const { content } = data;
  const [htmlTemplate] = content.split(SPLITER);
  const res = await enrichHtml(htmlTemplate);
  return res;
};

export const getTemplate = async resourceId => {
  const data = await getOssHtml(resourceId);
  const { content } = data;
  const [htmlTemplate, rawTemplate] = content.split(SPLITER);

  if (rawTemplate) {
    return await enrichRaw(rawTemplate);
  } else if (htmlTemplate) {
    const { html } = await enrichHtml(htmlTemplate);
    return html;
  }
};

// 1,2,3,1,2,2,3,1,2
// -> [
//   {
//     title: 1,
//     children: [
//       {
//         title: 2,
//         children: {
//           title: 3
//         }
//       }
//     ]
//   }
// ]

export const renderOutline = doc => {
  const elements = $(doc).children();
  const tempArr = [];

  const pushLast = (obj, arr) => {
    const level = obj.level;
    const lastObj = arr[arr.length - 1];
    const lastLevel = (lastObj || {}).level || 0;
    if (arr && arr.length) {
      if (level <= lastLevel) {
        arr.push(obj);
      } else {
        pushLast(obj, lastObj.children);
      }
    } else {
      arr.push(obj);
    }
  };
  elements.each((i, ele) => {
    if ("H1 H2 H3 H4".includes(ele.nodeName)) {
      const id = ele.innerText.replace(/\s/g, "");
      ele.id = id;
      const hMap = {
        H1: 1,
        H2: 2,
        H3: 3,
        H4: 4
      };
      const obj = {
        id,
        title: ele.innerText,
        level: hMap[ele.nodeName],
        children: []
      };
      pushLast(obj, tempArr);
    }
  });
  return tempArr;
};
