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
    Swal.fire({
      title: "Gagal!",
      text: "Tolong masukan Task/Tugas",
      icon: "error",
      confirmButtonText: "OK",
    });
  } else {
    const listTask = document.createElement("li");
    listTask.innerHTML = task;
    let tasks = JSON.parse(localStorage.getItem("TodoList")) || [];
    tasks.push(task);
    localStorage.setItem("TodoList", JSON.stringify(tasks));
    taskList.appendChild(listTask);
    Swal.fire({
      title: "Berhasil!",
      text: "Task berhasil ditambahkan",
      icon: "success",
      confirmButtonText: "OK",
    });
    loadTask();
  }
}

function loadTask() {
  const tasks = JSON.parse(localStorage.getItem("TodoList")) || [];
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task;
    taskList.appendChild(li);
  });
}

document.getElementById("clearAll").addEventListener("click", () => {
  Swal.fire({
    title: "Yakin?",
    text: "Semua task akan dihapus!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, hapus semua",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      taskList.innerHTML = "";
      Swal.fire("Terhapus!", "Semua task sudah dihapus.", "success");
    }
  });
});
