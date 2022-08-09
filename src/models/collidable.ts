import { BoxNode } from "./boxNode";
import { CircleNode } from "./circleNode";

export class CollidableCircleNode extends CircleNode {
  whenCollideStartFn: () => void = () => {};
  whenCollideStopFn: () => void = () => {};
  haveCollided = false;

  constructor(node: HTMLElement) {
    super(node);
  }
}

export class CollidableBoxNode extends BoxNode {
  whenCollideFn: () => void = () => {};
  stopCollidingFn: () => void = () => {};
  haveCollided = false;

  constructor(node: HTMLElement) {
    super(node);
  }
}
