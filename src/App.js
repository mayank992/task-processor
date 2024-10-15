// libs
import { useState, useMemo, useCallback } from 'react';

// components
import { TaskForm } from './components/taskForm';
import { TaskTable } from './components/taskTable';
import { Configuration } from './components/configuration';

// processor
import { TaskProcessor } from './taskProcessor';

// constants
import { MAX_RUNNING_TASKS } from './constants';

// styles
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  const updateTaskStatus = useCallback((id, status) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  }, []);

  const processor = useMemo(
    () => new TaskProcessor(MAX_RUNNING_TASKS, updateTaskStatus),
    [updateTaskStatus]
  );

  const handleAddTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
    processor.addTask(task);
  };

  const handleConfigChange = useCallback(
    (config) => {
      processor.updateMaxRunningTasks(config.maxRunningTasks);
    },
    [processor]
  );

  return (
    <div className="App">
      <h1>Task Processor</h1>
      <TaskForm tasks={tasks} onAddTask={handleAddTask} />
      <Configuration onChange={handleConfigChange} />
      <TaskTable tasks={tasks} />
    </div>
  );
}

export default App;
