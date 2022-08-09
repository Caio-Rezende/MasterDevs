import { Dimension } from "./dimension";
import { Node } from "./node";
import { Position } from "./position";

export class BoxNode extends Node {
  constructor(node: HTMLElement) {
    super(node);
  }

  get width() {
    return Number(this.domNode.offsetWidth);
  }
  get height() {
    return Number(this.domNode.offsetHeight);
  }
}

export class AbsctractNode extends BoxNode {
  position: Position;
  dimension: Dimension;

  constructor(node: HTMLElement, position: Position, dimension: Dimension) {
    super(node);
    this.position = position;
    this.dimension = dimension;
  }

  get posX() {
    return this.position.x;
  }
  get posY() {
    return this.position.y;
  }

  get width() {
    return this.dimension.width;
  }
  get height() {
    return this.dimension.height;
  }
}
