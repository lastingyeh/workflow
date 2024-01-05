'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Divider, Layout, Space, theme } from 'antd';

import { ColumnsType } from 'antd/es/table';
import { getTasksByProcessId } from '@/app/service/taskService';
import { PROCESS_ID } from '@/app/util/const';
import { HistoryTask, Task } from '@/app/util/type';
import TableComponent from '../../component/TableComponent';
import ModalForm from '../../component/ModalForm';
import MenuComponent from '@/app/component/MenuComponent';
import { userFormTasks } from '@/app/util/taskForm';

const { Header, Content, Footer } = Layout;

const TasksPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const searchParams = useSearchParams();
  const processId = searchParams.get(PROCESS_ID) || '';

  const [userTasks, setUserTasks] = useState<Task[]>();
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [historyTasks, setHistoryTasks] = useState<HistoryTask[]>([]);

  useEffect(() => {
    getTasksByProcessId(processId)
      .then((res) => {
        setUserTasks(res.map((res) => ({ ...res, key: res.id })));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isModalOpen]);

  const columns: ColumnsType<Task> = [
    {
      key: 'act',
      title: 'Act',
      render: (_: any, record: Task) => (
        <Space size='middle'>
          <a
            onClick={() => {
              setSelectedTask(record);
              setIsModalOpen(true);
            }}
          >
            review
          </a>
        </Space>
      ),
    },
    {
      key: 'task',
      title: 'Task',
      dataIndex: 'name',
    },
    {
      key: 'created',
      title: 'Created',
      dataIndex: 'created',
    },
    {
      key: 'desc',
      title: 'Desc',
      dataIndex: 'description',
    },
    {
      key: 'assignee',
      title: 'Assign User',
      dataIndex: 'assignee',
    },
    {
      key: 'priority',
      title: 'Priority',
      dataIndex: 'priority',
    }
  ];

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className='demo-logo' />
        <MenuComponent processInstanceId={processId} />
        <p style={{ color: '#fff' }}>User Tasks</p>
      </Header>
      <Content
        style={{ padding: '0 48px', margin: '12px', minHeight: '500px' }}
      >
        <div
          style={{
            background: colorBgContainer,
            minHeight: '100%',
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {userTasks && <TableComponent columns={columns} tasks={userTasks} />}
        </div>
      </Content>
      {selectedTask && (
        <ModalForm
          formTypeList={userFormTasks[selectedTask.name]}
          open={isModalOpen}
          setOpen={setIsModalOpen}
          task={selectedTask}
        />
      )}
      <Divider />
      <Footer style={{ textAlign: 'center' }} />
    </Layout>
  );
};

export default TasksPage;
