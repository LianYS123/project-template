import { Form, Input, Modal, Spin } from "antd";
import { useMutation, useRequest } from "hooks";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { GET_CODEIMG_URL } from "services/API";

const useCodeImage = ({ mobile, captchaUrl: defaultUrl }) => {
  const { config } = useSelector(({ app }) => app);
  const params = { mobile, system: "mer" };
  const [loadData, props] = useMutation(GET_CODEIMG_URL, {});
  const { code, captchaUrl = defaultUrl } = props.data;
  const imgUrl = `${config.imgHost}/${captchaUrl}`;
  const reload = () => loadData(params);
  return { ...props, imgUrl, reload };
};

export const ImageCodeModal = ({
  visible,
  close,
  onConfirm,
  mobile,
  captchaUrl
}) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const { loading, reload, imgUrl } = useCodeImage({ mobile, captchaUrl });
  return (
    <Modal
      title={intl.formatMessage({ id: "PLZ_ENTER_IMGCODE" })} // 请输入图片验证码
      visible={visible}
      onCancel={close}
      onOk={() => form.submit()}
      okText={intl.formatMessage({ id: "CONFIRM" })} // 确定
      cancelText={intl.formatMessage({ id: "CANCEL" })} // 取消
      width={360}
    >
      <Form form={form} onFinish={onConfirm}>
        <Spin spinning={loading}>
          <div className="flex space-x-2 items-center">
            <Form.Item
              className="flex-auto"
              style={{ margin: 0 }}
              name="captchaValue"
            >
              <Input
                size="large"
                placeholder={intl.formatMessage({ id: "PLZ_ENTER_CAPTCHA" })}
              />
            </Form.Item>
            <div className="w-20">
              {imgUrl && (
                <img
                  className="w-full"
                  onClick={reload}
                  src={imgUrl}
                  alt={intl.formatMessage({ id: "CAPTCHA" })}
                />
              )}
            </div>
          </div>
        </Spin>
      </Form>
    </Modal>
  );
};
