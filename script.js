const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        const li = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        li.appendChild(taskText);

        if (task.completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", function(e) {
            if (e.target.tagName !== "BUTTON") {
                task.completed = !task.completed;
                saveTasks();
                showTasks();
            }
        });

        const dltBtn = document.createElement("button");
        dltBtn.textContent = "Delete";
        dltBtn.className = "delete-btn";

        dltBtn.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks();
            showTasks();
        });

        li.appendChild(dltBtn);
        taskList.appendChild(li);
    });
}

addBtn.addEventListener("click", function() {
    const task = taskInput.value.trim();

    if (task === "") {
        return;
    }

    tasks.push({
        text: task,
        completed: false
    });

    saveTasks();
    showTasks();
    taskInput.value = "";
});

taskInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        addBtn.click();
    }
});

showTasks();