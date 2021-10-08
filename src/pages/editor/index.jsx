import React from "react";
import { Button, Form, Input, Spin } from "antd";
import BraftEditor from "braft-editor";

import "braft-editor/dist/index.css";
import { controls, fontFamilies } from "./config";
import { useArticle } from "./hooks";
import { useHistory } from "react-router";

function Editor() {
  const [form] = Form.useForm();
  const { loading } = useArticle({ form });
  const history = useHistory();

  // 保存文章
  const handleSubmit = values => {
    const { editorState, ...rest } = values;
    const html = editorState.toHTML();
    const raw = editorState.toRAW();

    const requestParams = { html, raw, ...rest };
    console.log(requestParams);
  };

  return (
    <div className="container mx-auto py-8">
      <Spin spinning={loading}>
        <Form onFinish={handleSubmit} form={form}>
          {/* 文章标题 */}
          <Form.Item rules={[{ required: true }]} label="标题" name="title">
            <Input className="w-64" placeholder="请输入标题" />
          </Form.Item>
          {/* 文章内容 */}
          <Form.Item name="editorState" colon={false} label=" ">
            <BraftEditor
              controls={controls}
              fontFamilies={fontFamilies}
              // media={ {accepts: { audio:true,video:true} } }
            />
          </Form.Item>

          <div className="text-center space-x-4">
            <Button type="primary" htmlType="submit">
              保存
            </Button>
            <Button type="default" onClick={() => history.go(-1)}>
              返回
            </Button>
          </div>
        </Form>
      </Spin>
    </div>
  );
}

export default Editor;
