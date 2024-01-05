import { FormType } from './type';

export const userFormTasks: { [key: string]: FormType[] } = {
  'user-task': [
    {
      name: 'age',
      label: 'Age',
      initValue: 20,
      required: false,
      type: 'number',
    },
  ],
  'user-task-1': [
    {
      name: 'isdone',
      label: 'is Done',
      initValue: false,
      required: false,
      type: 'boolean',
    },
  ],
  'user-validated': [],
};
