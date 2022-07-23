import { BoxNode } from "../model";

export class RandomPlacement {
  constructor(elementId) {
    const el = new BoxNode(document.getElementById(elementId));

    el.style.top = `${this.getInLimit(window.innerHeight - el.height)}px`;
    el.style.left = `${this.getInLimit(window.innerWidth - el.width)}px`;
  }

  getInLimit(limit) {
    return Math.max(Math.ceil(limit * Math.random()), 0);
  }
}
