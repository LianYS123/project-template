import { Button, message } from "antd";
import i from "react-intl-universal";

const Home = () => {
  return (
    <div>
      {i.get("APP_NAME")}{" "}
      <Button
        onClick={() => {
          message.info(i.get("APP_NAME"));
        }}
      >
        test
      </Button>
    </div>
  );
};
export default Home;
