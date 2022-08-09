export class Position {
  x: number;
  y: number;

  constructor({ x, y }: { x?: number; y?: number }) {
    this.x = x ?? 0;
    this.y = y ?? 0;
  }
}
