import routers from "config/routers";
import { useHistory } from "react-router";

// header
const AppHeader = () => {
  const history = useHistory();
  return (
    <header className="flex justify-between items-center px-14 py-4 shadow">
      <div className="space-x-6">
        <span className="text-lg">BLOG</span>
        {/* <input className="w-48 h-8" type="text"  */}
        <input
          placeholder="Search"
          className="border rounded py-2 px-3 shadow w-56 h-8 border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
        />
      </div>
      <div className="space-x-2 text-base">
        <button
          onClick={() => history.push(routers.EDITOR)}
          className="hover:underline"
        >
          写文章
        </button>
        <button
          onClick={() => history.push(routers.LOGIN)}
          className="hover:underline"
        >
          登录
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
