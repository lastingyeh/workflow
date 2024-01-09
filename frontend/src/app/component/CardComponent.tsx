import React from 'react';
import Image from 'next/image';
import { SendOutlined,UserAddOutlined } from '@ant-design/icons';
import { Avatar, Card, Button, Typography } from 'antd';
import { ProcessDefinition } from '../util/type';
const { Text, Link } = Typography;

const { Meta } = Card;

const CardComponent = ({
  createProcess,
  process,
}: {
  createProcess: () => void;
  process: ProcessDefinition;
}) => (
  <Card
    style={{ width: '300' }}
    cover={
      <Image
        src='/process.jpeg'
        alt='process'
        width='120'
        height='250'
        priority
      />
    }
    actions={[
      <Button
        type='primary'
        shape='circle'
        icon={<SendOutlined />}
        onClick={createProcess}
      />,
      //   <EditOutlined key="edit" />,
      //   <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={
        <Avatar icon={<UserAddOutlined/>} />
      }
      title={<Text strong>Create process</Text>}
      description={<Text type='secondary'>{process.name}</Text>}
    />
  </Card>
);

export default CardComponent;
