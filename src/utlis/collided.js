export function collided(circle, rect) {
  //leftLine
  var dx = Math.abs(circle.posX - rect.posX);
  var dy = Math.abs(circle.posY - rect.posY);

  if (dx > circle.r + rect.width / 2) return false;
  if (dy > circle.r + rect.height / 2) return false;

  if (dx <= rect.width) return true;
  if (dy <= rect.height) return true;

  var dx = dx - rect.width;
  var dy = dy - rect.height;
  return dx * dx + dy * dy <= circle.r * circle.r;
}
