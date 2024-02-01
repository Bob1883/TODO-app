document.addEventListener('DOMContentLoaded', fetchTodos);

// Hämta alla todos från servern och skriv ut dem i listan
function fetchTodos() {
  fetch('/todos')
    .then(response => response.json())
    .then(data => {
      const list = document.getElementById('todoList');
      list.innerHTML = ''; // Rensa listan först
      data.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
          ${todo.text} - <em>${todo.category}</em>
          <span>
            <button class="btn btn-sm btn-success" onclick="toggleComplete(${index})">✓</button>
            <button class="btn btn-sm btn-danger" onclick="deleteTodo(${index})">✗</button>
          </span>`;
        if(todo.completed) {
          li.classList.add('list-group-item-success');
        }
        list.appendChild(li);
      });
    });
}

// Lägg till en ny todo
function addTodo() {
  const newTodo = document.getElementById('newTodo').value;
  const category = document.getElementById('category').value;
  fetch('/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: newTodo, category: category }),
  })
  .then(response => response.json())
  .then(data => {
    fetchTodos(); // Uppdatera listan
    document.getElementById('newTodo').value = ''; // Rensa input-fältet
  });
}

// Ändra en todo till färdig eller ej färdig
function toggleComplete(index) {
  fetch(`/toggle/${index}`, { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      fetchTodos(); // Uppdatera listan
    });
}

// Ta bort en todo
function deleteTodo(index) {
  fetch(`/delete/${index}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(data => {
      fetchTodos(); // Uppdatera listan
    });
}

