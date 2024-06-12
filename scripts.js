

// So here, is all JavaScript


// This is conditional rendering of DOM
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.contains(document.getElementById('tasks-container'))) {
        fetchTasks();
    }
    if (document.getElementById('contact-form')) {
        document.getElementById('contact-form').addEventListener('submit', handleContactForm);
    }
});

function fetchTasks() {

    // Here, we use limit to show only 10 tasks from this API
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')

        .then(response => response.json())

        .then(data => {
            const tasksContainer = document.getElementById('tasks-container');
            tasksContainer.innerHTML = '';

            
            // Here, we used "forEach" loop to iterate over and fetch all the tasks..
            // Here, we can use also clutter which was learned before to show all data....
            
            // We used ternary operator for conditional rendering
            data.forEach(task => {
                tasksContainer.innerHTML += `

                    <div id="taskMade" class="task ${task.completed && 'completed' }">
                        <h3 class="taskTitle">${task.title}</h3>

                        <p class="taskStatus"><span class="taskStatusHead">Status:</span> ${task.completed ? 'Completed' : 'Pending'}</p>
                        <button id="deleteTask" onclick="deleteTask(${task.id})">Delete</button>
                        <button id="deleteTask" onclick="updateTask(${task.id})">Update</button>
                    </div>
                `;
            });

        }).catch((error) => { 
            console.error('Error fetching tasks:', error)
});

}

function addTask() {
    // It get the value of the task which is getting from the webpage
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;

    // This is kind of check, if user does not complete both tasks
    if (!title || !description) {
        alert('Please fill in both fields Title and Description.');
        return;
    }

    // If both tasks are completed it will save the task
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
        // It converts the into JSON String
        body: JSON.stringify(newTask)
    })
    .then(response => response.json())
    .then(task => {
        const tasksContainer = document.getElementById('tasks-container');
        tasksContainer.innerHTML += `
            <div id="taskMade" class="task ${task.completed && 'completed' }">
                <h3 class="taskTitle">${task.title}</h3>
                <p class="taskStatus"><span class="taskStatusHead">Status:</span> ${task.completed ? 'Completed' : 'Pending'}</p>
                <button id="deleteTask" onclick="deleteTask(${task.id})">Delete</button>
                <button id="deleteTask" onclick="updateTask(${task.id})">Update</button>
            </div>
        `;
        
        // Reset input fields after adding task
        document.getElementById('task-title').value = '';
        document.getElementById('task-desc').value = '';
    })
    .catch(error => console.error('Error adding task:', error));
}

function deleteTask(taskId) {
    
    // It will also deletes the task which was created before from API
    fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(() => {
        fetchTasks();
    })
    .catch((error) =>  {
        console.error('Error deleting task:', error)
});
}

function updateTask(taskId) {
    const updatedTask = {
        completed: true
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

function handleContactForm(event) {
    event.preventDefault();
    
    // It will gets the all inputs from the form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // If user forgot to fill any field it will show the error
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // Otherwise it will show success message

    console.log('Contact form submitted:', { name, email, message });
    alert('Message sent!');
    document.getElementById('contact-form').reset();
}


