import { END_NODE_NAME, Node, START_NODE_NAME } from "./node";
import { Position } from "./position";

export class Grid {
  private nodes: Node[] = [];
  private neighbours: { [key: string]: Node[] } = {};

  build(lines: string[]): this {
    lines.forEach((line, rowNumber) => {
      line.split("").forEach((level, colNumber) => {
        const position = new Position(colNumber, rowNumber);

        const isStart = level === START_NODE_NAME;
        const isEnd = level === END_NODE_NAME;

        let mappedLevel = level;
        if (isStart) {
          mappedLevel = "a";
        } else if (isEnd) {
          mappedLevel = "z";
        }
        const convertedLevel = mappedLevel.charCodeAt(0) - 96;

        this.nodes.push(new Node(position, convertedLevel, level));
      });
    });

    this.nodes.forEach((node) => {
      const neighbours = this.nodes.filter((n) => node.isNeighbour(n));

      this.neighbours[node.toString()] = neighbours;
    });

    return this;
  }

  getNodes(): Node[] {
    return this.nodes;
  }

  allNeighbours(): { [key: string]: Node[] } {
    return this.neighbours;
  }
}
