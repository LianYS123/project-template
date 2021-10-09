import { Form, Input, Button, Typography } from "antd";
import { useMutation } from "hooks";
import routers from "config/routers";
import { ACCOUNT_LOGIN } from "api/login";
import { useHistory } from "react-router";
import { useIntl } from "react-intl";

const Login = () => {
  const [submit, { loading }] = useMutation(ACCOUNT_LOGIN);
  const history = useHistory();
  const intl = useIntl();

  const handleLogin = async values => {
    const realValues = {
      platform: "MERCHANT",
      system: "mer",
      ...values
    };

    const { token, userInfos, code, userId } = await submit(realValues);

    if (code === "0000") {
      localStorage.setItem("acc", token);
      history.push(routers.HOME);
    }
  };

  return (
    <Form
      className="container mx-auto h-full overflow-auto"
      onFinish={handleLogin}
    >
      <div className="w-1/2 mx-auto my-52">
        <Typography.Title className="text-center" level={2}>
          {intl.formatMessage({ id: "APP_NAME" })}
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
          {intl.formatMessage({ id: "LOGIN" })}
        </Button>
      </div>
    </Form>
  );
};

export default Login;
