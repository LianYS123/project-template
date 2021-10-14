import fetch from "utils/request";
import { serializeQuery } from "utils";

import { ENUM_DATA } from "services/API";

//  订单状态
export async function getOrderStatus() {
  const keys = [
    "init",
    "in_payment",
    "success",
    "timeout",
    "closed",
    "refund_success",
    "refund_fail",
    "refund_inprocess"
  ];

  return getEnumerData(keys, "OMS");
}
//  订单类型
export async function getOrderType() {
  const keys = ["00", "01", "02", "09"];

  return getEnumerData(keys, "OMS");
}
//  登录时长
export async function getLoginTime() {
  const keys = ["0", "7", "30"];

  return getEnumerData(keys, "LGN");
}
//  优惠活动状态
export async function getPromStatus() {
  const keys = ["ongoing", "comingsoon", "expired"];

  return getEnumerData(keys, "MKT");
}

async function getEnumerData(keys, system) {
  const url = `${ENUM_DATA}${serializeQuery({
    keys: keys.join(),
    system
  })}`;
  const { code, charMap = {}, i18nCharList = [] } = await fetch(url);

  return {
    code,
    map: charMap,
    list: i18nCharList.map(({ key, message }) => ({
      label: message,
      value: key
    }))
  };
}

// ? 多余代码还是注释用？
//   GSC("GSC", "商品中心"),
//   STO("STO", "商店系统"),
//   SCS("SCS", "购物车系统"),
//   CIF("CIF", "用户中心"),
//   LGN("LGN", "登录系统"),
//   CMC("CMC", "沟通平台"),
//   BOPS("BOP", "小二后台"),
//   OMS("OMS","订单交易中心"),
//   CCS("CCS","中控系统"),
//   VIS("VIS","视觉系统"),
//   MON("MON","监控系统"),
//   CRD("CRD","信用系统"),
//   MKT("MKT","营销平台"),
//   BAT("BAT","批处理系统"),
//   OGW("OGW","开放平台"),
//   MCP("MCP","商户平台"),
//   CMS("CMS","内容管理系统"),
//   ALM("ALM","监控报警平台"),
//   PSH("PSH","推送系统"),
//   WOA("WOA","微信公众号"),
