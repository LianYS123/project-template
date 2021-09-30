import { useSelector, useDispatch } from "dva";

export const useLanguage = () => {
  const dispatch = useDispatch();
  const language = useSelector(state => state.app.language);
  const setLanguage = language => {
    dispatch({
      type: "updateLanguage",
      payload: language
    });
  };
  const switchToChinese = () => {
    setLanguage("zh_CN");
  };
  const switchToEnglish = () => {
    setLanguage("en_US");
  };
  return { language, setLanguage, switchToChinese, switchToEnglish };
};
