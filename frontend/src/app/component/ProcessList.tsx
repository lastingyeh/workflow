import React from 'react';
import { Avatar, List,Typography } from 'antd';
import { ProcessDefinition } from '../util/type';

const {Text} = Typography

const ProcessList = ({
  processDefinitionList,
  setProcess,
}: {
  processDefinitionList: ProcessDefinition[];
  setProcess: (processName: ProcessDefinition) => void;
}) => (
  <List
    itemLayout='horizontal'
    dataSource={processDefinitionList}
    renderItem={(item, index) => (
      <List.Item
        onSelect={(event) => {
          console.log(event);
        }}
      >
        <List.Item.Meta
          avatar={
            <Avatar
              src={
                'https://static.commerce.aws.flender.cloud/sys-master/haf/h88/9454335524894.png'
              }
            />
          }
          title={
            <a
              href='#'
              onClick={() => {
                setProcess(item);
              }}
            >
              {item.name}
            </a>
          }
          description={<Text type="secondary">version: {item.version}</Text>}
        />
      </List.Item>
    )}
  />
);

export default ProcessList;
