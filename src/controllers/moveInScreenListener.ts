import { InputListener, Move2D } from "./input";

export class MoveInScreenListener extends InputListener {
  element: HTMLElement;

  constructor(element: HTMLElement) {
    super();
    this.element = element;
  }

  doMotion(moveBy: Move2D) {
    moveBy.x = parseInt(this.element.style.left) + moveBy.x;
    moveBy.y = parseInt(this.element.style.top) - moveBy.y;

    this.applyConstraints(moveBy);

    this.element.style.top = `${moveBy.y}px`;
    this.element.style.left = `${moveBy.x}px`;
  }

  applyConstraints(moveBy: Move2D) {
    if (moveBy.x < 0) {
      moveBy.x = 0;
    }
    if (moveBy.y < 0) {
      moveBy.y = 0;
    }
    if (moveBy.x + this.element.clientWidth >= window.innerWidth - 5) {
      moveBy.x = window.innerWidth - this.element.clientWidth - 5;
    }
    if (moveBy.y + this.element.clientHeight >= window.innerHeight - 5) {
      moveBy.y = window.innerHeight - this.element.clientHeight - 5;
    }
  }
}
