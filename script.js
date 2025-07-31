const addListBtn = document.getElementById("addListBtn");
const listNameInput = document.getElementById("listNameInput");
const taskList = document.getElementById("taskList");

const mainContainer = document.getElementById("mainContainer");
const editorContainer = document.getElementById("editorContainer");
const backBtn = document.getElementById("backBtn");
const editorTitle = document.getElementById("editorTitle");
const editorText = document.getElementById("editorText");
const saveBtn = document.getElementById("saveBtn");
const deleteBtn = document.getElementById("deleteBtn");

let lists = JSON.parse(localStorage.getItem("lists")) || {};
let currentList = null;

function renderLists() {
  taskList.innerHTML = "";
  for (let listName in lists) {
    const li = document.createElement("li");
    li.textContent = listName;
    li.classList.add("cursor-pointer", "hover:text-pink-500", "p-1");

    li.addEventListener("click", () => openEditor(listName));

    taskList.appendChild(li);
  }
}

function openEditor(listName) {
  currentList = listName;
  editorTitle.textContent = listName;
  editorText.value = lists[listName];
  mainContainer.classList.add("hidden");
  editorContainer.classList.remove("hidden");
}

function saveList() {
  if (currentList) {
    lists[currentList] = editorText.value;
    localStorage.setItem("lists", JSON.stringify(lists));
  }
}

addListBtn.addEventListener("click", () => {
  const name = listNameInput.value.trim();

  if (name.length === 0) {
    alert("Please enter a valid list name!");
    return;
  }

  if (lists[name]) {
    alert("This list already exists!");
    return;
  }

  lists[name] = "";
  localStorage.setItem("lists", JSON.stringify(lists));
  renderLists();
  listNameInput.value = "";
});

backBtn.addEventListener("click", () => {
  saveList();
  editorContainer.classList.add("hidden");
  mainContainer.classList.remove("hidden");
});

saveBtn.addEventListener("click", () => {
  saveList();
  alert("List saved successfully!");
});

function deleteCurrentList() {
  if (!currentList) {
    alert("No list selected!");
    return;
  }

  const confirmDelete = confirm("Are you sure you want to delete this list?");
  if (!confirmDelete) return;

  delete lists[currentList];
  localStorage.setItem("lists", JSON.stringify(lists));
  currentList = null;
  backBtn.click();
  renderLists();
}

deleteBtn.addEventListener("click", deleteCurrentList);

renderLists();
