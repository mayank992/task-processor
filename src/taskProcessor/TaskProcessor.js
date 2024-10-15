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

    this.completedTasks = new Set();

    this.pendingTasks = []; // list of pending tasks
    this.taskQueueHigh = []; // high priority queue
    this.taskQueueNormal = []; // normal priority queue

    this.runningTasks = 0;
  }

  canRun(task) {
    // check dependencies
    return task.dependencies.every((depId) => this.completedTasks.has(depId));
  }

  getNextTask() {
    // first check high priority tasks
    if (this.taskQueueHigh.length > 0) {
      return this.taskQueueHigh.shift();
    }

    // then check normal priority tasks
    if (this.taskQueueNormal.length > 0) {
      return this.taskQueueNormal.shift();
    }

    // no tasks ready to run
    return null;
  }

  processTasks() {
    while (this.runningTasks < this.maxRunningTasks) {
      const task = this.getNextTask();
      if (!task) break; // no tasks ready to run

      this.executeTask(task);
    }
  }

  enqueueRunnableTasksAndProcess() {
    // enqueue tasks that might now be ready
    this.pendingTasks = this.pendingTasks.reduce((acc, task) => {
      if (!this.canRun(task)) {
        return [...acc, task];
      }

      if (task.type === TASK_TYPES.HIGH_PRIORITY) {
        this.taskQueueHigh.push(task);
      } else {
        this.taskQueueNormal.push(task);
      }
      return acc;
    }, []);

    this.processTasks();
  }

  async executeTask(task) {
    this.runningTasks++;
    this.onUpdateTaskStatus(task.id, TASK_STATUS.RUNNING);

    await task.execute();

    this.runningTasks--;
    this.completedTasks.add(task.id);
    this.onUpdateTaskStatus(task.id, TASK_STATUS.COMPLETED);

    // enqueue runnable tasks and process
    this.enqueueRunnableTasksAndProcess();
  }

  addTask(task) {
    this.pendingTasks.push(task);
    this.enqueueRunnableTasksAndProcess();
  }

  updateMaxRunningTasks(maxRunningTasks) {
    this.maxRunningTasks = maxRunningTasks;
    this.enqueueRunnableTasksAndProcess();
  }
}
