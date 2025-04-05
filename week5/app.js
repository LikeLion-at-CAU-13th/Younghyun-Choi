import TodoController from "./controller/TodoController.js";
import CompleteController from "./controller/CompleteController.js";

const addBtn = document.getElementById("input-button");
const input = document.querySelector("input");

const todoList = document.getElementById("to-do-list");
const allCompleteBtn = document.getElementById("all-complete-button");
const allDeleteBtn = document.getElementById("all-delete-button");

addBtn.addEventListener("click", () => {
  const todoController = new TodoController(input.value);
  todoController.addTodo();
});

allCompleteBtn.addEventListener("click", () => {
  allDoneTodo();
});

allDeleteBtn.addEventListener("click", () => {
  allDelTodo();
});

function allDoneTodo() {
  const todoRows = todoList.querySelectorAll(".row"); // to-do-list 안에 있는 row div들 싹 다 가져오기
  todoRows.forEach((row) => {
    // row 단위로 반복문
    const textNode = row.querySelector(".text-box"); // row 안에 있는 text-box 클래스의 div 찾기
    const completeController = new CompleteController(textNode.innerText);
    completeController.addComplete();

    todoList.removeChild(row);
  });
}

function allDelTodo() {
  const todoRows = todoList.querySelectorAll(".row"); // to-do-list 안에 있는 row div들 싹 다 가져오기
  todoRows.forEach((row) => {
    todoList.removeChild(row);
  });
}
