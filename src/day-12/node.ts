import { Position } from "./position";

export const START_NODE_NAME = "S";
export const END_NODE_NAME = "E";

export class Node {
  constructor(
    private position: Position,
    private level: number,
    private name: string
  ) {}

  getPosition(): Position {
    return this.position;
  }

  getLevel(): number {
    return this.level;
  }

  isNeighbour(node: Node): boolean {
    return (
      this.position
        .getNeightbours()
        .find(
          (neighbour) =>
            neighbour.equals(node.getPosition()) &&
            this.level + 1 >= node.getLevel()
        ) !== undefined
    );
  }

  getName(): string {
    return this.name;
  }

  toString(): string {
    return `${this.getPosition().getX()};${this.getPosition().getY()}`;
  }
}
