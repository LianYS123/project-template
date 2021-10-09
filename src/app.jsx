import React from "react";
import { router, useSelector } from "dva";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";

import loadable from "utils/loadable.js";
import AppLayout from "layout";
import routers from "config/routers";
import DVA from "./models";

import "./app.less";
import { antdLocales, locales } from "config/locales";

const { Router, Route, Switch, Redirect } = router;

const AppRoutes = () => {
  return (
    <Switch>
      <Route path={routers.LOGIN} component={loadable("login")} />
      <Route path="/pages">
        <AppLayout>
          <Switch>
            <Route path={routers.HOME} component={loadable("home")} />
            <Redirect to={routers.HOME} />
          </Switch>
        </AppLayout>
      </Route>
      <Redirect to={routers.HOME} />
    </Switch>
  );
};

const WrapApp = props => {
  const { local } = useSelector(({ app }) => app);
  return (
    <Router {...props}>
      <ConfigProvider locale={antdLocales}>
        <IntlProvider
          messages={locales[local]}
          locale={local}
          defaultLocale="en"
        >
          <AppRoutes />
        </IntlProvider>
      </ConfigProvider>
    </Router>
  );
};

DVA.router(({ history }) => <WrapApp history={history} />);

const AppContainer = DVA.start();

export default AppContainer;
