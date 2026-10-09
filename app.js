import { addTask, advanceTask, deleteTask, filterByStatus, } from "./model.js";
// Application State
let tasks = [];
let currentFilter = "all";
// DOM Elements with strict type assertions
const taskForm = document.getElementById("task-form");
const taskTitleInput = document.getElementById("task-title-input");
const taskListElement = document.getElementById("task-list");
const filterButtons = document.querySelectorAll(".filter-btn");
// Render Functions
function render() {
    // Clear existing items
    taskListElement.innerHTML = "";
    // Apply typed filter logic
    const visibleTasks = currentFilter === "all"
        ? tasks
        : filterByStatus(tasks, currentFilter);
    visibleTasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = "task-item";
        // Build badge HTML
        const statusBadgeHtml = `<span class="status-badge ${task.status}">${task.status}</span>`;
        // Build advance action label based on status
        const advanceLabel = task.status === "todo"
            ? "Start"
            : task.status === "in-progress"
                ? "Complete"
                : "Done ✓";
        li.innerHTML = `
      <span class="task-title">${escapeHtml(task.title)}</span>
      ${statusBadgeHtml}
      <div class="task-actions">
        ${task.status !== "done"
            ? `<button class="action-btn advance-btn" data-id="${task.id}">${advanceLabel}</button>`
            : ""}
        <button class="action-btn delete-btn" data-id="${task.id}">Delete</button>
      </div>
    `;
        taskListElement.appendChild(li);
    });
}
function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}
// Event Listeners
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = taskTitleInput.value.trim();
    if (!title)
        return;
    tasks = addTask(tasks, title);
    taskTitleInput.value = "";
    render();
});
// Delegate item actions (Advance & Delete)
taskListElement.addEventListener("click", (e) => {
    const target = e.target;
    const idAttr = target.getAttribute("data-id");
    if (!idAttr)
        return;
    const taskId = Number(idAttr);
    if (target.classList.contains("advance-btn")) {
        tasks = advanceTask(tasks, taskId);
        render();
    }
    else if (target.classList.contains("delete-btn")) {
        tasks = deleteTask(tasks, taskId);
        render();
    }
});
// Filter button handling
filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const statusAttr = btn.getAttribute("data-status");
        if (statusAttr === "all") {
            currentFilter = "all";
        }
        else if (statusAttr === "todo" ||
            statusAttr === "in-progress" ||
            statusAttr === "done") {
            currentFilter = statusAttr;
        }
        render();
    });
});
// Initial Render
render();
//# sourceMappingURL=app.js.map