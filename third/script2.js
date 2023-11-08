document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const inputField = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    loadTodos();

    todoForm.onsubmit = function(event) {
        event.preventDefault();
        const task = inputField.value.trim();
        if (task === '') {
            alert('Please enter a task!');
            return;
        }
        addTask(task);
        inputField.value = '';
        saveTodos();
    };

    function addTask(taskText, completed = false) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex align-items-center'; // Removed 'justify-content-between' for better control over spacing

        // Checkbox creation code with an additional class for size
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input me-1'; // Bootstrap class for right margin
        checkbox.checked = completed;
        checkbox.onchange = function() {
            textInput.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
            textInput.readOnly = !checkbox.checked; // Enable editing when not checked
            saveTodos();
        };

        // Input field for the task text
        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.className = 'form-control';
        textInput.value = taskText;
        textInput.readOnly = true;
        textInput.style.textDecoration = completed ? 'line-through' : 'none';
        textInput.onchange = function() {
            saveTodos();
        };

        // Edit button creation code with updated classes for spacing
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'btn btn-secondary btn-sm btn-edit'; // Added 'btn-edit' class for margin control
        editButton.onclick = function() {
            textInput.readOnly = !textInput.readOnly;
            if (!textInput.readOnly) {
                textInput.focus();
            } else {
                saveTodos();
            }
        };

        // Delete button creation code with updated classes for spacing
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm btn-delete'; // Added 'btn-delete' class for margin control
        deleteButton.onclick = function() {
            todoList.removeChild(listItem);
            saveTodos();
        };

        // Append the elements to the list item
        listItem.appendChild(checkbox);
        listItem.appendChild(textInput);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        // Append the list item to the todo list
        todoList.appendChild(listItem);
    }

    function saveTodos() {
        // ... existing saveTodos function code ...
    }

    function loadTodos() {
        // ... existing loadTodos function code ...
    }
});
