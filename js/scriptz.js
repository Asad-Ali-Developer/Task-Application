// JavaScript Code

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('tasks-container')) {
        fetchTasks();
    }
    if (document.getElementById('contact-form')) {
        document.getElementById('contact-form').addEventListener('submit', handleContactForm);
    }
});

function fetchTasks() {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
        .then(response => response.json())
        .then(data => {
            const tasksContainer = document.getElementById('tasks-container');
            tasksContainer.innerHTML = '';

            data.forEach(task => {
                tasksContainer.innerHTML += `
                    <div class="task ${task.completed ? 'completed' : ''}">
                        <h3 class="taskTitle">${task.title}</h3>
                        <p class="taskStatus"><span class="taskStatusHead">Status:</span> ${task.completed ? 'Completed' : 'Pending'}</p>
                        <button class="deleteTaskBtn" onclick="deleteTask(${task.id})">Delete</button>
                        <button class="updateTaskBtn" onclick="updateTask(${task.id}, ${task.completed})">Update</button>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

function addTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;

    if (!title || !description) {
        alert('Please fill in both fields Title and Description.');
        return;
    }

    const newTask = {
        title,
        description,
        completed: false
    };

    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
    })
    .then(response => response.json())
    .then(task => {
        fetchTasks();
        document.getElementById('task-title').value = '';
        document.getElementById('task-desc').value = '';
    })
    .catch(error => console.error('Error adding task:', error));
}

function deleteTask(taskId) {
    let detBtn = document.querySelector('#deleteTask')
    fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(() => {
        fetchTasks();
    })
    .catch(error => console.error('Error deleting task:', error));
}

function updateTask(taskId, completed) {
    const updatedTask = {
        completed: !completed
    };

    fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
    })
    .then(() => {
        fetchTasks();
    })
    .catch(error => console.error('Error updating task:', error));
}

 // Edit task
 window.editTask = (id) => {
    const task = tasks.find(task => task.id === id);
    const newTitle = prompt('Edit Task Title:', task.title);
    const newDesc = prompt('Edit Task Description:', task.description);
    if (newTitle !== null && newDesc !== null) {
      task.title = newTitle;
      task.description = newDesc;
      fetchTasks();
    }1
  };

function handleContactForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    console.log('Contact form submitted:', { name, email, message });
    alert('Message sent!');
    document.getElementById('contact-form').reset();
}


searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredTasks = tasks.filter(task => {
      return task.title.toLowerCase().includes(searchString) ||
             task.description.toLowerCase().includes(searchString);
    });
    renderTasks(filteredTasks);
  });