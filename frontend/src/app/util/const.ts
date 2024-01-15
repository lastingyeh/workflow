export const URL = 'http://localhost:8080/engine-rest';

export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const PROCESS_ID = 'processId';

export const MENU = {
  main: { title: 'main', label: 'Main', key: 0 },
  tasks: { title: 'tasks', label: 'Tasks', key: 1 },
  histories: { title: 'histories', label: 'Histories', key: 2 },
};

export const INSTANCE_STATE = {
  active: 'ACTIVE',
  completed: 'COMPLETED',
};
