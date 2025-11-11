const API_URL = 'http://localhost:3000/api';

let currentFilter = 'all';
let currentSort = 'date';
let tasks = [];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    setupEventListeners();
});

function setupEventListeners() {
    // Add task form
    document.getElementById('addTaskForm').addEventListener('submit', handleAddTask);
    
    // Filter buttons
    document.querySelectorAll('.btn-filter').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            filterAndRenderTasks();
        });
    });
    
    // Search
    document.getElementById('searchBtn').addEventListener('click', handleSearch);
    document.getElementById('searchInput').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Sort
    document.getElementById('sortSelect').addEventListener('change', (e) => {
        currentSort = e.target.value;
        filterAndRenderTasks();
    });
    
    // Modal
    document.querySelector('.close').addEventListener('click', closeEditModal);
    document.getElementById('editTaskForm').addEventListener('submit', handleEditTask);
    
    // BUG: Event listener on wrong element
    window.addEventListener('click', (e) => {
        if (e.target.id === 'editModal') {
            closeEditModal();
        }
    });
}

// Load tasks from API
async function loadTasks() {
    try {
        const response = await fetch(`${API_URL}/tasks`);
        tasks = await response.json();
        filterAndRenderTasks();
        updateStats();
    } catch (error) {
        // BUG: Poor error handling - just logs, doesn't inform user
        console.error('Error loading tasks:', error);
    }
}

// Add new task
async function handleAddTask(e) {
    e.preventDefault();
    
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const priority = document.getElementById('taskPriority').value;
    
    // BUG: No client-side validation before sending to server
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, priority })
        });
        
        const newTask = await response.json();
        tasks.push(newTask);
        
        // BUG: Form reset is missing
        // document.getElementById('addTaskForm').reset();
        
        filterAndRenderTasks();
        updateStats();
        
        // BUG: Success message is misspelled
        showNotificaton('Task added successfully!', 'success');
    } catch (error) {
        showNotification('Error adding task', 'error');
    }
}

// Handle search
async function handleSearch() {
    const query = document.getElementById('searchInput').value.trim();
    
    if (!query) {
        loadTasks();
        return;
    }
    
    try {
        // BUG: Wrong API endpoint - should be /api/search?q= not /api/tasks/search/
        const response = await fetch(`${API_URL}/tasks/search/${query}`);
        tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        showNotification('Error searching tasks', 'error');
    }
}

// Filter and render tasks
function filterAndRenderTasks() {
    let filtered = [...tasks];
    
    // Apply filter
    if (currentFilter === 'completed') {
        filtered = filtered.filter(task => task.completed);
    } else if (currentFilter === 'active') {
        filtered = filtered.filter(task => !task.completed);
    }
    
    // Apply sort
    // BUG: Sort logic is inverted for date
    if (currentSort === 'date') {
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (currentSort === 'priority') {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (currentSort === 'title') {
        // BUG: Case-sensitive sort
        filtered.sort((a, b) => a.title > b.title ? 1 : -1);
    }
    
    renderTasks(filtered);
}

// Render tasks to DOM
function renderTasks(tasksToRender) {
    const taskList = document.getElementById('taskList');
    
    if (tasksToRender.length === 0) {
        taskList.innerHTML = '<p class="loading">No tasks found</p>';
        return;
    }
    
    taskList.innerHTML = tasksToRender.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <div class="task-header">
                <h3 class="task-title">${task.title}</h3>
                <span class="task-priority priority-${task.priority}">${task.priority}</span>
            </div>
            <p class="task-description">${task.description || 'No description'}</p>
            <div class="task-meta">
                <span>Created: ${formatDate(task.createdAt)}</span>
                <div class="task-actions">
                    <button class="btn btn-small btn-success" onclick="toggleTask(${task.id})">
                        ${task.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button class="btn btn-small" onclick="editTask(${task.id})">Edit</button>
                    <button class="btn btn-small btn-danger" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Toggle task completion
async function toggleTask(id) {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}/toggle`, {
            method: 'PATCH'
        });
        
        const updatedTask = await response.json();
        
        // BUG: Doesn't wait for response before updating UI
        const taskIndex = tasks.findIndex(t => t.id === id);
        if (taskIndex !== -1) {
            tasks[taskIndex] = updatedTask;
        }
        
        filterAndRenderTasks();
        updateStats();
    } catch (error) {
        showNotification('Error updating task', 'error');
    }
}

// Edit task
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    
    if (!task) return;
    
    document.getElementById('editTaskId').value = task.id;
    document.getElementById('editTaskTitle').value = task.title;
    document.getElementById('editTaskDescription').value = task.description;
    document.getElementById('editTaskPriority').value = task.priority;
    
    document.getElementById('editModal').style.display = 'block';
}

// Handle edit task submit
async function handleEditTask(e) {
    e.preventDefault();
    
    const id = parseInt(document.getElementById('editTaskId').value);
    const title = document.getElementById('editTaskTitle').value;
    const description = document.getElementById('editTaskDescription').value;
    const priority = document.getElementById('editTaskPriority').value;
    
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, priority })
        });
        
        const updatedTask = await response.json();
        
        const taskIndex = tasks.findIndex(t => t.id === id);
        if (taskIndex !== -1) {
            tasks[taskIndex] = updatedTask;
        }
        
        closeEditModal();
        filterAndRenderTasks();
        showNotification('Task updated successfully!', 'success');
    } catch (error) {
        showNotification('Error updating task', 'error');
    }
}

// Delete task
async function deleteTask(id) {
    // BUG: No confirmation dialog
    
    try {
        await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE'
        });
        
        // BUG: Removes from local array even though server doesn't delete it
        tasks = tasks.filter(t => t.id !== id);
        
        filterAndRenderTasks();
        updateStats();
        showNotification('Task deleted successfully!', 'success');
    } catch (error) {
        showNotification('Error deleting task', 'error');
    }
}

// Update statistics
async function updateStats() {
    try {
        const response = await fetch(`${API_URL}/stats`);
        const stats = await response.json();
        
        document.getElementById('totalTasks').textContent = stats.total;
        document.getElementById('activeTasks').textContent = stats.active;
        document.getElementById('completedTasks').textContent = stats.completed;
        document.getElementById('completionRate').textContent = stats.completionRate;
    } catch (error) {
        console.error('Error updating stats:', error);
    }
}

// Close edit modal
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

// Utility: Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    // BUG: Date formatting doesn't handle invalid dates
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

// Show notification
function showNotification(message, type) {
    // BUG: Function name typo in one place
    // BUG: Notification system not implemented - just alerts
    alert(message);
}

// BUG: Typo in function name
function showNotificaton(message, type) {
    alert(message);
}

// BUG: Memory leak - tasks array keeps growing
// No cleanup mechanism when switching filters
