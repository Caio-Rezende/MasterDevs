import { BoxNode, CircleNode } from "../model";

export function collided(circle: CircleNode, rect: BoxNode) {
  //leftLine
  var dx = Math.abs(circle.posX - rect.posX);
  var dy = Math.abs(circle.posY - rect.posY);

  if (dx > circle.radius + rect.width / 2) return false;
  if (dy > circle.radius + rect.height / 2) return false;

  if (dx <= rect.width) return true;
  if (dy <= rect.height) return true;

  var dx = dx - rect.width;
  var dy = dy - rect.height;
  return dx * dx + dy * dy <= circle.radius * circle.radius;
}
