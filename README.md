const STORAGE_KEY = 'todo-list-app-items';
const FILTERS = {
  all: () => true,
  active: (item) => !item.completed,
  completed: (item) => item.completed,
};

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const taskCount = document.getElementById('task-count');
const clearCompletedBtn = document.getElementById('clear-completed');
const filterButtons = document.querySelectorAll('.filter-btn');

let todos = loadTodos();
let currentFilter = 'all';

function loadTodos() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to load todos:', error);
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function render() {
  const visibleTodos = todos.filter(FILTERS[currentFilter] || FILTERS.all);

  if (visibleTodos.length === 0) {
    todoList.innerHTML = '<li class="empty-state">No tasks here yet. Add one to get started.</li>';
  } else {
    todoList.innerHTML = visibleTodos
      .map(
        (todo) => `
          <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
            <div class="todo-main">
              <input
                class="todo-check"
                type="checkbox"
                data-action="toggle"
                ${todo.completed ? 'checked' : ''}
                aria-label="Toggle task: ${todo.text}"
              />
              <span class="todo-text">${escapeHtml(todo.text)}</span>
            </div>
            <div class="todo-actions">
              <button class="delete-btn" type="button" data-action="delete">Delete</button>
            </div>
          </li>
        `
      )
      .join('');
  }

  const activeCount = todos.filter((todo) => !todo.completed).length;
  taskCount.textContent = String(activeCount);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function addTodo(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  todos.unshift({
    id: crypto.randomUUID(),
    text: trimmed,
    completed: false,
    createdAt: new Date().toISOString(),
  });

  saveTodos();
  render();
}

function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  saveTodos();
  render();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  render();
}

function clearCompleted() {
  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  render();
}

function setFilter(filter) {
  currentFilter = filter;
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle('active', isActive);
  });
  render();
}

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = todoInput.value;
  addTodo(value);
  todoInput.value = '';
  todoInput.focus();
});

todoList.addEventListener('click', (event) => {
  const actionButton = event.target.closest('[data-action]');
  if (!actionButton) return;

  const item = actionButton.closest('.todo-item');
  if (!item) return;

  const todoId = item.dataset.id;
  const action = actionButton.dataset.action;

  if (action === 'delete') {
    deleteTodo(todoId);
  }
});

todoList.addEventListener('change', (event) => {
  if (event.target.matches('.todo-check')) {
    const item = event.target.closest('.todo-item');
    if (!item) return;
    toggleTodo(item.dataset.id);
  }
});

clearCompletedBtn.addEventListener('click', clearCompleted);
filterButtons.forEach((button) => {
  button.addEventListener('click', () => setFilter(button.dataset.filter));
});

render();
