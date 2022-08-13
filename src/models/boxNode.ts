import { Dimension } from "./dimension";
import { Node } from "./node";
import { Position } from "./position";

export class BoxNode extends Node {
  public parent?: BoxNode;
  constructor(node: HTMLElement) {
    super(node);
    this.parent = node.parentElement
      ? new BoxNode(node.parentElement)
      : undefined;
  }

  get posX(): number {
    return this.domNode.offsetLeft;
  }
  get posY(): number {
    return this.domNode.offsetTop;
  }
  get width(): number {
    return this.domNode.offsetWidth;
  }
  get height(): number {
    return this.domNode.offsetHeight;
  }
  get dimension(): Dimension {
    return new Dimension({
      width: this.width,
      height: this.height,
    });
  }
}

export class AbstractNode extends BoxNode {
  _position: Position;
  _dimension: Dimension;

  constructor(node: HTMLElement, position: Position, dimension: Dimension) {
    super(node);
    this._position = position;
    this._dimension = dimension;
  }
  get posX(): number {
    return this.position.x;
  }
  get posY(): number {
    return this.position.y;
  }
  get width(): number {
    return this.dimension.width;
  }
  get height(): number {
    return this.dimension.height;
  }
  get dimension() {
    return this._dimension;
  }
  get position() {
    return this._position;
  }
}
