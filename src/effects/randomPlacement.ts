import { BoxNode, CircleNode } from "../model";
import { collided } from "../utlis";

interface TopLeft {
  left: number;
  top: number;
}

export class RandomPlacement {
  el: CircleNode;
  avoid: BoxNode[] = [];

  constructor(domElement: HTMLElement, avoidElements: NodeListOf<HTMLElement>) {
    this.el = new CircleNode(domElement);
    avoidElements.forEach((domNode) => this.avoid.push(new BoxNode(domNode)));

    const { top, left } = this.getInLimit();

    this.el.style.left = `${left}px`;
    this.el.style.top = `${top}px`;
  }

  protected getInLimit(): TopLeft {
    const limitLeft = window.innerWidth - 2 * this.el.radius;
    const limitTop = window.innerHeight - 2 * this.el.radius;

    return this.generateRandom(limitLeft, limitTop);
  }

  protected generateRandom(limitLeft: number, limitTop: number): TopLeft {
    this.el.posX = Math.ceil(limitLeft * Math.random());
    this.el.posY = Math.ceil(limitTop * Math.random());

    let hasCollided = false;

    this.avoid.forEach((item) => (hasCollided ||= collided(this.el, item)));

    if (!hasCollided) {
      return {
        left: this.el.posX,
        top: this.el.posY,
      };
    }

    return this.generateRandom(limitLeft, limitTop);
  }
}
