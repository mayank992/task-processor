export const MAX_RUNNING_TASKS = 2;

export const TASK_TYPES = {
  NORMAL: 'NORMAL',
  HIGH_PRIORITY: 'HIGH_PRIORITY',
};

export const TASK_STATUS = {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
};

export const TASK_TYPE_VS_LABEL = {
  [TASK_TYPES.NORMAL]: 'Normal',
  [TASK_TYPES.HIGH_PRIORITY]: 'High priority',
};
