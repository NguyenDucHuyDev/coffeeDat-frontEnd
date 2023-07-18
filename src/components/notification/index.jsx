import { notification } from "antd";

export const Notification = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, des) => {
    api[type]({
      message: message,
      description: des,
    });
  };

  return {
    contextHolder,
    openNotificationWithIcon
  }
};
