// 3. addTask: Returns a new array with the new task appended
export function addTask(tasks, title) {
    const newTask = {
        id: Date.now(), // Generates a unique numeric ID
        title,
        status: "todo",
    };
    return [...tasks, newTask];
}
// 4. completeTask: Returns a new array with the target task marked as "done"
export function completeTask(tasks, id) {
    return tasks.map((task) => task.id === id ? { ...task, status: "done" } : task);
}
// 5. filterByStatus: Returns tasks matching the given status
export function filterByStatus(tasks, status) {
    return tasks.filter((task) => task.status === status);
}
// 6. Custom Extra Operations (Originality Requirement)
// Custom Extra 1: Advances task status (todo -> in-progress -> done)
export function advanceTask(tasks, id) {
    return tasks.map((task) => {
        if (task.id !== id)
            return task;
        let nextStatus = task.status;
        if (task.status === "todo") {
            nextStatus = "in-progress";
        }
        else if (task.status === "in-progress") {
            nextStatus = "done";
        }
        return { ...task, status: nextStatus };
    });
}
// Custom Extra 2: Deletes a task by ID
export function deleteTask(tasks, id) {
    return tasks.filter((task) => task.id !== id);
}
// Custom Extra 3: Counts total tasks under a specific status
export function countByStatus(tasks, status) {
    return filterByStatus(tasks, status).length;
}
//# sourceMappingURL=model.js.map