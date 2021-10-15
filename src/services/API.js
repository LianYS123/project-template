// 登录与授权
export const GET_CODEIMG_URL = "/cloudpick/rest/admin/api/v1/logon/captcha";
export const GET_SENDSMS_URL = "/cloudpick/rest/admin/api/v1/logon/sendsms";
export const SURE_SIGN_URL = "POST /cloudpick/rest/admin/api/v1/logon/login";
export const GET_USERPERS_URL = "/cloudpick/rest/admin/api/v1/logon/userpmt";
export const GET_USERINFO_URL = "/cloudpick/rest/admin/api/v1/logon/getuser";
export const LOGOUT_URL = "POST /cloudpick/rest/admin/api/v1/logon/logout";
export const IP_INFO = "/cloudpick/rest/api/v1/ip";
export const USER_AUTH = `/cloudpick/rest/admin/api/v1/user/permission/{userId}`;
export const SEC_LOGIN = "/cloudpick/rest/admin/api/v1/logon/mlogin";

export const CONFIG_APP = "/sto/rest/admin/api/v1/cloud/cfg";

// 查询文档系统菜单接口
export const MENU = "/sto/rest/operator/api/v1/doc/menu";

// Oss云通过资源id查询页面(html)
export const RESOURCE_HTML = resourceId => {
  return `/sto/rest/api/v2/resource/query?resourceId=${resourceId}`;
};

// enum.js
export const ENUM_DATA = "/sto/rest/api/v1/resource/i18n/char";

export const RESOURCE_DOWN_LIST = list =>
  `/sto/rest/api/v2/resource/url/list?list=${list}`;

// 修改页面
export const EDIT_TEMPLATE = "POST /sto/rest/operator/api/v1/doc/resource/edit";

export const ADD_TEMPLATE = "POST /sto/rest/operator/api/v1/doc/resource/add";

export const TEMPLATE_EDIT_AUTH =
  "/cloudpick/rest/admin/api/v1/logon/query/userpmt";

// 获取域名备案信息
export const DOMAIN_CONFIG = domain =>
  `/cloudpick/rest/operator/api/v1/mcp/domain/config/query?domainName=${domain}`;

//  上传文件
export const BATCH_SIGN = "POST /sto/rest/api/v2/resource/sign/batch";
export const FILE_LOG = "POST /sto/rest/api/v2/resource/add/batch";
