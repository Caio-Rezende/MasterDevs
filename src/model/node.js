export class Node {
  domNode = null;
  style = null;
  posX = 0;
  posY = 0;

  constructor(node) {
    this.domNode = node;
    this.style = node.style;

    this.posX = Math.floor(node.offsetWidth / 2 + node.offsetLeft);
    this.posY = Math.floor(node.offsetHeight / 2 + node.offsetTop);
  }
}
