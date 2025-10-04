// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editingIndex = null;

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${task}</span>
      <div class="actions">
        <button class="edit" onclick="editTask(${index})">Edit</button>
        <button class="delete" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();

  if (task === "") {
    alert("Please enter a task!");
    return;
  }

  if (editingIndex !== null) {
    // Update existing task
    tasks[editingIndex] = task;
    editingIndex = null;
  } else {
    // Create new task
    tasks.push(task);
  }

  taskInput.value = "";
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = tasks[index];
  editingIndex = index;
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Initial render
renderTasks();
