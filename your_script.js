const form = document.querySelector(".row.row-cols-lg-auto.g-3.justify-content-center.align-items-center.mb-4.pb-2");
const input = document.querySelector("#form1");
let tasksList = [];

const saveButton = document.querySelector(".save");
const getTasksButton = document.querySelector(".get-tasks");

const taskListContainer = document.querySelector("#task-list");

// Function to add a new task
function addTask(title) {
    const task = {
        title,
        isDone: false
    };
    tasksList.push(task);
    updateTable();
}

/*

//Content to be updated 

// Function to update the table with tasks
function updateTable() {
    taskListContainer.innerHTML = ""; // Clear the current list

    tasksList.forEach((task, index) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${task.title}</td>
            <td>${task.isDone ? "Finished" : "In progress"}</td>
            <td>
                <button type="button" class="btn btn-danger delete">Delete</button>
                <button type="button" class="btn btn-success ms-1 finished">Finished</button>
            </td>
        `;

        // Add event listeners to the buttons for this row
        const deleteButton = newRow.querySelector(".delete");
        const finishedButton = newRow.querySelector(".finished");

        deleteButton.addEventListener("click", () => deleteTask(index));
        finishedButton.addEventListener("click", () => toggleFinished(index));

        taskListContainer.appendChild(newRow);
    });
}  

//Content to be updated

*/

// ... (previous code)

// Function to update the table with tasks
function updateTable() {
    taskListContainer.innerHTML = ""; // Clear the current list

    tasksList.forEach((task, index) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td ${task.isDone ? 'class="completed-task"' : ''}>${task.title}</td>
            <td>${task.isDone ? "Finished" : "In progress"}</td>
            <td>
                <button type="button" class="btn delete-button delete">Delete</button>
                <button type="button" class="btn finished-button ms-1 finished">Finished</button>
            </td>
        `;

        // Add event listeners to the buttons for this row
        const deleteButton = newRow.querySelector(".delete");
        const finishedButton = newRow.querySelector(".finished");

        deleteButton.addEventListener("click", () => deleteTask(index));
        finishedButton.addEventListener("click", () => toggleFinished(index));

        taskListContainer.appendChild(newRow);
    });
}

// ... (rest of the code)


// Function to delete a task
function deleteTask(index) {
    if (index >= 0 && index < tasksList.length) {
        tasksList.splice(index, 1);
        updateTable();
    }
}

// Function to mark/unmark a task as finished
function toggleFinished(index) {
    if (index >= 0 && index < tasksList.length) {
        tasksList[index].isDone = !tasksList[index].isDone;
        updateTable();
    }
}


// Event listener for the "Save" button
saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    const taskTitle = input.value.trim();
    if (taskTitle !== "") {
        addTask(taskTitle);
        saveTasksToLocalStorage(); // Save tasks to local storage
        input.value = "";
    }
}); 



// Event listener for the "Get tasks" button
getTasksButton.addEventListener("click", (e) => {
    e.preventDefault();
    updateTable();
});


// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasksList));
}

// Function to retrieve tasks from local storage
function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasksList = JSON.parse(storedTasks); // Reassign the 'tasksList' variable here
    }
}

/*
// Event listener for the "Save" button
saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    const taskTitle = input.value.trim();
    if (taskTitle !== "") {
        addTask(taskTitle);
        saveTasksToLocalStorage(); // Save tasks to local storage
        input.value = "";
    }
}); */

// Event listener for the "Get tasks" button
getTasksButton.addEventListener("click", (e) => {
    e.preventDefault();
    loadTasksFromLocalStorage(); // Load tasks from local storage
    updateTable();
});

// Initial loading of tasks from local storage
loadTasksFromLocalStorage();
updateTable();
