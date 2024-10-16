### Problem Statement: Task Processor

**Objective**: Implement a Task Processor that manages the execution of tasks, considering task type, task dependencies and allowing dynamic adjustment of the upper limit on the number of tasks in the RUNNING state.

#### Task Types:

1. **Normal Task**: A standard task that can be executed at any time.
2. **High Priority Task**: A task that should be executed before normal tasks whenever possible.

#### Task Dependencies:

- Each task can have zero or more dependencies.
- A task can only start running once all its dependencies have been completed successfully.

#### Constraints:

- There is a configurable upper limit (`maxRunningTasks`) on the number of tasks that can be in the RUNNING state at any given time.
- If a task is dependent on other tasks, it cannot start until all its dependencies are marked as COMPLETED.
- High-priority tasks should be processed first if there are available slots within the upper limit.
- The upper limit can be adjusted dynamically. The processor should scale down or up based on the new limit.

### Requirements:

1. Implement a `TaskProcessor` class with the following methods:

   - `addTask(task)`: Adds a new task to the processor. Each task is an object with the following properties:
     - `id`: A unique identifier for the task (e.g., "Task 1", "Task 2", etc.).
     - `type`: Either `TASK_TYPES.NORMAL` or `TASK_TYPES.HIGH_PRIORITY`.
     - `status`: Current status of the task (e.g., RUNNING, COMPLETED).
     - `dependencies`: An array of task IDs that this task depends on.
     - `execute`: A function that returns a promise, representing the task's execution logic.
   - `updateMaxRunningTasks(maxRunningTasks)`: Updates the upper limit for running tasks.

2. Ensure that when the upper limit is adjusted:
   - If it is increased, the processor should try to initiate pending tasks.
   - If it is decreased, the processor should halt the addition of new tasks until the number of running tasks is below the `maxRunningTasks` limit, allowing them to finish gracefully."
  
3. Tasks should get executed (if possible as per constaints) as soon as they are added to Task Processor.

## Submission Instructions

1. Clicking "Run code" will compile and run your code against sample tests, but it will not generate scores. Click on "Execution Log" to better understand the test execution.
2. Clicking "Submit code" will run your code against multiple test cases, assessing different scenarios holistically. The score will be assigned accordingly.

To access the instructions, click on the "Question" button which can be found in the bottom left corner of the screen.
