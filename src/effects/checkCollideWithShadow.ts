import { InputListener, Move2D } from "../controllers";
import {
  CollidableCircleNode,
  BoxNode,
  Position,
  AbsctractNode,
} from "../models";
import { Dimension } from "../models/dimension";
import { collided } from "../utlis";

export class CheckCollideWithShadow extends InputListener {
  element: CollidableCircleNode;
  shadowElements: BoxNode[] = [];

  constructor(
    domElement: HTMLElement,
    shadowElements: NodeListOf<HTMLElement>
  ) {
    super();
    this.element = new CollidableCircleNode(domElement);
    shadowElements.forEach((domNode) =>
      this.shadowElements.push(new BoxNode(domNode))
    );
  }

  doMotion(moveBy: Move2D): void {
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

        const abstractNode = new AbsctractNode(
          node.domNode,
          new Position({
            x: node.posX + x,
            y: node.posY + y,
          }),
          new Dimension({
            width: node.width + blur,
            height: node.height + blur,
          })
        );

        haveCollided = haveCollided || collided(this.element, abstractNode);
      }
    });

    return haveCollided;
  }
}
