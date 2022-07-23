import { BoxNode } from "./boxNode";
import { CircleNode } from "./circleNode";

export class CollidableCircleNode extends CircleNode {
  whenCollideFn = null;
  haveCollided = false;

  constructor(node) {
    super(node);
  }
}

export class CollidableBoxNode extends BoxNode {
  whenCollideFn = null;
  haveCollided = false;

  constructor(node) {
    super(node);
  }
}
