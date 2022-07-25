import { BoxNode } from "../model";
import { hipotenuse } from "../utlis";

export class ApplyShadow {
  shadowElements: BoxNode[] = [];

  constructor(shadowElements: NodeListOf<HTMLElement>) {
    shadowElements.forEach((domNode) =>
      this.shadowElements.push(new BoxNode(domNode))
    );

    window.addEventListener("mousemove", this.listener);

    window.addEventListener("unload", () => {
      window.removeEventListener("mousemove", this.listener);
    });
  }

  listener = (ev: MouseEvent) => {
    const fn = this.cursorMoveShadow(ev.x, ev.y);

    this.shadowElements.forEach(fn);
  };

  cursorMoveShadow(cursorX: number, cursorY: number) {
    return (node: BoxNode) => {
      const x = Math.floor(node.posX - cursorX);
      const y = Math.floor(node.posY - cursorY);

      const blurTextShadow = Math.ceil(Math.pow(hipotenuse(x, y), 1 / 2));

      node.style.textShadow = `${x}px ${y}px ${blurTextShadow}px`;
    };
  }
}
