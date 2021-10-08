import i from "react-intl-universal";
import { Form, Input, Button, Typography } from "antd";
import { useMutation } from "hooks";
import routers from "config/routers";
import { getService, post } from "utils/fetchUtils";
import { ACCOUNT_LOGIN } from "api/login";
import { useHistory } from "react-router";

const Login = () => {
  const [submit, { loading }] = useMutation(getService(ACCOUNT_LOGIN, post));
  const history = useHistory();

  const handleLogin = async values => {
    history.push(routers.HOME);
    // const { token, userInfos, code, userId } = await submit(values);

    // if (code === "0000") {
    //   localStorage.setItem("acc", token);
    //   history.push(routers.HOME);
    // }
  };

  return (
    <Form
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        overflow: "auto"
      }}
      onFinish={handleLogin}
    >
      <div
        style={{
          width: "50%",
          maxWidth: 500,
          minWidth: 300,
          transform: "translateY(-20%)"
        }}
      >
        <Typography.Title style={{ textAlign: "center" }} level={2}>
          {i.get("APP_NAME")}
        </Typography.Title>
        <Form.Item name={"account"} rules={[{ required: true }]}>
          <Input size="large" placeholder="Account" />
        </Form.Item>

        <Form.Item name={"password"} rules={[{ required: true }]}>
          <Input.Password size="large" placeholder="Password" />
        </Form.Item>

        <Button
          loading={loading}
          block
          size="large"
          htmlType="submit"
          type="primary"
        >
          {i.get("SURE_LOGIN")}
        </Button>
      </div>
    </Form>
  );
};

export default Login;
