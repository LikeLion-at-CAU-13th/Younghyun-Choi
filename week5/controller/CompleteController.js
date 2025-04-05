import Todo from "../DOM/Todo.js";
import Complete from "../DOM/Complete.js";
import TodoController from "./TodoController.js";

class CompleteController {
  constructor(todoText) {
    this.completeTodo = new Complete(todoText);

    this.delBtnNode = this.completeTodo.getDelBtn();
    this.returnBtnNode = this.completeTodo.getReturnBtn();
    this.innerNode = this.completeTodo.getInnerText();

    // 복원 버튼을 눌렀을 때, returnTodo
    this.completeTodo
      .getReturnBtn()
      .addEventListener("click", () => this.returnTodo());

    // 삭제 버튼을 눌렀을 때
    this.completeTodo
      .getDelBtn()
      .addEventListener("click", () => this.delTodo());
  }

  addComplete() {
    const completeList = document.getElementById("complete-list");
    completeList.appendChild(this.completeTodo.addRow());
  }

  delTodo() {
    const completeList = document.getElementById("complete-list");
    completeList.removeChild(this.completeTodo.getRow());
  }

  returnTodo() {
    // Complete-list에 있던 건 삭제
    this.delTodo();

    // 다시 To-Do-List에 추가하기 위해

    const todoController = new TodoController(this.innerNode.innerText);
    todoController.addTodo();
  }
}

export default CompleteController;
