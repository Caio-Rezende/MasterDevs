export class Node {
  domNode: HTMLElement;
  style: CSSStyleDeclaration;
  posX = 0;
  posY = 0;

  constructor(node: HTMLElement) {
    this.domNode = node;
    this.style = node.style;

    this.posX = Math.floor(node.offsetWidth / 2 + node.offsetLeft);
    this.posY = Math.floor(node.offsetHeight / 2 + node.offsetTop);
  }
}
