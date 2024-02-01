const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

let todos = []; // Lista för att lagra todos

app.use(bodyParser.json()); // För att tolka JSON-body
app.use(express.static('public')); 

// API-endpoint för att hämta todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// API-endpoint för att lägga till en todo
app.post('/add', (req, res) => {
  const { text, category } = req.body;
  if (text) {
    todos.push({ text, category, completed: false });
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'No todo provided.' });
  }
});

// API-endpoint för att ändra en todo
app.post('/toggle/:index', (req, res) => {
  const index = req.params.index;
  if (todos[index]) {
    todos[index].completed = !todos[index].completed;
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'Invalid index.' });
  }
});

// API-endpoint för att ta bort en todo
app.delete('/delete/:index', (req, res) => {
  const index = req.params.index;
  if (todos[index]) {
    todos.splice(index, 1);
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'Invalid index.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}, http://localhost:${PORT}`);
});