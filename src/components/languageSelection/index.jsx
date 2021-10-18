import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import { appSlice } from "models/app";

const LanguageSelection = props => {
  const { local } = useSelector(({ app }) => app);
  const dispatch = useDispatch();
  const setLanguage = local => {
    if (local) {
      localStorage.setItem("lang", local);
      dispatch(appSlice.actions.setLocal(local));
    }
  };
  return (
    <Select
      onChange={setLanguage}
      value={local}
      className="w-32"
      options={[
        {
          label: "简体中文",
          value: "zh_CN"
        },
        {
          label: "English",
          value: "en_US"
        }
      ]}
      {...props}
    />
  );
};

export default LanguageSelection;
