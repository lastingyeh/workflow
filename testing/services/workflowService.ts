import axios from 'axios';
import { ExternalTask, WorkerSettings } from '../util/type';

export default class WorkflowService {
  baseUrl = 'http://localhost:8080/engine-rest';
  workerSettings: WorkerSettings;

  constructor(workerSettings: WorkerSettings) {
    this.workerSettings = workerSettings;
  }

  async sendAutoTestMessage(messageName: string) {
    const res = await axios.post(`${this.baseUrl}/message`, { messageName });

    return res.data;
  }

  async startExternalTasks() {
    const res = await axios.post(
      `${this.baseUrl}/external-task/fetchAndLock`,
      this.workerSettings
    );

    return res.data as ExternalTask[];
  }

  async completeExternalTasks(
    extTasks: ExternalTask[],
    keyValues: { [key: string]: any }
  ) {
    const variables = Object.keys(keyValues).reduce((prev, key) => {
      return { [key]: { value: keyValues[key] } };
    }, {});

    const results = await Promise.all(
      extTasks.map((ext) =>
        axios.post(`${this.baseUrl}/external-task/${ext.id}/complete`, {
          workerId: this.workerSettings.workerId,
          variables,
        })
      )
    );

    return results.map((res) => res.data);
  }
}
