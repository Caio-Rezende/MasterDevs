import { InputListener, Move2D } from "../controllers";
import {
  CollidableCircleNode as CollideCircleNode,
  BoxNode,
  Position,
  AbstractNode,
} from "../models";
import { Dimension } from "../models/dimension";
import { collided } from "../utlis";

export class CheckCollideWithShadow extends InputListener {
  collideElement: CollideCircleNode;
  shadowElements: BoxNode[] = [];

  constructor(
    domElement: HTMLElement,
    shadowElements: NodeListOf<HTMLElement>
  ) {
    super();
    this.collideElement = new CollideCircleNode(domElement);
    shadowElements.forEach((domNode) =>
      this.shadowElements.push(new BoxNode(domNode))
    );
  }

  doMotion(moveBy: Move2D): void {
    const collided = this.checkIfCollided();
    if (collided && !this.collideElement.haveCollided) {
      this.collideElement.haveCollided = true;
      this.collideElement.whenCollideStartFn();
    } else if (!collided && this.collideElement.haveCollided) {
      this.collideElement.haveCollided = false;
      this.collideElement.whenCollideStopFn();
    }
  }

  checkIfCollided(): boolean {
    return this.shadowElements.some((node) => {
      const shadowAt = /(-{0,1}[0-9]+)px (-{0,1}[0-9]+)px ([0-9]+)px/.exec(
        node.style.textShadow
      );

      if (shadowAt) {
        const x = Number(shadowAt[1]);
        const y = Number(shadowAt[2]);
        const blur = Number(shadowAt[3]);

        const collideAbstractElement = new AbstractNode(
          this.collideElement.domNode,
          this.collideElement.position,
          this.collideElement.dimension
        );
        const abstractNode = new AbstractNode(
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
        return collided(collideAbstractElement, abstractNode);
      }
    });
  }
}
