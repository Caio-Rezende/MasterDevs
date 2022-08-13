import { Move2D } from "../controllers";
import { AbstractNode, BoxNode, CircleNode, Position } from "../models";
import { collided } from "../utlis";

interface TopLeft {
  left: number;
  top: number;
}

export class RandomPlacement {
  el: CircleNode;
  avoid: BoxNode[] = [];

  constructor(
    domElement: HTMLElement,
    avoidElements: NodeListOf<HTMLElement>,
    moveBy?: Move2D
  ) {
    this.el = new CircleNode(domElement);
    avoidElements.forEach((domNode) => this.avoid.push(new BoxNode(domNode)));

    let top = 0;
    let left = 0;
    try {
      const limit = this.getInLimit(moveBy);
      top = limit.top;
      left = limit.left;
    } catch (e) {}

    this.el.style.left = `${left}px`;
    this.el.style.top = `${top}px`;
  }

  protected getInLimit(moveBy?: Move2D): TopLeft {
    const limitLeft = window.innerWidth - 2 * this.el.radius;
    const limitTop = window.innerHeight - 2 * this.el.radius;

    return this.generateRandom(limitLeft, limitTop, moveBy);
  }

  protected generateRandom(
    limitLeft: number,
    limitTop: number,
    moveBy?: Move2D
  ): TopLeft {
    const pos = new Position({
      x: Math.ceil(limitLeft * Math.random()) + (moveBy?.x ?? 0),
      y: Math.ceil(limitTop * Math.random()) + (moveBy?.y ?? 0),
    });

    let hasCollided = false;

    const abstractNode = new AbstractNode(
      this.el.domNode,
      pos,
      this.el.dimension
    );
    this.avoid.forEach(
      (item) => (hasCollided ||= collided(abstractNode, item))
    );

    if (!hasCollided) {
      return {
        left: pos.x,
        top: pos.y,
      };
    }

    return this.generateRandom(limitLeft, limitTop, moveBy);
  }
}
