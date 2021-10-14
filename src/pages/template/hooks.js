import { useRequest } from "hooks";
import { getHtmlAndOutline } from "utils/article";
import { getAuth } from "services/template";

export const useDocAuth = () => {
  const { data } = useRequest({
    method: getAuth,
    necessaryParams: { type: "ui", owners: "mer", auth: "ui.mer.menu:docEdit" },
    initialData: {
      perCodes: []
    }
  });
  const { perCodes } = data;
  return perCodes && perCodes.length > 0;
};

export const useHtmlAndOutline = resourceId => {
  const { data, loading } = useRequest({
    method: getHtmlAndOutline,
    necessaryParams: { resourceId },
    ready: !!resourceId && resourceId !== "undefined",
    initialData: { html: "", outline: [] }
  });
  const { html, outline } = data;
  return { html, outline, loading };
};
