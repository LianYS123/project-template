import React, { useEffect } from "react";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";

import loadable from "utils/loadable.js";
import AppLayout from "layout";
import routers from "config/routers";
import store from "./store";

import "./app.less";
import { antdLocales, locales } from "config/locales";
import { localMap } from "constants";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useMutation } from "hooks";
import { CONFIG_APP } from "services/API";
import { appSlice } from "store/app";

const useAppConfig = () => {
  const dispatch = useDispatch();
  const [loadConfg] = useMutation(CONFIG_APP);
  const fetchConfig = async () => {
    const { cloudCfgList, code } = await loadConfg();
    if (code === "0000") {
      dispatch(appSlice.actions.setConfig(cloudCfgList));
    }
  };
  useEffect(() => {
    fetchConfig();
  }, []);
};

const AppRoutes = () => {
  useAppConfig();
  return (
    <Switch>
      <Route path={routers.LOGIN} component={loadable("login")} />
      <Route path="/pages">
        <AppLayout>
          <Switch>
            <Route path={routers.HOME} component={loadable("home")} />
            <Route path={routers.TEMPLATE} component={loadable("template")} />
            <Route path={routers.EDITOR} component={loadable("editor")} />
            <Route path={routers.NOT_FOUND} component={loadable("404")} />
            <Redirect to={routers.NOT_FOUND} />
          </Switch>
        </AppLayout>
      </Route>
      <Redirect to={routers.NOT_FOUND} />
    </Switch>
  );
};

const App = () => {
  const { local } = useSelector(({ app }) => app);
  return (
    <Router>
      <ConfigProvider locale={antdLocales}>
        <IntlProvider
          messages={locales[local]}
          locale={localMap[local]}
          defaultLocale="en"
        >
          <AppRoutes />
        </IntlProvider>
      </ConfigProvider>
    </Router>
  );
};

const WrapApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default WrapApp;
