// constants
import { TASK_STATUS, TASK_TYPE_VS_LABEL } from '../../constants';

let taskId = 1;

const execute = () =>
  new Promise((resolve) => {
    // Simulate variable execution time between 1-10 seconds
    const executionTime = Math.floor(Math.random() * 10000) + 1000;
    setTimeout(resolve, executionTime);
  });

export const createTask = ({ type, dependencies }) => ({
  id: `Task ${taskId++}`,
  type,
  dependencies,
  status: TASK_STATUS.PENDING,
  execute,
});

export const getDependencyOptions = (tasks) =>
  tasks
    .filter((task) => task.status !== TASK_STATUS.COMPLETED)
    .map((task) => {
      const taskType = TASK_TYPE_VS_LABEL[task.type];

      return {
        value: task.id,
        label: `${task.id} (${taskType}) - ${task.status}`,
      };
    });
