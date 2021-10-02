import { useSelector, useDispatch } from "dva";
import { useEffect, useState } from "react";
import { locales } from "config/locales";
import i from "react-intl-universal";

export const useLanguage = () => {
  const dispatch = useDispatch();
  const language = useSelector(state => state.app.language);
  const setLanguage = language => {
    if (language) {
      localStorage.setItem("language", language);
      // location.reload();
      dispatch({
        type: "app/updateLanguage",
        payload: language
      });
    }
  };
  const switchToChinese = () => {
    setLanguage("zh_CN");
  };
  const switchToEnglish = () => {
    setLanguage("en_US");
  };
  return { language, setLanguage, switchToChinese, switchToEnglish };
};

export const useInitLanguage = () => {
  const { language } = useLanguage();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "app/updateLoadingApp",
      payload: true
    });
    i.init({
      locales,
      currentLocale: language
    }).then(() => {
      setTimeout(() => {
        dispatch({
          type: "app/updateLoadingApp",
          payload: false
        });
      }, 500);
    });
  }, [language]);
};
