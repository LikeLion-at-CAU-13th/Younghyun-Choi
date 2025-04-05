import Todo from "../DOM/Todo.js";
import Complete from "../DOM/Complete.js";
import CompleteController from "./CompleteController.js";

class TodoController {
  constructor(todoText) {
    this.newTodo = new Todo(todoText); // 새 객체 생성

    this.todoList = document.getElementById("to-do-list");

    this.delBtnNode = this.newTodo.getDelBtn();
    this.comBtnNode = this.newTodo.getCompleteBtn();
    this.innerNode = this.newTodo.getInnerText();

    this.delBtnNode.addEventListener("click", () => {
      this.delTodo();
    });
    this.comBtnNode.addEventListener("click", () => {
      this.doneTodo();
    });
  }

  addTodo() {
    this.todoList.appendChild(this.newTodo.addRow());

    const input = document.querySelector("input");
    input.value = "";
  }

  delTodo() {
    this.todoList.removeChild(this.newTodo.getRow());
  }

  doneTodo() {
    // To-Do-List에 있던 건 삭제
    this.delTodo();

    // Complete-list에 추가하기 위해
    const completeController = new CompleteController(this.innerNode.innerText);
    completeController.addComplete();
  }
}

export default TodoController;
