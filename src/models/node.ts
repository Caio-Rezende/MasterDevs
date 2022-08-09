export class Node {
  domNode: HTMLElement;
  style: CSSStyleDeclaration;
  
  get posX() {
    return Math.floor(this.domNode.offsetWidth / 2 + this.domNode.offsetLeft);
  }
  get posY() {
    return Math.floor(this.domNode.offsetHeight / 2 + this.domNode.offsetTop);
  }

  constructor(node: HTMLElement) {
    this.domNode = node;
    this.style = node.style;
  }
}
