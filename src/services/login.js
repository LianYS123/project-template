import { post } from "utils/fetchUtils";

const ACCOUNT_LOGIN = "/cloudpick/rest/api/v1/pos/logon/account";

export const login = params => {
  return post(ACCOUNT_LOGIN, params);
};
