import { Steps } from 'antd';
import { HistoryInstanceTask } from '../util/type';
import moment from 'moment';

const description = 'This is a description.';

const StepsComponent = ({
  startAt,
  endAt,
  isCompleted,
  historyInstanceTaskList,
}: {
  startAt: Date;
  endAt: Date;
  isCompleted: boolean;
  historyInstanceTaskList: HistoryInstanceTask[];
}) => {
  const stepTasks = historyInstanceTaskList.map((task) => {
    return {
      title: task.name,
      description: moment(task.startTime).format('YYYY-MM-DD HH:mm'),
    };
  });

  stepTasks.unshift({
    title: 'start',
    description: moment(startAt).format('YYYY-MM-DD HH:mm'),
  });
  stepTasks.push({
    title: 'completed',
    description: moment(endAt).format('YYYY-MM-DD HH:mm'),
  });

  return (
    <Steps current={isCompleted ? stepTasks.length - 1 : 1} items={stepTasks} />
  );
};

export default StepsComponent;
