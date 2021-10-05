import React from "react";
import { Button, Spin } from "antd";
import BraftEditor from "braft-editor";

import { ContentUtils } from "braft-utils";

import "braft-editor/dist/index.css";
import { controls, fontFamilies } from "./config";
import { useRef } from "react";
import { useEditorState } from "./hooks";
import { SPLITER } from "constants";

function Editor(props) {
  const { history } = props;
  const { location } = history;
  const { query } = location;
  const { resourceId, menuId, resourcePath } = query;

  const editorRef = useRef();

  const { loading, editorState, setEditorState } = useEditorState(resourceId);

  // 确认，上传后插入图片
  const mediaConfirm = async file => {
    const { url, fileType } = file;
    setEditorState(editorState =>
      ContentUtils.insertMedias(editorState, [
        {
          type: fileType === "video" ? "VIDEO" : "IMAGE",
          url
        }
      ])
    );
  };

  // 保存文章
  const onSaveTemplate = () => {
    const html = editorState.toHTML();
    const raw = editorState.toRAW();
    const requestContent = `${html}${SPLITER}${raw}`;
  };

  return (
    <div className="my-component editor-wrapper">
      <Spin spinning={loading}>
        <BraftEditor
          controls={controls}
          fontFamilies={fontFamilies}
          // language={lang}
          ref={instance => (editorRef.current = instance)}
          value={editorState}
          // media={ {accepts: { audio:true,video:true} } }
          onChange={setEditorState}
          // onSave={this.submitContent}
          extendControls={[]}
        />

        <div className="submit-btn">
          <Button type="primary" onClick={onSaveTemplate}>
            保存
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            type="default"
            onClick={() => history.go(-1)}
          >
            返回
          </Button>
        </div>
      </Spin>
    </div>
  );
}

export default Editor;
