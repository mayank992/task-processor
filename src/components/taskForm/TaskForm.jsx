// libs
import { useState, useMemo, useCallback } from 'react';
import Select from 'react-select';

// utils
import { createTask, getDependencyOptions } from './helpers';

// constants
import { TASK_TYPES } from '../../constants';
import { TASK_TYPE_OPTIONS } from './constants';

export const TaskForm = ({ tasks, onAddTask }) => {
  const [taskType, setTaskType] = useState(TASK_TYPES.NORMAL);
  const [selectedDepsIds, setSelectedDepsIds] = useState([]);

  const dependencyOptions = useMemo(() => getDependencyOptions(tasks), [tasks]);

  const selectedTaskType = useMemo(
    () => TASK_TYPE_OPTIONS.find((option) => option.value === taskType),
    [taskType]
  );

  const selectedDeps = useMemo(
    () =>
      selectedDepsIds.map((depId) =>
        dependencyOptions.find((option) => option.value === depId)
      ),
    [selectedDepsIds, dependencyOptions]
  );

  const handleCreateTask = useCallback(() => {
    const task = createTask({ type: taskType, dependencies: selectedDepsIds });

    // reset state
    setTaskType(TASK_TYPES.NORMAL);
    setSelectedDepsIds([]);

    // add task
    onAddTask(task);
  }, [taskType, selectedDepsIds]);

  const handleDepsChange = useCallback((deps) => {
    setSelectedDepsIds(deps.map((dep) => dep.value));
  }, []);

  return (
    <div className="task-creation">
      <h2>Create a New Task</h2>
      <div>
        <label htmlFor="task-type">Task Type:</label>
        <Select
          id="task-type"
          className="task-type"
          value={selectedTaskType}
          options={TASK_TYPE_OPTIONS}
          onChange={(selected) => setTaskType(selected.value)}
          placeholder="Select Task Type"
        />
      </div>
      <div>
        <label htmlFor="dependencies">Dependencies:</label>
        <Select
          isMulti
          id="dependencies"
          className="dependencies"
          options={dependencyOptions}
          value={selectedDeps}
          onChange={handleDepsChange}
          placeholder="Select Dependencies"
          noOptionsMessage={() =>
            dependencyOptions.length === 0
              ? 'No available tasks to select'
              : 'Type to search'
          }
        />
      </div>
      <button onClick={handleCreateTask}>Add Task</button>
    </div>
  );
};
