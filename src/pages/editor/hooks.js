import { GET_ARTICLE_DETAIL } from "api/article";
import BraftEditor from "braft-editor";
import { SPLITER } from "constants";

import { useRequest } from "hooks";
import { useEffect, useState } from "react";
import { fontFamilies } from "./config";

export const useEditorState = resourceId => {
  const [editorState, setEditorState] = useState();
  const {
    loading,
    data: { content }
  } = useRequest({
    service: GET_ARTICLE_DETAIL,
    necessaryParams: { resourceId },
    ready: !!resourceId,
    initialData: { content: "" }
  });
  const [htmlTemplate, rawTemplate] = content.split(SPLITER);
  const template = rawTemplate || htmlTemplate;

  useEffect(() => {
    if (template) {
      setEditorState(BraftEditor.createEditorState(template, { fontFamilies }));
    }
  }, [template]);
  return { loading, editorState, setEditorState };
};
