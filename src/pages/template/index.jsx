import React from "react";
import { Affix, Spin, Anchor } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useIntl } from "react-intl";
import { useDocAuth, useHtmlAndOutline } from "./hooks";

import { useHistory, useLocation, useParams } from "react-router";
import { parse, stringify } from "query-string";
import routers from "config/routers";

const { Link } = Anchor;

function Template() {
  const { id: resourceId } = useParams();
  const { search } = useLocation();
  const { menu, resourcePath } = parse(search);
  const intl = useIntl();
  const history = useHistory();

  const editorSearch = stringify({
    resourceId,
    menu,
    resourcePath: resourcePath
  });

  const auth = useDocAuth();
  const { html, outline, loading } = useHtmlAndOutline(resourceId);

  const goEdit = () => {
    const pathname = routers.EDITOR + "?" + editorSearch;
    history.push(pathname);
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
            &nbsp;
            {resourceId == "undefined"
              ? intl.formatMessage({ id: "ADD_ARTICLE" })
              : intl.formatMessage({ id: "EDIT_ARTICLE" })}
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
