import xFetch from "utils/fetch";

const GET_COSITEM_URL = "/sto/rest/api/v1/resource/url";
const UP_ITEMLOG_URL = "/sto/rest/api/v1/resource/add";
const SEARCH_ITEMS_URL = "/sto/rest/api/v1/resource/biz";
const GET_FLOW_URL = "/sto/rest/api/v1/resource/flow";
const BATCH_UPLOADEXCEL = "/sto/rest/admin/api/v1/adc/local/downloadqueue/add";

// export const getResourceURLV1 = resourceId => {
//   const url = `/sto/rest/api/v1/resource/url${serializeQuery({ resourceId })}`;

//   return request(url);
// };

// export const getResourceURLV2 = resourceId => {
//   const url = `/sto/rest/api/v2/resource/url${serializeQuery({ resourceId })}`;

//   return request(url);
// };

// export const getResourceSignBatch = data => {
//   const url = `/sto/rest/api/v1/resource/sign/batch`;

//   return request(url, {
//     method: "POST",
//     body: data
//   });
// };

// export const getResourceSign = data => {
//   const url = `/sto/rest/api/v2/resource/sign${serializeQuery(data)}`;

//   return request(url);
// };

export const resourceVailidationV2 = list => {
  const url = `POST /sto/rest/api/v2/resource/validation`;
  const data = {
    fileList: list
  };
  return xFetch(url, data);
};

// export const resourceVailidationV1 = list => {
//   const url = `/sto/rest/api/v1/resource/validation`;

//   return request(url, {
//     method: "POST",
//     body: {
//       fileList: list
//     }
//   });
// };

// export const postResourceLogBatch = data => {
//   const url = `/sto/rest/api/v1/resource/add/batch`;

//   return request(url, {
//     method: "POST",
//     body: {
//       rbsInfos: data
//     }
//   });
// };

// export const postResourceLog = data => {
//   const url = `/sto/rest/api/v2/resource/add`;

//   return request(url, {
//     method: "POST",
//     body: data
//   });
// };

// //  导入excel资源
// export function importExcelFile(data) {
//   const url = BATCH_UPLOADEXCEL;
//   return request(url, {
//     method: "POST",
//     body: data
//   });
// }

// //  记录上传信息
// export function recordItemLog(data) {
//   const url = UP_ITEMLOG_URL;
//   return request(url, {
//     method: "POST",
//     body: data
//   });
// }

// //  根据条件查询资源
// export function searchCOSItem(filters) {
//   const url = `${SEARCH_ITEMS_URL}${serializeQuery(filters)}`;
//   return request(url);
// }

// //  查询资源日志
// export function getCOSItemLog(resourceId) {
//   const url = `${GET_FLOW_URL}${serializeQuery({ resourceId })}`;
//   return request(url);
// }

// export function getCOSItem(bizType, resourceId) {
//   const url = `${GET_COSITEM_URL}${serializeQuery({ bizType, resourceId })}`;
//   return request(url);
// }

// //  根据资源id或者资源名(模糊)查询资源信息
// export function getResourceQuery(data) {
//   const url = `/sto/rest/api/v1/resource${serializeQuery(data)}`;
//   return request(url);
// }

// //  查询组
// export function getResourceGroup(data) {
//   const url = `/sto/rest/api/v1/resource/group${serializeQuery(data)}`;
//   return request(url);
// }
// //  新建组
// export function addGroupInfo(data) {
//   const url = `/sto/rest/api/v1/resource/group/add`;
//   return request(url, {
//     method: "POST",
//     body: data
//   });
// }
// // 修改组
// export function updateFileGroup(data) {
//   const url = `/sto/rest/api/v1/resource/group/update`;
//   return request(url, {
//     method: "POST",
//     body: data
//   });
// }
// //  删除组(可批量)
// export function deleteFileGroup(data) {
//   const url = `/sto/rest/api/v1/resource/group/delete`;
//   return request(url, {
//     method: "POST",
//     body: data
//   });
// }

// //  编辑组资源
// export function editFileGroup(data) {
//   const url = `/sto/rest/api/v1/resource/group/edit`;
//   return request(url, {
//     method: "POST",
//     body: data
//   });
// }

// //  添加设备资源
// export function addDownloadResource(data) {
//   const url = `/sto/rest/admin/api/v1/adc/downloadqueue/add`;
//   return request(url, {
//     method: "POST",
//     body: data
//   });
// }
// //  md5验证资源名
// export function resourceVailidation(data) {
//   const url = `/sto/rest/api/v1/resource/validation`;
//   return request(url, {
//     method: "POST",
//     body: {
//       fileList: data
//     }
//   });
// }

// export const fileRDSTypes = {
//   video: ["mp4"],
//   music: ["mp3"],
//   image: ["png", "jpg", "jpeg", "gif"]
// };
