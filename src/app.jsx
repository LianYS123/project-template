import React from "react";
import { router } from "dva";
import { ConfigProvider } from "antd";

import loadable from "utils/loadable.js";
import AppLayout from "layout";
import routers from "config/routers";
import DVA from "./models";

import "./app.less";

const { Router, Route, Switch, Redirect } = router;

const AppRoutes = () => {
  return (
    <Switch>
      <Route path={routers.LOGIN} component={loadable("login")} />
      <Route path={routers.EDITOR} component={loadable("editor")} />
      <Route path="/pages">
        <AppLayout>
          <Switch>
            <Route path={routers.HOME} component={loadable("home")} />
            <Route path={routers.ARTICLE} component={loadable("detail")} />
            <Redirect to={routers.HOME} />
          </Switch>
        </AppLayout>
      </Route>
      <Redirect to={routers.HOME} />
    </Switch>
  );
};

const WrapApp = props => {
  return (
    <Router {...props}>
      <ConfigProvider>
        <AppRoutes />
      </ConfigProvider>
    </Router>
  );
};

DVA.router(({ history }) => <WrapApp history={history} />);

const AppContainer = DVA.start();

export default AppContainer;
