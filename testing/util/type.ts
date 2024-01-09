export interface ExternalTask {
  activityId: string;
  activityInstanceId: string;
  errorMessage?: string;
  errorDetails?: string;
  executionId: string;
  id: string;
  lockExpirationTime: Date;
  processDefinitionId: string;
  processDefinitionKey: string;
  processDefinitionVersionTag?: string;
  processInstanceId: string;
  retries?: number;
  suspended: boolean;
  workerId: string;
  topicName: string;
  tenantId?: string;
  variables: { [key: string]: any };
  priority: number;
  businessKey?: string;
  extensionProperties: { [key: string]: any };
}

export type Topic = {
  topicName: string;
  lockDuration: number;
  variables: string[];
};

export type WorkerSettings = {
  workerId: string;
  maxTasks: number;
  topics: Topic[];
};
