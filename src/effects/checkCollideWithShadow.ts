import { CollidableCircleNode, BoxNode } from "../model";
import { collided } from "../utlis";

export class CheckCollideWithShadow {
  element: CollidableCircleNode;
  shadowElements: BoxNode[] = [];

  constructor(elementId: string, shadowNodesClass: string) {
    const domElement = document.getElementById(elementId);
    if (!domElement) {
      throw new Error("EntityNotFound to construct Collider");
    }

    this.element = new CollidableCircleNode(domElement);
    document
      .querySelectorAll<HTMLElement>(`.${shadowNodesClass}`)
      .forEach((domNode) => this.shadowElements.push(new BoxNode(domNode)));

    window.addEventListener("mousemove", this.listener);
    window.addEventListener("unload", () => {
      window.removeEventListener("mousemove", this.listener);
    });
  }

  listener = () => {
    const collided = this.checkIfCollided();
    if (collided && !this.element.haveCollided) {
      this.element.haveCollided = true;
      this.element.whenCollideStartFn();
    } else if (!collided && this.element.haveCollided) {
      this.element.haveCollided = false;
      this.element.whenCollideStopFn();
    }
  };

  checkIfCollided(): boolean {
    let haveCollided = false;
    this.shadowElements.forEach((node) => {
      const shadowAt = /(-{0,1}[0-9]+)px (-{0,1}[0-9]+)px ([0-9]+)px/.exec(
        node.style.textShadow
      );

      if (shadowAt) {
        const x = Number(shadowAt[1]);
        const y = Number(shadowAt[2]);
        const blur = Number(shadowAt[3]);

        node.posX += x;
        node.posY += y;
        node.width += blur;
        node.height += blur;

        haveCollided = haveCollided || collided(this.element, node);

        node.posX -= x;
        node.posY -= y;
        node.width -= blur;
        node.height -= blur;
      }
    });

    return haveCollided;
  }
}
