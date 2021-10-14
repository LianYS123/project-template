import React from "react";
import { Button, message, Spin } from "antd";
import BraftEditor from "braft-editor";
import { useRef } from "react";

import { cleanHtml, cleanRaw } from "utils/article";

import { useEditorState } from "./hooks";
import { controls, fontFamilies, SPLITER } from "./config";
import "./index.less";
import "braft-editor/dist/index.css";
import { uploadFile } from "utils/upload";
import { FormattedMessage } from "react-intl";
import { UPLOAD_HOST } from "constants";
import { useMutation } from "hooks";
import { ADD_TEMPLATE, EDIT_TEMPLATE } from "services/API";

function Editor(props) {
  const { history } = props;
  const { location } = history;
  const { query } = location;
  const { resourceId, menuId, resourcePath } = query;

  const editorRef = useRef();

  const [addPage] = useMutation(ADD_TEMPLATE);
  const [updatePage] = useMutation(EDIT_TEMPLATE);

  const { loading, editorState, setEditorState } = useEditorState(resourceId);

  const langMap = {
    "zh-CN": "cn",
    "en-US": "en",
    "ja-JP": "jpn"
  };
  const lang = langMap["zh-CN"];

  const requestUpdateTemplate = async payload => {
    const { code } = await updatePage(payload);
    if (code === "0000") {
      message.success("修改成功");
      history.push(
        `template/${resourceId}?menu=${menuId}&resourcePath=${resourcePath}`
      );
    }
  };

  const requestAddTemplate = async payload => {
    const { code, resourceId, resourcePath } = await addPage(payload);
    if (code === "0000") {
      message.success("新增成功");
      history.push(
        `template/${resourceId}?menu=${menuId}&resourcePath=${resourcePath}`
      );
      location.reload();
    }
  };

  // 保存文章
  const onSaveTemplate = () => {
    const html = cleanHtml(editorState.toHTML());
    const raw = cleanRaw(editorState.toRAW());
    const requestContent = `${html}${SPLITER}${raw}`;

    // console.log(html);
    // console.log(raw);
    // console.log(JSON.parse(raw));
    if (resourceId == "undefined") {
      requestAddTemplate({
        menuId,
        content: requestContent,
        resourcePath,
        language: "zh-CN" // TODO
      });
    } else {
      requestUpdateTemplate({
        resourceId,
        menuId,
        resourcePath,
        content: requestContent
      });
    }
  };

  return (
    <div className="my-component editor-wrapper">
      <Spin spinning={loading}>
        <BraftEditor
          controls={controls}
          fontFamilies={fontFamilies}
          language={lang}
          ref={instance => (editorRef.current = instance)}
          value={editorState}
          media={{
            accepts: { audio: true, video: true },
            async uploadFn({ success, error, file }) {
              const uploadConfig = {
                bizType: UPLOAD_HOST,
                dir: `media/${resourcePath}/`,
                ownerType: "public"
              };
              const { code, url } = await uploadFile(file, {
                config: uploadConfig,
                randomName: false,
                resourcePath
              });
              if (code === "0000" && url) {
                success({
                  url,
                  meta: {
                    id: "xxx",
                    title: "xxx",
                    alt: "xxx",
                    loop: false, // 指定音视频是否循环播放
                    autoPlay: false, // 指定音视频是否自动播放
                    controls: false // 指定音视频是否显示控制栏
                    // poster: 'http://xxx/xx.png', // 指定视频播放器的封面
                  }
                });
              } else {
                error({
                  msg: "unable to upload."
                });
              }
            }
          }}
          onChange={setEditorState}
        />

        <div className="submit-btn">
          <Button type="primary" onClick={onSaveTemplate}>
            {/* 保存 */}
            <FormattedMessage id="SAVE" />
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            type="default"
            onClick={() => history.go(-1)}
          >
            {/* 返回 */}
            <FormattedMessage id="BACK" />
          </Button>
        </div>
      </Spin>
    </div>
  );
}

export default Editor;
