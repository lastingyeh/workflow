import axios from 'axios';
import { URL, HEADERS } from '../util/const';
import { ProcessInstanceRes, ProcessDefinition } from '../util/type';

// create process instance
export const createProcessInstance = async (
  processId: string
): Promise<ProcessInstanceRes> => {
  const apiPath = `/process-definition/${processId}/start`;

  const res = await axios.post(apiPath, { name: 'user' }, { headers: HEADERS });

  return res?.data as ProcessInstanceRes;
};

// get process definition list
export const getProcessDefinitionList = async (): Promise<
  ProcessDefinition[]
> => {
  const queryParams = new URLSearchParams();

  queryParams.append('latestVersion', 'true');
  queryParams.append('sortBy', 'name');
  queryParams.append('sortOrder', 'desc');
  queryParams.append('maxResults', '5');

  const apiPath = `/process-definition?${queryParams}`;

  const res = await axios.get(apiPath, { headers: HEADERS });

  return res?.data as ProcessDefinition[];
};

