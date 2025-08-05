const taskInput = document.getElementById("taskInput");
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

loadTask();

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
  taskForm.reset();
});

function addTask() {
  const task = taskInput.value.trim();
  if (task === "") {
    showToast("Task belum ditambahkan!!", "#ff5f6d");
  } else {
    let tasks = JSON.parse(localStorage.getItem("TodoList")) || [];
    tasks.push({ text: task, done: false });
    localStorage.setItem("TodoList", JSON.stringify(tasks));
    showToast("Task berhasil ditambahkan!", "#00b09b");
    loadTask();
  }
}

function loadTask() {
  const tasks = JSON.parse(localStorage.getItem("TodoList")) || [];
  taskList.innerHTML = "";

  tasks.forEach((taskObj, index) => {
    const li = document.createElement("li");
    li.className = `flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg shadow-sm mb-2 transition ${taskObj.done ? "line-through text-gray-400" : ""}`;

    const taskText = document.createElement("span");
    taskText.textContent = taskObj.text;

    const btnGroup = document.createElement("div");
    btnGroup.className = "flex flex-row";
    // Button Done
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✔️";
    doneBtn.className = "bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600 mr-2 flex items-center";
    doneBtn.onclick = () => {
      tasks[index].done = !tasks[index].done;
      localStorage.setItem("TodoList", JSON.stringify(tasks));
      showToast(`Task ditandai ${tasks[index].done ? "selesai" : "belum selesai"}`, "#3498db");
      loadTask();
    };

    // Button Delete
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.className = "bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600 flex items-center";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      localStorage.setItem("TodoList", JSON.stringify(tasks));
      showToast("Task berhasil dihapus.", "#e74c3c");
      loadTask();
    };

    btnGroup.appendChild(doneBtn);
    btnGroup.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(btnGroup);
    taskList.appendChild(li);
  });
}

document.getElementById("clearAll").addEventListener("click", () => {
  const tasks = JSON.parse(localStorage.getItem("TodoList")) || [];
  if (tasks.length > 0) {
    if (confirm("Yakin ingin menghapus semua task?")) {
      localStorage.clear();
      taskList.innerHTML = "";
      showToast("Semua task telah dihapus!", "#c0392b");
    }
  } else {
    showToast("Tidak ada task untuk dihapus!", "#e67e22");
  }
});

function showToast(message, color) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    style: {
      background: color,
      borderRadius: "8px",
    },
  }).showToast();
}
