document.addEventListener('DOMContentLoaded', function() {
    loadTodos();

    // Add task event listener
    document.getElementById('button-addon2').addEventListener('click', addTask);
});

function addTask() {
    const inputField = document.getElementById('todo-input');
    const taskText = inputField.value.trim();

    if (taskText === '') return;

    const todoList = document.getElementById('todo-list');

    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';

    // Task text
    const textSpan = document.createElement('span');
    textSpan.textContent = taskText;
    listItem.appendChild(textSpan);

    // Edit icon
    const editIcon = document.createElement('i');
    editIcon.className = 'fas fa-pencil-alt';
    editIcon.onclick = function() {
        const newText = prompt('Edit your task', textSpan.textContent);
        if (newText && newText.trim() !== '') {
            textSpan.textContent = newText;
            saveTodos();
        }
    };
    listItem.appendChild(editIcon);

    // Delete icon
    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-times';
    deleteIcon.onclick = function() {
        listItem.remove();
        updateTaskCounter();
        saveTodos();
    };
    listItem.appendChild(deleteIcon);

    // Append to the list
    todoList.appendChild(listItem);

    // Clear input field
    inputField.value = '';

    updateTaskCounter();
    saveTodos();
}

function saveTodos() {
    const todos = [];
    document.querySelectorAll('#todo-list li span').forEach(function(taskSpan) {
        todos.push(taskSpan.textContent);
    });
    localStorage.setItem('todos', JSON.stringify(todos));
    updateTaskCounter();
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(function(taskText) {
        const inputField = document.getElementById('todo-input');
        inputField.value = taskText; // Set the value to add as a task
        addTask(); // Add the task
    });
}

function updateTaskCounter() {
    const totalTasks = document.querySelectorAll('#todo-list li').length;
    document.getElementById('task-total').textContent = totalTasks;
    const completedTasks = document.querySelectorAll('#todo-list li .fa-check').length;
    document.getElementById('task-counter').textContent = completedTasks;
}
