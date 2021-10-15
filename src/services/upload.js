import xFetch from "utils/fetch";

export const resourceVailidationV2 = list => {
  const url = `POST /sto/rest/api/v2/resource/validation`;
  const data = {
    fileList: list
  };
  return xFetch(url, data);
};
