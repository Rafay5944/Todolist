let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCount() {
    document.getElementById("taskCount").textContent = tasks.length;
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>

            <div class="actions">
                <button class="done" onclick="toggleTask(${index})">✓</button>
                <button class="edit" onclick="editTask(${index})">✏</button>
                <button class="delete" onclick="deleteTask(${index})">🗑</button>
            </div>
        `;

        taskList.appendChild(li);
    });

    updateCount();
    saveTasks();
}

function addTask() {

    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if(text === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text:text,
        completed:false
    });

    input.value = "";
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index,1);
    renderTasks();
}

function editTask(index) {

    let updated = prompt("Edit Task:", tasks[index].text);

    if(updated !== null && updated.trim() !== "") {
        tasks[index].text = updated;
        renderTasks();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

renderTasks();