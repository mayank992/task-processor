// libs
import { useState, useCallback } from 'react';

// constants
import { MAX_RUNNING_TASKS } from '../../constants';

const MIN = 1;
const MAX = 10;

const validate = (maxRunningTasks) => {
  if (maxRunningTasks === undefined) {
    return 'Max running tasks cannot be empty.';
  }

  if (maxRunningTasks < MIN || maxRunningTasks > MAX) {
    return `Max Running Tasks should be in range ${MIN} - ${MAX}`;
  }

  return undefined;
};

export const Configuration = ({ onChange }) => {
  const [error, setError] = useState('');
  const [maxRunningTasks, setMaxRunningTasks] = useState(MAX_RUNNING_TASKS);

  const handleUpdate = useCallback(() => {
    const validationError = validate(maxRunningTasks);

    if (validationError) {
      setError(validationError);
      return;
    }

    onChange({ maxRunningTasks });
  }, [maxRunningTasks, onChange]);

  return (
    <div className="processor-control">
      <h2>Processor Configuration</h2>
      <div className="form-field">
        <label htmlFor="max-running-tasks">Max Running Tasks:</label>
        <input
          min="1"
          max="10"
          type="number"
          id="max-running-tasks"
          value={maxRunningTasks}
          onChange={(e) => {
            const input = e.target.value;
            setMaxRunningTasks(input ? Number(input) : undefined);
          }}
        />
        {error ? <p className="error-text">{error}</p> : null}
      </div>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};
