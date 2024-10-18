// Select elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const filter = document.getElementById('filter');

// Event listeners
document.addEventListener('DOMContentLoaded', loadTasks);
taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', manageTask);
filter.addEventListener('change', filterTasks);

// Add task
function addTask(e) {
  e.preventDefault();
  const taskText = taskInput.value;
  
  // Create task item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(taskText));

  // Add complete button
  const completeBtn = document.createElement('button');
  completeBtn.textContent = 'Complete';
  completeBtn.className = 'complete-btn';
  li.appendChild(completeBtn);

  // Add delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  li.appendChild(deleteBtn);

  // Append task to the list
  taskList.appendChild(li);

  // Store task in Local Storage
  storeTaskInLocalStorage(taskText);

  // Clear input
  taskInput.value = '';
}

// Store task in Local Storage
function storeTaskInLocalStorage(task) {
  let tasks = getTasksFromLocalStorage();
  tasks.push({ text: task, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from Local Storage
function getTasksFromLocalStorage() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  return tasks;
}

// Load tasks from Local Storage
function loadTasks() {
  let tasks = getTasksFromLocalStorage();
  tasks.forEach(function(task) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(task.text));

    if (task.completed) {
      li.classList.add('completed');
    }

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.className = 'complete-btn';
    li.appendChild(completeBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

// Manage task actions (complete or delete)
function manageTask(e) {
  if (e.target.classList.contains('complete-btn')) {
    e.target.parentElement.classList.toggle('completed');
    updateTaskInLocalStorage(e.target.parentElement.firstChild.textContent, 'complete');
  } else if (e.target.classList.contains('delete-btn')) {
    e.target.parentElement.remove();
    removeTaskFromLocalStorage(e.target.parentElement.firstChild.textContent);
  }
}

// Update task in Local Storage
function updateTaskInLocalStorage(taskText, action) {
  let tasks = getTasksFromLocalStorage();
  tasks.forEach(function(task, index) {
    if (task.text === taskText) {
      if (action === 'complete') {
        task.completed = !task.completed;
      }
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task from Local Storage
function removeTaskFromLocalStorage(taskText) {
  let tasks = getTasksFromLocalStorage();
  tasks.forEach(function(task, index) {
    if (task.text === taskText) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Filter tasks
function filterTasks(e) {
  const tasks = taskList.childNodes;
  tasks.forEach(function(task) {
    switch (e.target.value) {
      case 'all':
        task.style.display = 'flex';
        break;
      case 'completed':
        if (task.classList.contains('completed')) {
          task.style.display = 'flex';
        } else {
          task.style.display = 'none';
        }
        break;
      case 'incomplete':
        if (!task.classList.contains('completed')) {
          task.style.display = 'flex';
        } else {
          task.style.display = 'none';
        }
        break;
    }
  });
}
