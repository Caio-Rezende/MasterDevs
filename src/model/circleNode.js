import { Node } from "./node";

export class CircleNode extends Node {
  r = 0;

  constructor(node) {
    super(node);

    this.r = Math.ceil(node.offsetWidth / 2);
  }
}
