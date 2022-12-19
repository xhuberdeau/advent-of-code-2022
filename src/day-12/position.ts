export class Position {
  constructor(private x: number, private y: number) {}

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  getNeightbours(): Position[] {
    return [
      new Position(this.x, this.y + 1),
      new Position(this.x, this.y - 1),
      new Position(this.x - 1, this.y),
      new Position(this.x + 1, this.y),
    ];
  }

  equals(other: Position): boolean {
    return this.getX() === other.getX() && this.getY() === other.getY();
  }
}
