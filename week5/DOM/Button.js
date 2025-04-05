import DOM from "./DOM.js";
import { ICON_PATH } from "../ICON_PATH.js";

class Button extends DOM {
  constructor(className, iconName) {
    super("button", "", className);

    if (iconName) {
      const icon = new Image(); // <img> 태그 메모리에만 생성
      icon.src = ICON_PATH[iconName]; // 메모리에 생성
      icon.className = "icon";
      this.node.appendChild(icon); // HTML에 추가
    }
  }
}

export default Button;
