'use client';
import React, { useEffect, useState } from 'react';
import {
  ConfigProvider,
  Layout,
  Row,
  Col,
  notification,
  Divider,
  Typography,
} from 'antd';

import CardComponent from './component/CardComponent';
import ProcessList from './component/ProcessList';
import {
  createProcessInstance,
  getProcessDefinitionList,
} from './service/processService';
import theme from './theme/themeConfig';
import { ProcessDefinition } from './util/type';
import { PROCESS_ID } from './util/const';
import MenuComponent from './component/MenuComponent';
import { errorMessage } from './util/func';

const { Header, Content, Footer } = Layout;
const { Text, Link } = Typography;

const HomePage = () => {
  const [api, contextHolder] = notification.useNotification();
  const [processDefinitionList, setProcessDefinitionList] = useState<
    ProcessDefinition[]
  >([]);
  const [process, setProcess] = useState<ProcessDefinition>();
  const [processInstanceId, setProcessInstanceId] = useState<string>('');

  useEffect(() => {
    getProcessDefinitionList()
      .then((res) => {
        setProcessDefinitionList(res);
        setProcess(res[0]);
      })
      .catch((err) => {
        console.log('get process definition list error');
        console.error(err);
      });
  }, []);

  const createProcess = async () => {
    try {
      if (process) {
        const res = await createProcessInstance(process.id);

        setProcessInstanceId(res.id);

        api.info({
          message: (
            <Link href={`/user/tasks?${PROCESS_ID}=${res.id}`}>
              process started: <Text type='success'>{process.name}</Text>
            </Link>
          ),
          duration: null,
          placement: 'topLeft',
        });
      }
    } catch (error) {
      api.error({
        message: (
          <Text type='danger'>
            {errorMessage(
              error,
              `process: ${process?.id} work instance failed`
            )}
          </Text>
        ),
        description: 'error',
        placement: 'topRight',
      });
    }
  };

  return (
    <ConfigProvider theme={theme}>
      <Layout style={{minHeight:'100%'}}>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div className='demo-logo' />
          <MenuComponent processInstanceId={processInstanceId} />
          <p style={{ color: '#fff' }}>Camunda WorkFlow POC</p>
        </Header>
        <Content style={{ padding: '0 48px', marginTop: '18px', minHeight: '600px'  }}>
          <Row>
            <Col span={8}>
              {' '}
              {process && (
                <CardComponent
                  createProcess={createProcess}
                  process={process}
                />
              )}
            </Col>
            <Col span={12}>
              {' '}
              {process && (
                <ProcessList
                  processDefinitionList={processDefinitionList}
                  setProcess={setProcess}
                />
              )}
            </Col>
          </Row>
          {contextHolder}
        </Content>
        <Divider />
        <Footer style={{ textAlign: 'right', maxHeight: '200px' }}>
          Workflow testing v1.0.0
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default HomePage;
