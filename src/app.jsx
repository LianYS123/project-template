import React from "react";
import { router } from "dva";
import { ConfigProvider } from "antd";

import { useInitLanguage, useRouteList } from "hooks";
import loadable from "utils/loadable.js";
import { antdLocales } from "config/locales";
import AppLayout from "layout";
import routers from "config/routers";
import DVA from "./models";

import { useSelector } from "dva";

import "./app.less";
import Loading from "components/loading";

const { Router, Route, Switch, Redirect } = router;

const AppRoutes = () => {
  const routeList = useRouteList();
  useInitLanguage();
  const loadingApp = useSelector(state => state.app.loadingApp);
  return !loadingApp ? (
    <Switch>
      <Route path={routers.LOGIN} component={loadable("login")} />
      <Route path="/pages">
        <AppLayout>
          <Switch>
            {routeList.map(({ path, component }) => (
              <Route path={path} component={component} key={path} />
            ))}
            <Redirect to={routers.HOME} />
          </Switch>
        </AppLayout>
      </Route>
      <Redirect to={routers.HOME} />
    </Switch>
  ) : (
    <Loading />
  );
};

const WrapApp = props => {
  return (
    <Router {...props}>
      <ConfigProvider locale={antdLocales}>
        <AppRoutes />
      </ConfigProvider>
    </Router>
  );
};

DVA.router(({ history }) => <WrapApp history={history} />);

const AppContainer = DVA.start();

export default AppContainer;
