import React from 'react';
import { notification } from 'antd';
import { NotificationType } from '../util/type';

const NotificationComponent = (type: { string: 'info' | 'error' }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };

  return <> {contextHolder}</>;
};

export default NotificationComponent;
