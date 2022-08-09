import { InputListener, Move2D } from "../controllers";
import { BoxNode } from "../models";
import { hypotenuse } from "../utlis";

export class ApplyShadow extends InputListener {
  shadowElements: BoxNode[] = [];

  constructor(shadowElements: NodeListOf<HTMLElement>) {
    super();
    shadowElements.forEach((domNode) =>
      this.shadowElements.push(new BoxNode(domNode))
    );
  }

  doMotion(moveBy: Move2D): void {
    const fn = this.cursorMoveShadow(moveBy.x, moveBy.y);

    this.shadowElements.forEach(fn);
  }

  cursorMoveShadow(cursorX: number, cursorY: number) {
    return (node: BoxNode) => {
      const x = Math.floor(node.posX - cursorX);
      const y = Math.floor(node.posY - cursorY);

      const blurTextShadow = Math.ceil(Math.pow(hypotenuse(x, y), 1 / 2));

      node.style.textShadow = `${x}px ${y}px ${blurTextShadow}px`;
    };
  }
}
