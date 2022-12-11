export class Tree {
  constructor(private x: number, private y: number, private height: number) {}

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  getHeight(): number {
    return this.height;
  }
}
