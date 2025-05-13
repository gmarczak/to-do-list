document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    filterTasks();
});

function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    if (taskInput.value.trim() === "") return;

    const li = createTaskElement(taskInput.value, false);
    taskList.appendChild(li);
    saveTasks();
    filterTasks();
    taskInput.value = "";
}

function createTaskElement(text, completed = false) {
    const li = document.createElement("li");
    const taskText = document.createElement("span");
    taskText.textContent = text;
    if (completed) {
        taskText.classList.add("completed");
        li.classList.add("completed");
    }

    li.addEventListener("click", () => {
        taskText.classList.toggle("completed");
        li.classList.toggle("completed");
        saveTasks();
        filterTasks();
    });

    const deleteBtn = document.createElement("input");
    deleteBtn.type = "button";
    deleteBtn.value = "Delete";
    deleteBtn.classList.add("clearat");
    deleteBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        li.remove();
        saveTasks();
    });

    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    return li;
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#task-list li").forEach((li) => {
        const text = li.querySelector("span").textContent;
        const completed = li.classList.contains("completed");
        tasks.push({ text, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
        const li = createTaskElement(task.text, task.completed);
        document.getElementById("task-list").appendChild(li);
    });
}

function clearAllTasks() {
    const confirmed = confirm("Are you sure you want to delete all tasks?");
    if (!confirmed) return;

    document.getElementById("task-list").innerHTML = "";
    localStorage.removeItem("tasks");
}

function filterTasks() {
    const filter = document.getElementById("filter").value;
    const tasks = document.querySelectorAll("#task-list li");

    tasks.forEach((task) => {
        switch (filter) {
            case "all":
                task.style.display = "flex";
                break;
            case "completed":
                task.style.display = task.classList.contains("completed") ? "flex" : "none";
                break;
            case "uncompleted":
                task.style.display = !task.classList.contains("completed") ? "flex" : "none";
                break;
        }
    });
}