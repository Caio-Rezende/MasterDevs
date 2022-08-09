import { Node } from "./node";

export class CircleNode extends Node {
  radius = 0;

  constructor(node: HTMLElement) {
    super(node);

    this.radius = Math.ceil(node.offsetWidth / 2);
  }
}
