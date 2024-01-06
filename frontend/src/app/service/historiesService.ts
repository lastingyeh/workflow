import axios from 'axios';
import { HEADERS } from '../util/const';
import { HistoryInstanceTask } from '../util/type';

export const getHistoryProcessInstanceList = async (): Promise<
	HistoryInstanceTask[]
> => {
	const queryParams = new URLSearchParams();

	queryParams.append('sortBy', 'startTime');
	queryParams.append('sortOrder', 'desc');
	queryParams.append('maxResults', '5');

	const apiPath = `/history/process-instance?${queryParams}`;

	const res = await axios.get(apiPath, { headers: HEADERS });

	return res?.data as HistoryInstanceTask[];
};

export const getHistoryInstanceTaskList = async (
	processInstanceId: string
): Promise<HistoryInstanceTask[]> => {
	const queryParams = new URLSearchParams();

	queryParams.append('processInstanceId', processInstanceId);

	const apiPath = `/history/task?${queryParams}`;

	const res = await axios.get(apiPath, { headers: HEADERS });

	return res?.data as HistoryInstanceTask[];
};
