// constants
import { TASK_TYPES, TASK_TYPE_VS_LABEL } from '../../constants';

export const TASK_TYPE_OPTIONS = [
  {
    label: TASK_TYPE_VS_LABEL[TASK_TYPES.NORMAL],
    value: TASK_TYPES.NORMAL,
  },
  {
    label: TASK_TYPE_VS_LABEL[TASK_TYPES.HIGH_PRIORITY],
    value: TASK_TYPES.HIGH_PRIORITY,
  },
];
