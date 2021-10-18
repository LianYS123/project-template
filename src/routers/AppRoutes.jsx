import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useMutation } from "hooks";
import { CONFIG_APP } from "services/API";
import { appSlice } from "models/app";

import AppLayout from "layout";
import routers from "routers";

import Login from "pages/login";
import Home from "pages/home";
import NotFound from "pages/404";

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

// 页面路由
const AppRoutes = () => {
  useAppConfig();
  return (
    <Switch>
      <Route path={routers.LOGIN} component={Login} />
      <Route path="/pages">
        <AppLayout>
          <Switch>
            <Route path={routers.HOME} component={Home} />
            <Route path={routers.NOT_FOUND} component={NotFound} />
            <Redirect to={routers.NOT_FOUND} />
          </Switch>
        </AppLayout>
      </Route>
      <Redirect to={routers.HOME} />
    </Switch>
  );
};

export default AppRoutes;