import { Dimension } from "./dimension";
import { Position } from "./position";

export abstract class Node {
  style: CSSStyleDeclaration;

  abstract get dimension(): Dimension;

  get posX() {
    return this.domNode.offsetLeft;
  }
  get posY() {
    return this.domNode.offsetTop;
  }

  get position(): Position {
    return new Position({
      x: this.posX,
      y: this.posY,
    });
  }

  constructor(public domNode: HTMLElement) {
    this.style = domNode.style;
  }
}
