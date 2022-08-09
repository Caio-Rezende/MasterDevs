export class Dimension {
  width: number;
  height: number;

  constructor({ width, height }: { width?: number; height?: number }) {
    this.width = width ?? 0;
    this.height = height ?? 0;
  }
}
