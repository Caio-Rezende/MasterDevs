import { AbstractNode, BoxNode, Position } from "../models";
import { hypotenuse } from "./math";

export function collided(element: AbstractNode, rect: BoxNode) {
  const massCenterEl = new Position({
    x: element.posX + element.width / 2,
    y: element.posY + element.height / 2,
  });
  const massCenterRect = new Position({
    x: rect.posX + rect.width / 2,
    y: rect.posY + rect.height / 2,
  });
  const massCentersDistanceX = Math.abs(massCenterEl.x - massCenterRect.x);
  const massCentersDistanceY = Math.abs(massCenterEl.y - massCenterRect.y);

  if (massCentersDistanceX > (element.width + rect.width) / 2) {
    return false;
  }
  if (massCentersDistanceY > (element.height + rect.height) / 2) {
    return false;
  }
  return true;
}
