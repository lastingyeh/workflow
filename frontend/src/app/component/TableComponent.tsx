import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const TableComponent = ({
  columns,
  tasks,
}: {
  columns: ColumnsType<any>;
  tasks: any[];
}) => {
  return (
    <div >
      <Table columns={columns} dataSource={tasks} />
    </div>
  );
};

export default TableComponent;
