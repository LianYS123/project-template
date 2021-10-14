import { Modal, Form, Select } from "antd";
import routers from "config/routers";
import { useMutation } from "hooks";
import { useIntl } from "react-intl";
import { useHistory } from "react-router";
import { SEC_LOGIN } from "services/API";

export const SelectChannelModal = ({
  userInfos = [],
  close,
  visible,
  mobile,
  region
}) => {
  const [login] = useMutation(SEC_LOGIN);
  const history = useHistory();
  const [form] = Form.useForm();
  const intl = useIntl();

  async function onFinish(values) {
    const { code, token } = await login({
      ...values,
      expiry: "30",
      system: "mer",
      clientType: "pc",
      mobile,
      region
    });
    if (code === "0000") {
      localStorage.setItem("acc", token);
      history.push(routers.HOME);
    }
  }

  return (
    <Modal
      title={intl.formatMessage({ id: "PLZ_SELECT_LOGIN_SHOP" })}
      visible={visible}
      onOk={() => form.submit()}
      onCancel={close}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="userId" rules={[{ required: true }]}>
          <Select
            placeholder={intl.formatMessage({ id: "PLZ_SELECT_LOGIN_SHOP" })}
            style={{ width: 180 }}
          >
            {userInfos.map(i => {
              const { channelName, userId } = i;
              return (
                <Select.Option value={userId} key={userId}>
                  {channelName}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
