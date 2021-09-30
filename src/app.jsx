import React, { useEffect } from "react";
import { router } from "dva";
import { ConfigProvider } from "antd";

import { useRouteList } from "hooks";
import loadable from "utils/loadable.js";
import { antdLocales, locales } from "config/locales";
import i from "react-intl-universal";
import { useLanguage } from "hooks";
import AppLayout from "layout";
import routers from "config/routers";
import DVA from "./models";

import "./app.less";

const { Router, Route, Switch, Redirect } = router;

const AppRoutes = () => {
  const routeList = useRouteList();
  return (
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
  );
};

const WrapApp = props => {
  const { language } = useLanguage();
  useEffect(() => {
    i.init({
      locales,
      currentLocale: language
    });
  }, []);
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
