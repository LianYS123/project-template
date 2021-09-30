import i from "react-intl-universal";
import { Form, Input, Button } from "antd";
import { login } from "services/login";
import { useMutation } from "hooks";
import history from "utils/history";
import routers from "config/routers";

const Login = () => {
  const [submit, { loading }] = useMutation(login);

  const handleLogin = async values => {
    const { token, userInfos, code, userId } = await submit({
      ...values,
      platform: "MERCHANT",
      system: "mer"
    });

    if (code === "0000") {
      localStorage.setItem("acc", token);
      history.push(routers.HOME);
    }
  };

  return (
    <Form onFinish={handleLogin}>
      <h2>{i.get("login_LOGIN_TITLE")}</h2>
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
        {i.get("login_sure_login")}
      </Button>
    </Form>
  );
};

export default Login;
