import { Node } from "./node";

export class BoxNode extends Node {
  width = 0;
  height = 0;

  constructor(node: HTMLElement) {
    super(node);

    this.width = Number(node.offsetWidth);
    this.height = Number(node.offsetHeight);
  }
}
