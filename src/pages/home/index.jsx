import { Button, message } from "antd";
import i from "react-intl-universal";

const Home = () => {
  return (
    <div>
      {i.get("APP_NAME")}{" "}
      <button
        onClick={() => {
          message.info(i.get("APP_NAME"));
        }}
        className="py-2 px-4 m-1 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
      >
        Click me
      </button>
    </div>
  );
};
export default Home;
