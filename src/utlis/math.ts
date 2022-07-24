export function hipotenuse(x: number, y: number) {
  const x2 = Math.pow(x, 2);
  const y2 = Math.pow(y, 2);

  return Math.pow(x2 + y2, 1 / 2);
}
