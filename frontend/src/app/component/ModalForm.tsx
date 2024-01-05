import React from 'react';
import { AxiosError } from 'axios';
import { Form, Input, Modal, notification, Typography } from 'antd';
import { FormType, ResponseErrorType, Task } from '../util/type';
import { commitTask } from '../service/taskService';
import { dataFormat, errorMessage } from '../util/func';

const { Text } = Typography;

const ModalComponent = ({
  open,
  setOpen,
  task,
  formTypeList,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  task: Task;
  formTypeList: FormType[];
}) => {
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onReviewHandler = async (taskId: string) => {
    try {
      const formData = formTypeList.reduce((prev, curr) => {
        const key = curr.name;
        const value = form.getFieldValue(key);

        return { ...prev, [key]: dataFormat(curr.type, value) };
      }, {});

      await commitTask(taskId, formData);

      api.info({
        message: (
          <div>
            task completed: <Text type='success'>{task.id}</Text>
          </div>
        ),
        placement: 'topLeft',
      });
    } catch (error) {
      api.error({
        message: (
          <Text type='danger'>{errorMessage(error, 'handle task failed')}</Text>
        ),
        placement: 'topRight',
      });
    }
    setOpen(false);
  };

  return (
    <Modal
      title={task.name}
      open={open}
      onCancel={() => setOpen(false)}
      onOk={() => {
        onReviewHandler(task.id);
      }}
    >
      <Form
        form={form}
        name='validateOnly'
        layout='vertical'
        autoComplete='off'
      >
        {formTypeList.map((formType, index) => {
          const { name, label, initValue, required, type } = formType;
          return (
            <Form.Item
              key={index}
              name={name}
              label={label}
              initialValue={initValue}
              rules={[{ required }]}
            >
              <Input type={type} />
            </Form.Item>
          );
        })}
      </Form>
      {contextHolder}
    </Modal>
  );
};

export default ModalComponent;
