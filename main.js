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
    let tasks = JSON.parse(localStorage.getItem("TodoList")) || [];
    tasks.push({ text: task, done: false }); // simpan sebagai objek
    localStorage.setItem("TodoList", JSON.stringify(tasks));
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

  tasks.forEach((taskObj, index) => {
    const li = document.createElement("li");
    li.className = `flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg shadow-sm mb-2 transition ${taskObj.done ? "line-through text-gray-400" : ""}`;

    const taskText = document.createElement("span");
    taskText.textContent = taskObj.text;

    const btnGroup = document.createElement("div");

    // Button Done
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✔️ Done";
    doneBtn.className = "bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2";
    doneBtn.onclick = () => {
      tasks[index].done = !tasks[index].done;
      localStorage.setItem("TodoList", JSON.stringify(tasks));
      loadTask();
    };

    // Button Delete
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️ Hapus";
    deleteBtn.className = "bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600";
    deleteBtn.onclick = () => {
      Swal.fire({
        title: "Yakin?",
        text: "Task ini akan dihapus!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          tasks.splice(index, 1);
          localStorage.setItem("TodoList", JSON.stringify(tasks));
          loadTask();
          Swal.fire("Terhapus!", "Task berhasil dihapus.", "success");
        }
      });
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
  } else {
    Swal.fire({
      title: "Gagal!",
      text: "Tidak ada task/tugas pada list!!",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
});
