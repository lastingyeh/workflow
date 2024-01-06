export type Links = { href: string; method: string; rel: string };

export interface ProcessDefinition {
  id: string;
  key: string;
  name: string;
  version: number;
}

export interface ProcessInstanceRes {
  id: string;
  links: Links[];
}

export interface Task {
  id: string;
  name: string;
  created: Date;
  assignee: string;
  description: string;
  priority: number;
}

export interface HistoryInstanceTaskList {
  id?: string;
  processDefinitionId?: string;
  processDefinitionName?: string;
  processDefinitionVersion?: number;
  startTime: Date;
  endTime: Date;
  rootProcessInstanceId?: string;
  state?: string;
  tasks: HistoryInstanceTask[];
}

export interface HistoryInstanceTask {
  id: string;
  name: string;
  startTime: Date;
  endTime: Date;
  processDefinitionId: string;
  processInstanceId: string;
  assignee: string;
}

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export type ResponseErrorType = { code: number; message: string; type: string };

export type FormType = {
  name: string;
  label: string;
  initValue: any;
  required: boolean;
  type: 'string' | 'number' | 'boolean' | undefined;
};
