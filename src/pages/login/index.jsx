import i from "react-intl-universal";
import { Form, Input, Button, Typography } from "antd";
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
