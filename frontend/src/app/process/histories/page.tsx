'use client';
import { Divider, Layout, theme } from 'antd';

import MenuComponent from '@/app/component/MenuComponent';
import HistoriesList from '@/app/component/HistoriesList';

const { Header, Content, Footer } = Layout;

const HistoriesPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className='demo-logo' />
        <MenuComponent processInstanceId={'processId'} />
        <p style={{ color: '#fff' }}>Instance Histories</p>
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
          <HistoriesList />
        </div>
      </Content>

      <Divider/>
      <Footer style={{ textAlign: 'center' }} />
    </Layout>
  );
};

export default HistoriesPage;
