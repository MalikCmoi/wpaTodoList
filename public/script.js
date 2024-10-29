// Ouvrir la base de données IndexedDB
const dbRequest = indexedDB.open("TodoDatabase", 1);

dbRequest.onupgradeneeded = (event) => {
  const db = event.target.result;
  if (!db.objectStoreNames.contains("todos")) {
    db.createObjectStore("todos", { keyPath: "id", autoIncrement: true });
  }
};

dbRequest.onsuccess = (event) => {
  const db = event.target.result;

  // Charger les tâches depuis IndexedDB au chargement de la page
  loadTodos(db);
};

// Accéder au champ d'entrée
const input = document.querySelector('#todo-input');

// Écouter l'événement de clic sur le bouton "Ajouter"
document.querySelector('#submit').addEventListener('click', () => {
  const inputData = input.value.trim();
  if (!inputData) return; // Ne pas ajouter de tâches vides
  input.value = "";

  // Créer un nouvel objet todo
  const todoItem = { text: inputData };

  // Ajouter le todo à la base de données
  const db = dbRequest.result;
  const transaction = db.transaction("todos", "readwrite");
  const store = transaction.objectStore("todos");
  store.add(todoItem);

  // Afficher le nouvel item todo
  displayTodoItem(todoItem);
});

// Charger les tâches depuis IndexedDB
function loadTodos(db) {
  const transaction = db.transaction("todos", "readonly");
  const store = transaction.objectStore("todos");
  const getAllRequest = store.getAll();

  getAllRequest.onsuccess = (event) => {
    const todos = event.target.result;
    todos.forEach(displayTodoItem);
  };
}

// Afficher un item todo
function displayTodoItem(todoItem) {
  // Créer un élément todo
  const todo_el = document.createElement('div');
  todo_el.classList.add('todo-item');
  
  const todo_content_el = document.createElement('div');
  todo_el.appendChild(todo_content_el);
  
  const todo_input_el = document.createElement('input');
  todo_input_el.classList.add('text');
  todo_input_el.type = 'text';
  todo_input_el.value = todoItem.text;
  todo_input_el.setAttribute('readonly', 'readonly');
  
  todo_content_el.appendChild(todo_input_el);
  
  const todo_actions_el = document.createElement('div');
  todo_actions_el.classList.add('action-items');

  const todo_done_el = document.createElement('i');
  todo_done_el.classList.add('fa-solid', 'fa-check');

  const todo_edit_el = document.createElement('i');
  todo_edit_el.classList.add('fa-solid', 'fa-pen-to-square', 'edit');

  const todo_delete_el = document.createElement('i');
  todo_delete_el.classList.add('fa-solid', 'fa-trash');

  todo_actions_el.appendChild(todo_done_el);
  todo_actions_el.appendChild(todo_edit_el);
  todo_actions_el.appendChild(todo_delete_el);
  
  todo_el.appendChild(todo_actions_el);
  document.querySelector('.todo-lists').appendChild(todo_el);
  
  // Fonctionnalité de validation
  todo_done_el.addEventListener('click', () => {
    todo_input_el.classList.add('done');
    todo_el.removeChild(todo_actions_el);
  });

  // Fonctionnalité d'édition
  todo_edit_el.addEventListener('click', () => {
    if (todo_edit_el.classList.contains("edit")) {
      todo_edit_el.classList.remove("edit");
      todo_edit_el.classList.remove("fa-pen-to-square");
      todo_edit_el.classList.add("fa-x", "save");
      todo_input_el.removeAttribute("readonly");
      todo_input_el.focus();
    } else {
      todo_edit_el.classList.remove("save");
      todo_edit_el.classList.remove("fa-x");
      todo_edit_el.classList.add("fa-pen-to-square", "edit");
      todo_input_el.setAttribute("readonly", "readonly");

      // Mettre à jour le todo dans IndexedDB
      const db = dbRequest.result;
      const transaction = db.transaction("todos", "readwrite");
      const store = transaction.objectStore("todos");
      store.put({ id: todoItem.id, text: todo_input_el.value });
    }
  });

  // Fonctionnalité de suppression
  todo_delete_el.addEventListener('click', () => {
    document.querySelector('.todo-lists').removeChild(todo_el);

    // Supprimer le todo de la base de données
    const db = dbRequest.result;
    const transaction = db.transaction("todos", "readwrite");
    const store = transaction.objectStore("todos");
    store.delete(todoItem.id);
  });
}
