import { Dimension } from "./dimension";
import { Node } from "./node";
import { Position } from "./position";

export class CircleNode extends Node {
  get dimension(): Dimension {
    return new Dimension({
      height: this.radius * 2,
      width: this.radius * 2,
    });
  }
  radius = 0;

  constructor(node: HTMLElement) {
    super(node);

    this.radius = Math.ceil(node.offsetWidth / 2);
  }
}
