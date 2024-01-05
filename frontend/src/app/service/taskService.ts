import axios from 'axios';
import { parse } from 'node-html-parser';
import { HEADERS } from '../util/const';
import { Task } from '../util/type';
import { setFormData } from '../util/func';

export const getTasksByProcessId = async (
  processInstanceId: string | null
): Promise<Task[]> => {
  const queryParams = new URLSearchParams();

  if (processInstanceId) {
    queryParams.append('processInstanceId', processInstanceId);
  }

  const apiPath = `/task?${queryParams}`;

  const res = await axios.get(apiPath, { headers: HEADERS });

  return res?.data as Task[];
};

export const commitTask = async (
  taskId: string,
  formData: { [key: string]: any }
) => {
  const apiPath = `/task/${taskId}/complete`;

  const bodyData = setFormData(formData);

  const res = await axios.post(apiPath, bodyData, { headers: HEADERS });

  return res;
};

export const getRenderedForm = async (taskId: string) => {
  const apiPath = `/task/${taskId}/rendered-form`;

  const res = await axios.get(apiPath);

  const root = parse(res.data);

  const input = root.querySelector('input');

  console.log(res.data);

  return res;
};
