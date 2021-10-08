import React from "react";
import { Affix, Spin, Anchor } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDocAuth, useHtmlAndOutline } from "./hooks";
import { useHistory } from "react-router";
import routers from "config/routers";

const { Link } = Anchor;

function Template() {
  const resourceId = 0;
  const history = useHistory();

  const auth = useDocAuth();
  const { html, outline, loading } = useHtmlAndOutline(resourceId);

  const goEdit = () => {
    history.push({
      pathname: routers.EDITOR,
      query: {
        resourceId
      }
    });
  };

  const renderLink = list => {
    return list.map(item => {
      let { id, children, title } = item;
      if (children && children.length > 0) {
        return (
          <Link key={id} href={`#${id}`} title={title}>
            {renderLink(children)}
          </Link>
        );
      } else {
        return <Link key={id} href={`#${id}`} title={title} />;
      }
    });
  };

  return (
    <div id="anchor-box" className="container h-full overflow-auto">
      <Spin spinning={loading}>
        <div id="htmlTemplate" dangerouslySetInnerHTML={{ __html: html }}></div>
        {auth && (
          <div className="space-x-1" onClick={goEdit}>
            <span>编辑</span>
            <EditOutlined />
          </div>
        )}
        <Affix onClick={e => e.preventDefault()}>
          <div className="affix-box">
            <Anchor
              className="max-w-xs"
              getContainer={() => document.getElementById("anchor-box")}
            >
              {renderLink(outline)}
            </Anchor>
          </div>
        </Affix>
      </Spin>
    </div>
  );
}

export default Template;
