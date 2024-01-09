import React from 'react';
import { Avatar, List, Typography } from 'antd';
import { AccountBookOutlined } from '@ant-design/icons';
import { ProcessDefinition } from '../util/type';

const { Text } = Typography;

const ProcessList = ({
  processDefinitionList,
  setProcess,
}: {
  processDefinitionList: ProcessDefinition[];
  setProcess: (processName: ProcessDefinition) => void;
}) => (
  <List
  style={{marginLeft:'20px'}}
    itemLayout='horizontal'
    dataSource={processDefinitionList}
    renderItem={(item, index) => (
      <List.Item
        onSelect={(event) => {
          console.log(event);
        }}
      >
        <List.Item.Meta
          avatar={<Avatar icon={<AccountBookOutlined size={2} />} />}
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
          description={<Text type='secondary'>version: {item.version}</Text>}
        />
      </List.Item>
    )}
  />
);

export default ProcessList;
