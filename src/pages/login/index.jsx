import React, { useEffect } from "react";
import { Select, Input, Button, Form, Typography } from "antd";

import { useFlagOptions } from "hooks/useFlagList";
import {
  useCountDown,
  useMessageUtils,
  useModalAction,
  useMutation
} from "hooks";
import { GET_SENDSMS_URL, SURE_SIGN_URL } from "services/API";
import routers from "routers";
import { ImageCodeModal } from "./ImageCodeModal";
import { FormattedMessage, useIntl } from "react-intl";
import { SelectChannelModal } from "./SelectChannelModal";
import LanguageSelection from "components/languageSelection";
import { useHistory } from "react-router";

function Login() {
  const intl = useIntl();
  const [form] = Form.useForm();

  const { options, defaultValue } = useFlagOptions();
  const [login, { loading }] = useMutation(
    SURE_SIGN_URL,
    {},
    {
      successMessageId: "LOGIN_SUCCESS"
    }
  );
  const [sendSMS, { loading: loadingSMS }] = useMutation(GET_SENDSMS_URL);
  const imageCodeModalProps = useModalAction();
  const selectChannelModalProps = useModalAction();
  const { count, start, pause, reset, isPaused } = useCountDown();
  const { showSuccess } = useMessageUtils();
  const history = useHistory();

  useEffect(() => {
    form.setFieldsValue({ region: defaultValue });
  }, [defaultValue]);

  // 登录系统
  async function handleLogin(values) {
    const {
      code: resultCode,
      token = "",
      userInfos = []
    } = await login({
      expiry: "30",
      system: "mer",
      clientType: "pc",
      ...values
    });

    if (resultCode === "0000") {
      localStorage.setItem("acc", token);
      history.push(routers.HOME);
    } else if (resultCode === "LGN4001003") {
      const { region, mobile } = await form.validateFields([
        "region",
        "mobile"
      ]);
      selectChannelModalProps.open({ userInfos, mobile, region });
    }
  }

  // 发送短信验证码
  const handleSendSMS = async values => {
    const channel = "yunna";
    const { region, mobile } = await form.validateFields(["region", "mobile"]);
    const result = await sendSMS({
      region,
      mobile,
      channel,
      system: "mer",
      ...values
    });
    start();
    const { code, captchaUrl, success, message } = result;
    // 需要弹框获取图片验证码
    if (code === "0000") {
      if (captchaUrl) {
        imageCodeModalProps.open({ captchaUrl });
      } else {
        imageCodeModalProps.close();
        showSuccess({ id: "SEND_SUCCESS" });
      }
    }
  };

  return (
    <>
      <Form
        form={form}
        className="container mx-auto h-full overflow-auto"
        onFinish={handleLogin}
      >
        <div className="flex my-4 justify-end">
          <LanguageSelection />
        </div>
        <div className="w-96 mx-auto my-52">
          <Typography.Title className="text-center" level={2}>
            {intl.formatMessage({ id: "WEBSITE_NAME" })}
          </Typography.Title>
          <div className="flex space-x-2">
            <Form.Item name="region">
              <Select style={{ width: 100 }} size="large" options={options} />
            </Form.Item>
            <Form.Item
              className="flex-auto"
              name="mobile"
              rules={[{ required: true }]}
            >
              <Input
                placeholder={intl.formatMessage({ id: "PHONE" })}
                size="large"
              />
            </Form.Item>
          </div>
          <div className="flex space-x-2">
            <Form.Item
              className="flex-auto"
              name="smsCode"
              rules={[{ required: true }]}
            >
              <Input
                size="large"
                placeholder={intl.formatMessage({ id: "CAPTCHA" })}
              />
            </Form.Item>
            {!isPaused ? (
              <Button size="large" title={<FormattedMessage id="COUNT_DOWN" />}>
                <FormattedMessage id="COUNT_DOWN" /> :{count}s
              </Button>
            ) : (
              <Button
                size="large"
                loading={loadingSMS}
                title={intl.formatMessage({ id: "GET_CAPTCHA" })}
                onClick={() => handleSendSMS()}
              >
                {intl.formatMessage({ id: "GET_CAPTCHA" })}
              </Button>
            )}
          </div>

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
      {imageCodeModalProps.visible && (
        <ImageCodeModal
          mobile={form.getFieldValue("mobile")}
          {...imageCodeModalProps}
          onConfirm={handleSendSMS}
        />
      )}
      {selectChannelModalProps.visible && (
        <SelectChannelModal {...selectChannelModalProps} />
      )}
    </>
  );
}

export default Login;
