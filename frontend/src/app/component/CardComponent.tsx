import React from 'react';
import { SendOutlined } from '@ant-design/icons';
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
    style={{ width: 300 }}
    cover={
      <img
        alt='example'
        src='https://play-lh.googleusercontent.com/c8m9zkr7QxrUevntW4nfMQ5jZEUyYOugj2cOKgWQddhS1XcVS4NwrW1-d7m_NwOmyAI'
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
        <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToK_-LT9HmxfBNTsC0A8wfvjtfxKh3GjexbQ&usqp=CAU' />
      }
      title={<Text strong>Create process</Text>}
      description={<Text type='secondary'>{process.name}</Text>}
    />
  </Card>
);

export default CardComponent;
