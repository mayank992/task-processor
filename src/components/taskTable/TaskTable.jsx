// constants
import { TASK_TYPE_VS_LABEL } from '../../constants';

export const TaskTable = ({ tasks }) => (
  <div className="task-table">
    <h2>Tasks</h2>
    {tasks.length === 0 ? (
      <p>No tasks created yet.</p>
    ) : (
      <table>
        <thead>
          <tr>
            <th scope="col">Task ID</th>
            <th scope="col">Type</th>
            <th scope="col">Dependencies</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(({ id, type, dependencies, status }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{TASK_TYPE_VS_LABEL[type]}</td>
              <td>
                {dependencies.length > 0 ? dependencies.join(', ') : 'None'}
              </td>
              <td>{status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);
