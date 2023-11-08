document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('form2'); // input for new tasks
  const addButton = document.querySelector('button'); // first (and only) button
  const allTasksList = document.querySelector('#ex1-tabs-1 ul'); // ul for all tasks

  // Load tasks from local storage and display them
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTaskToList(task.text, task.completed));

  // Function to add task to the list and to local storage
  function addTask(text, completed = false) {
    tasks.push({ text, completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    addTaskToList(text, completed);
  }

  // Function to create and append the task item to the list
  function addTaskToList(text, completed) {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
      <input class="form-check-input me-1" type="checkbox" ${completed ? 'checked' : ''}>
      ${text}
    `;
    allTasksList.appendChild(li);
  }

  // Event listener for the Add button
  addButton.addEventListener('click', (event) => {
    event.preventDefault(); // prevent the form from submitting
    if (taskInput.value.trim() !== '') {
      addTask(taskInput.value.trim());
      taskInput.value = ''; // clear the input
    }
  });

  // Event delegation for checkboxes to handle task completion
  allTasksList.addEventListener('change', (event) => {
    if (event.target.type === 'checkbox') {
      const li = event.target.closest('li');
      const text = li.textContent.trim();
      const task = tasks.find(task => task.text === text);
      task.completed = event.target.checked;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });
});
