import { CollidableCircleNode, BoxNode } from "../model";
import { collided } from "../utlis";

export class CheckCollideWithShadow {
  element = null;
  shadowElements = [];

  constructor(elementId, shadowNodesClass) {
    this.element = new CollidableCircleNode(document.getElementById(elementId));
    document
      .querySelectorAll(`.${shadowNodesClass}`)
      .forEach((domNode) => this.shadowElements.push(new BoxNode(domNode)));

    window.addEventListener("mousemove", this.listener);
    window.addEventListener("unload", () => {
      window.removeEventListener("mousemove", this.listener);
    });

    return this.element;
  }

  listener = () => {
    if (!this.element.haveCollided) {
      this.checkIfCollided();
    }
  };

  checkIfCollided() {
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

        const haveCollided = collided(this.element, node);
        if (haveCollided) {
          this.element.haveCollided = true;
          if (this.element.whenCollideFn) {
            this.element.whenCollideFn();
          }
        }

        node.posX -= x;
        node.posY -= y;
        node.width -= blur;
        node.height -= blur;
      }
    });
  }
}
