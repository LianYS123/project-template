import { GET_ARTICLE_DETAIL } from "api/article";
import { useRequest } from "hooks";
import { getHtmlAndOutline } from "./utils";

export const useDocAuth = () => {
  // TODO
  return true;
};

export const useHtmlAndOutline = resourceId => {
  const {
    loading,
    data: { content }
  } = useRequest({
    service: GET_ARTICLE_DETAIL,
    necessaryParams: { resourceId },
    ready: !!resourceId && resourceId !== "undefined",
    initialData: { content: "" }
  });
  const { html, outline } = getHtmlAndOutline(content);
  return { html, outline, loading };
};
