'use client';
import { Menu, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { MENU } from '../util/const';

const { Title } = Typography;

const MenuComponent = ({
  processInstanceId,
}: {
  processInstanceId: string;
}) => {
  const router = useRouter();

  const menuItemHandler = (menuItem: any) => {
    switch (menuItem.key) {
      case MENU.main.key.toString():
        router.push('/');
        break;
      case MENU.tasks.key.toString():
        router.push('/user/tasks');
        // if (processInstanceId) {
        //   router.push(`/user/tasks?processId=${processInstanceId}`);
        // } else {
        //   router.push('/user/tasks');
        // }
        break;
      case MENU.histories.key.toString():
        router.push(`/process/histories`);
        break;
      default:
        router.push('/');
        break;
    }
  };

  return (
    <Menu
      theme='dark'
      mode='horizontal'
      items={[
        {
          title: MENU.main.title,
          label: MENU.main.label,
          key: MENU.main.key,
          onClick: menuItemHandler,
        },
        {
          title: MENU.tasks.title,
          label: MENU.tasks.label,
          key: MENU.tasks.key,
          onClick: menuItemHandler,
        },
        {
          title: MENU.histories.title,
          label: MENU.histories.label,
          key: MENU.histories.key,
          onClick: menuItemHandler,
        },
      ]}
      style={{ flex: 1, minWidth: 0 }}
    />
  );
};

export default MenuComponent;
