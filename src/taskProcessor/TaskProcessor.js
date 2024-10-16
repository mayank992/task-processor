// constants
import { TASK_TYPES, TASK_STATUS } from '../constants';

/**
 * Task {
 *    id: string;
 *    type: TASK_TYPES;
 *    status: TASK_STATUS;
 *    dependencies: string[]; // task ids
 *    execute: () => Promise<void>;
 * }
 */

export class TaskProcessor {
  constructor(maxRunningTasks, onUpdateTaskStatus) {
    this.maxRunningTasks = maxRunningTasks;
    this.onUpdateTaskStatus = onUpdateTaskStatus;

    this.runningTasks = 0;
  }

  async executeTask(task) {
    this.runningTasks++;
    this.onUpdateTaskStatus(task.id, TASK_STATUS.RUNNING);

    await task.execute();

    this.runningTasks--;
    this.onUpdateTaskStatus(task.id, TASK_STATUS.COMPLETED);
  }

  addTask(task) {
    // complete this function
  }

  updateMaxRunningTasks(maxRunningTasks) {
    // complete this function
  }
}
