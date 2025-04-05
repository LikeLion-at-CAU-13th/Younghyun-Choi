import Button from "./Button.js";
import Div from "./Div.js";

class Complete {
  constructor(todoText) {
    this.row = new Div("", "row").node;

    this.innerText = new Div(todoText, "text-box");
    this.returnBtn = new Button("return-btn", "return");
    this.delBtn = new Button("del-btn", "delete");
  }
  addRow() {
    [this.innerText, this.returnBtn, this.delBtn].forEach((dom) => {
      this.row.appendChild(dom.node);
    });
    return this.row;
  }

  // 각 요소의 getter 메서드들
  getRow() {
    return this.row;
  }
  getReturnBtn() {
    return this.returnBtn.node;
  }
  getDelBtn() {
    return this.delBtn.node;
  }
  getInnerText() {
    return this.innerText.node;
  }
}

export default Complete;
