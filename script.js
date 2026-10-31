:root {
  --bg: #f4f7fb;
  --panel: rgba(255, 255, 255, 0.86);
  --panel-strong: #ffffff;
  --primary: #4f46e5;
  --primary-dark: #4338ca;
  --text: #172033;
  --muted: #64748b;
  --success: #16a34a;
  --danger: #ef4444;
  --border: rgba(148, 163, 184, 0.25);
  --shadow: 0 24px 60px -30px rgba(15, 23, 42, 0.45);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  font-family: Arial, Helvetica, sans-serif;
  background: linear-gradient(135deg, #eef2ff 0%, #f8fafc 40%, #e2e8f0 100%);
  color: var(--text);
}

button,
input {
  font: inherit;
}

.app-shell {
  width: min(92vw, 740px);
}

.todo-app {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 28px;
  box-shadow: var(--shadow);
  padding: 32px 24px;
  backdrop-filter: blur(12px);
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 28px;
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--primary);
  font-size: 0.72rem;
  font-weight: 700;
}

h1 {
  margin: 8px 0 0;
  font-size: clamp(2rem, 4vw, 2.8rem);
}

.stats-pill {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  padding: 10px 14px;
  border-radius: 18px;
  background: linear-gradient(135deg, #eef2ff, #dbeafe);
  color: var(--primary-dark);
  font-weight: 700;
}

.stats-pill span {
  font-size: 1.8rem;
  line-height: 1;
}

.stats-pill small {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.todo-form {
  display: flex;
  gap: 12px;
  margin-bottom: 18px;
}

.todo-form input {
  flex: 1;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.9);
  padding: 15px 16px;
  color: var(--text);
  outline: none;
  transition: 0.2s ease;
}

.todo-form input:focus {
  border-color: rgba(79, 70, 229, 0.55);
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
}

.todo-form button,
.secondary-btn,
.filter-btn,
.todo-item button {
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.todo-form button {
  background: linear-gradient(135deg, var(--primary), #6366f1);
  color: white;
  font-weight: 700;
  padding: 0 20px;
  min-width: 132px;
}

.todo-form button:hover,
.secondary-btn:hover,
.filter-btn:hover,
.todo-item button:hover {
  transform: translateY(-1px);
}

.toolbar {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-btn {
  background: rgba(148, 163, 184, 0.12);
  color: var(--muted);
  padding: 8px 12px;
  font-weight: 600;
}

.filter-btn.active {
  background: rgba(79, 70, 229, 0.12);
  color: var(--primary);
}

.secondary-btn {
  background: rgba(15, 23, 42, 0.04);
  color: var(--text);
  padding: 8px 12px;
  font-weight: 600;
}

.todo-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: var(--panel-strong);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 12px 14px;
}

.todo-main {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.todo-check {
  width: 22px;
  height: 22px;
  accent-color: var(--success);
  cursor: pointer;
}

.todo-text {
  overflow-wrap: anywhere;
  word-break: break-word;
  font-size: 1rem;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: var(--muted);
}

.todo-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.delete-btn {
  background: rgba(239, 68, 68, 0.12);
  color: var(--danger);
  padding: 8px 10px;
  font-weight: 700;
}

.empty-state {
  border: 1px dashed rgba(148, 163, 184, 0.7);
  background: rgba(148, 163, 184, 0.04);
  border-radius: 16px;
  padding: 24px 18px;
  color: var(--muted);
  text-align: center;
}

@media (max-width: 560px) {
  .todo-app {
    padding: 24px 16px;
  }

  .app-header,
  .toolbar,
  .todo-form,
  .todo-item {
    flex-direction: column;
    align-items: stretch;
  }

  .todo-form button,
  .secondary-btn,
  .filter-btn {
    width: 100%;
  }

  .todo-actions {
    justify-content: flex-end;
  }
}
