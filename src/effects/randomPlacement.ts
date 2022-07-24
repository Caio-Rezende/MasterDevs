import { BoxNode } from "../model";

export class RandomPlacement {
  constructor(elementId: string) {
    const domElement = document.getElementById(elementId);
    if (domElement) {
      const el = new BoxNode(domElement);

      el.style.top = `${this.getInLimit(window.innerHeight - el.height)}px`;
      el.style.left = `${this.getInLimit(window.innerWidth - el.width)}px`;
    }
  }

  getInLimit(limit: number) {
    return Math.max(Math.ceil(limit * Math.random()), 0);
  }
}
