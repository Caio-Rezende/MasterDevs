import { BoxNode } from "./boxNode";
import { CircleNode } from "./circleNode";

export class CollidableCircleNode extends CircleNode {
  whenCollideFn: () => void = () => {};
  haveCollided = false;

  constructor(node: HTMLElement) {
    super(node);
  }
}

export class CollidableBoxNode extends BoxNode {
  whenCollideFn: () => void = () => {};
  haveCollided = false;

  constructor(node: HTMLElement) {
    super(node);
  }
}
