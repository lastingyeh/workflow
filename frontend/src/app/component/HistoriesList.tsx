import React, { useEffect, useState } from 'react';
import { Avatar, Divider, List, Typography } from 'antd';
import { AppstoreTwoTone } from '@ant-design/icons';
import {
  getHistoryInstanceTaskList,
  getHistoryProcessInstanceList,
} from '../service/historiesService';
import { HistoryInstanceTaskList } from '../util/type';
import StepsComponent from './StepsComponent';
import { INSTANCE_STATE } from '../util/const';

const { Title, Text, Link } = Typography;

const HistoriesList = () => {
  const [historyInstanceTaskList, setHistoryInstanceTaskList] = useState<
    HistoryInstanceTaskList[]
  >([]);

  useEffect(() => {
    getHistoryProcessInstanceList()
      .then((instanceList) => {
        // setHistoryInstanceTaskList(instanceList);

        return Promise.all(
          instanceList.map((instance) =>
            getHistoryInstanceTaskList(instance.id)
          )
        ).then((instanceTaskList) => {
          return instanceTaskList.map((taskList, idx) => ({
            ...instanceList[idx],
            tasks: instanceTaskList[idx],
          }));
        });
      })
      .then((data) => {
        setHistoryInstanceTaskList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <List
      itemLayout='horizontal'
      dataSource={historyInstanceTaskList}
      renderItem={(item, index) => (
        <List.Item key={index}>
          <List.Item.Meta
            avatar={
              <Avatar
                style={{ background: 'transparent' }}
                icon={<AppstoreTwoTone />}
                size={50}
                // src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
              />
            }
            title={
              <Link href={`/user/tasks?processId=${item.id}`}>
                <Title level={4} type='secondary'>
                  {item.processDefinitionName}{' '}
                </Title>
              </Link>
            }
            description={
              <div>
                State:{' '}
                <Text type={item.state === 'COMPLETED' ? 'success' : 'warning'}>
                  {item.state}
                </Text>
                <br />
                {/* Start:{' '} */}
                {/* <Text underline mark>
                  {moment(item?.startTime).format('YYYY-MM-DD hh:mm')}
                </Text>{' '}
                To:{' '}
                <Text underline mark>
                  {item?.endTime &&
                    moment(item?.endTime).format('YYYY-MM-DD hh:mm')}
                </Text> */}
                <Divider />
                <StepsComponent
                  startAt={item?.startTime}
                  endAt={item?.endTime}
                  historyInstanceTaskList={item.tasks}
                  isCompleted={item.state === INSTANCE_STATE.completed}
                />
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default HistoriesList;
