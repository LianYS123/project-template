import { useIntl } from "react-intl";

const Home = () => {
  const intl = useIntl();
  return <div>{intl.formatMessage({ id: "APP_LANG" })}</div>;
};

export default Home;
