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
        ).then((data) => ({
          instanceList,
          instanceTaskList: data,
        }));
      })
      .then(({ instanceList, instanceTaskList }) => {
        const tmpInstanceTaskList = instanceTaskList.map((instanceTaskList) => {
          return {
            id: instanceTaskList[0].processInstanceId,
            tasks: instanceTaskList,
          };
        });

        const tempHistoryInstanceTaskList: HistoryInstanceTaskList[] = [];

        tmpInstanceTaskList.forEach((tTaskList) => {
          const idx = instanceList.findIndex((x) => x.id === tTaskList.id);

          if (idx > -1) {
            tempHistoryInstanceTaskList.push({
              ...instanceList[idx],
              tasks: tTaskList.tasks,
            });
          }
        });

        setHistoryInstanceTaskList(tempHistoryInstanceTaskList);
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
        <List.Item>
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
              <Title level={4}>
                <Link href={`/user/tasks?processId=${item.id}`}>
                  {item.processDefinitionName}{' '}
                </Link>
              </Title>
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
