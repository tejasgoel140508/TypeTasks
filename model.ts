// 1. TaskStatus Union
export type TaskStatus = "todo" | "in-progress" | "done";

// 2. Task Interface
export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

// 3. addTask: Returns a new array with the new task appended
export function addTask(tasks: Task[], title: string): Task[] {
  const newTask: Task = {
    id: Date.now(), // Generates a unique numeric ID
    title,
    status: "todo",
  };
  return [...tasks, newTask];
}

// 4. completeTask: Returns a new array with the target task marked as "done"
export function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task) =>
    task.id === id ? { ...task, status: "done" } : task
  );
}

// 5. filterByStatus: Returns tasks matching the given status
export function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((task) => task.status === status);
}

// 6. Custom Extra Operations (Originality Requirement)
// Custom Extra 1: Advances task status (todo -> in-progress -> done)
export function advanceTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task) => {
    if (task.id !== id) return task;

    let nextStatus: TaskStatus = task.status;
    if (task.status === "todo") {
      nextStatus = "in-progress";
    } else if (task.status === "in-progress") {
      nextStatus = "done";
    }

    return { ...task, status: nextStatus };
  });
}

// Custom Extra 2: Deletes a task by ID
export function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((task) => task.id !== id);
}

// Custom Extra 3: Counts total tasks under a specific status
export function countByStatus(tasks: Task[], status: TaskStatus): number {
  return filterByStatus(tasks, status).length;
}