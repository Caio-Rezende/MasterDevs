import { shadowMovesNodesClass } from "../constants";
import { InputListener, Move2D } from "../controllers";
import { BoxNode } from "../models";
import { hypotenuse } from "../utlis";

type ApplyShadowNodes = [BoxNode, BoxNode];

export class ApplyShadow extends InputListener {
  shadowElements: ApplyShadowNodes[] = [];

  constructor(shadowElements: NodeListOf<HTMLHeadingElement>) {
    super();
    shadowElements.forEach((domNode) => {
      const textNode = new BoxNode(domNode);

      const shadow = domNode.cloneNode() as HTMLHeadElement;
      domNode.parentElement?.insertBefore(shadow, domNode);
      shadow.textContent = '🌞'
      shadow.className += ` ${shadowMovesNodesClass} absolute`

      const shadowNode = new BoxNode(shadow);

      this.shadowElements.push([textNode, shadowNode]);
    });
  }

  doMotion(moveBy: Move2D): void {
    const fn = this.cursorMoveShadow(moveBy);

    this.shadowElements.forEach(fn);
  }

  cursorMoveShadow({ x: cursorX, y: cursorY }: Move2D) {
    return (element: ApplyShadowNodes) => {
      const [textNode, shadowNode] = element;

      const x = Math.floor(textNode.posX - cursorX + textNode.width / 2);
      const y = Math.floor(textNode.posY - cursorY + textNode.height / 2);

      const blurTextShadow = Math.ceil(Math.pow(hypotenuse(x, y), 1 / 2));

      shadowNode.style.textShadow = `${x}px ${y}px ${blurTextShadow}px`;

      const angle =
        45 +
        Math.atan2(cursorY - textNode.posY, cursorX - textNode.posX) *
          (180 / Math.PI);
      textNode.style.rotate = `${angle}deg`;
    };
  }
}
