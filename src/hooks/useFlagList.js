import { useSelector } from "react-redux";

const getFlagImg = key =>
  `https://cloudpick.oss-cn-shanghai.aliyuncs.com/nationalflag/app/${key}.png`;

export const useFlagOptions = () => {
  const { config } = useSelector(state => state.app);
  const calcCountryCode = countryCode => countryCode.replace(/-.*$/, "");

  if (!config.nationalFlag) {
    return { options: [], calcCountryCode, defaultCountryCode: "+1" };
  }
  const nationalFlagList = (JSON.parse(config.nationalFlag) || []).map(it => ({
    ...it,
    coutryCode: "+" + it.coutryCode
  }));

  const smsList = config && config.sms && config.sms.split(",");
  const defaultCountryCode =
    nationalFlagList && nationalFlagList[0]
      ? nationalFlagList[0].coutryCode
      : smsList && smsList[0];
  const flagOptions = nationalFlagList.map((it, index) => {
    const { coutryCode, url, coutryName } = it;
    return {
      label: coutryName,
      value: `${coutryCode}`, // 防止重复
      key: `${coutryCode}-${index}`,
      url: getFlagImg(url)
    };
  });

  return {
    defaultValue: defaultCountryCode,
    options: flagOptions,
    calcCountryCode
  };
};
