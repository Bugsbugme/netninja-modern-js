const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");

/**
 * It takes a todo item as an argument, and then creates a new list item with the todo item as the text
 * content, and then appends that list item to the list.
 * @param todo - the todo item
 */
const generateTemplate = (todo) => {
  const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${todo}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>
  `;
  list.innerHTML += html;
};

// add todos
/* Listening for a submit event on the form, and then it is preventing the default behavior of the
form, which is to reload the page. Then it is getting the value of the input, and then it is
checking if the value is not empty. If it is not empty, then it is calling the generateTemplate
function with the value of the input as the argument. Then it is resetting the form. */
addForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const todo = addForm.add.value.trim();

  if (todo.length) {
    generateTemplate(todo);
    addForm.reset();
  }
});

// delete todos
/* Listening for a click event on the list, and then it is checking if the target of the
click event has a class of delete. If it does, then it is removing the parent element of the target. */
list.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    event.target.parentElement.remove();
  }
});

/**
 * It takes a term, and returns an array of todos that don't include that term.
 * @param term - The search term
 */
const filterTodos = (term) => {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("filtered"));

  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

/* Listening for a keyup event on the search input, and then it is getting the value of the search
input, and then it is trimming the value, and then it is calling the filterTodos function with the
trimmed value as the argument. */
search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});
