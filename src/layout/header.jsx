import LanguageSelection from "components/languageSelection";
import routers from "config/routers";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { secretPhone } from "utils";

// header
const AppHeader = () => {
  const history = useHistory();
  const intl = useIntl();
  const { mobile } = useSelector(({ app }) => app.userInfo);
  return (
    <header className="flex justify-between items-center px-8 py-4 shadow z-10">
      <div className="space-x-6">
        <span className="text-lg">
          {intl.formatMessage({ id: "WEBSITE_NAME" })}
        </span>
        {/* <input
          placeholder="Search"
          className="border rounded py-2 px-3 shadow w-56 h-8 border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
        /> */}
      </div>
      <div className="space-x-2 text-sm">
        <span>{secretPhone(mobile)}</span>
        <button
          onClick={() => history.push(routers.LOGIN)}
          className="hover:underline"
        >
          {intl.formatMessage({ id: "LOGOUT" })}
        </button>
        <LanguageSelection size="small" className="w-24" />
      </div>
    </header>
  );
};

export default AppHeader;
