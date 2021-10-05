import React from "react";
import { Affix, Spin, Anchor } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDocAuth, useHtmlAndOutline } from "./hooks";

const { Link } = Anchor;

function Template({ history }) {
  const { location } = history;
  const { query } = location;
  const { resourcePath } = query;
  const resourceId = location.pathname.replace("/template/", "");

  const auth = useDocAuth();
  const { html, outline, loading } = useHtmlAndOutline(resourceId);

  const goEdit = () => {
    history.push({
      pathname: "/editor",
      query: {
        resourceId,
        menuId: query.menu,
        resourcePath: resourcePath
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
    <div
      id="anchor-box"
      style={{ maxWidth: "100%", maxHeight: "100%", overflow: "auto" }}
    >
      <Spin spinning={loading} style={{ minHeight: 500, paddingTop: 30 }}>
        <div id="htmlTemplate" dangerouslySetInnerHTML={{ __html: html }}></div>
        {auth && (
          <div className="edit-btn" onClick={goEdit}>
            <EditOutlined />
          </div>
        )}
        <Affix
          onClick={e => e.preventDefault()}
          style={{
            position: "fixed",
            top: "110px",
            right: "30px",
            textAlign: "left"
          }}
        >
          <div className="affix-box">
            <Anchor
              getContainer={() => document.getElementById("anchor-box")}
              style={{ maxWidth: "191px" }}
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
