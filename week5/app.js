import TodoController from "./controller/TodoController.js";
import Todo from "./DOM/Todo.js";

const addBtn = document.getElementById("input-button");
const input = document.querySelector("input");

addBtn.addEventListener("click", () => {
  const todoController = new TodoController(input.value);
  todoController.addTodo();
});
