// 处理存储在oss的文章
import { SPLITER } from "constants";
import $ from "jquery";

export const getHtmlAndOutline = content => {
  if (!content) {
    return { html: "", outline: [] };
  }
  const [htmlTemplate = ""] = content.split(SPLITER);
  const div = document.createElement("div");
  div.innerHTML = htmlTemplate;
  const outline = renderOutline(div);
  return { html: div.innerHTML, outline };
};

export const renderOutline = doc => {
  let arr = $(doc).children();
  let tempArr = [];
  arr.each((i, ele) => {
    let id = ele.innerText.replace(/\s/g, "");
    if (ele.nodeName === "H1") {
      ele.id = id;
      let obj = {
        id: id,
        title: ele.innerText,
        children: []
      };
      obj.title && tempArr.push(obj);
    }
    if (ele.nodeName === "H2") {
      ele.id = id;
      let obj = {
        id: id,
        title: ele.innerText,
        children: []
      };
      obj.title && tempArr[tempArr.length - 1].children.push(obj);
    }
    if (ele.nodeName === "H3") {
      ele.id = id;
      let obj = {
        id: id,
        title: ele.innerText,
        children: []
      };
      let h2 = tempArr[tempArr.length - 1].children;
      obj.title && h2[h2.length - 1].children.push(obj);
    }
    if (ele.nodeName === "H4") {
      ele.id = id;
      let obj = {
        id: id,
        title: ele.innerText,
        children: []
      };
      let h2 = tempArr[tempArr.length - 1].children;
      let h3 = h2[h2.length - 1].children;
      obj.title && h3[h3.length - 1].children.push(obj);
    }
  });
  return tempArr;
};
