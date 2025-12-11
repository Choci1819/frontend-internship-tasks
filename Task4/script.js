const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todoList");

// Load saved todos
let todos = JSON.parse(localStorage.getItem("todos")) || [];
renderTodos();

// Add todo
addBtn.addEventListener("click", () => {
    const task = input.value.trim();
    if (task === "") return;

    todos.push(task);
    saveTodos();
    renderTodos();
    input.value = "";
});

// Render list
function renderTodos() {
    list.innerHTML = "";
    todos.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${task}
            <button class="delete-btn" onclick="deleteTodo(${index})">🗑️</button>
        `;
        list.appendChild(li);
    });
}

// Delete todo
function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

// Save to localStorage (Persistence)
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
