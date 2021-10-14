// import { useRequest } from 'umi';
import BraftEditor from "braft-editor";

import { useRequest } from "hooks";
import { useEffect, useState } from "react";
import { fontFamilies } from "./config";
import { getTemplate } from "utils/article";

export const useEditorState = resourceId => {
  const [editorState, setEditorState] = useState();
  const { loading, data: template } = useRequest({
    service: () => getTemplate(resourceId),
    ready: !!resourceId
  });

  useEffect(() => {
    if (template) {
      setEditorState(BraftEditor.createEditorState(template, { fontFamilies }));
    }
  }, [template]);
  return { loading, editorState, setEditorState };
};
