import { Node } from "./node";
import { Position } from "./position";

export class Path {
  private nodes: Node[] = [];
  private currentNode: Node;
  private targetReached = false;
  private canGoFurther = true;

  constructor(
    startingNodes: Node[],
    private target: Position,
    private visitedNodes = {}
  ) {
    this.nodes = [...startingNodes];
    this.currentNode = this.nodes[this.nodes.length - 1];
  }

  visit(node: Node): this {
    this.nodes.push(node);
    this.currentNode = node;
    this.visitedNodes[node.toString()] = true;
    if (this.currentNode.getPosition().equals(this.target)) {
      this.targetReached = true;
    }

    return this;
  }

  countSteps(): number {
    return this.nodes.length - 1;
  }

  availableNeighbours(allNeighbours: { [key: string]: Node[] }): Node[] {
    const nextNodes = allNeighbours[this.currentNode.toString()].filter((n) =>
      this.canVisit(n)
    );
    if (nextNodes.length === 0) {
      this.canGoFurther = false;
    }
    return nextNodes;
  }

  isDeadEnd(): boolean {
    return !this.targetReached && !this.canGoFurther;
  }

  isCompleted(): boolean {
    return this.targetReached;
  }

  copy(): Path {
    return new Path([...this.nodes], this.target, this.visitedNodes);
  }

  private hasVisited(node: Node): boolean {
    return this.visitedNodes[node.toString()];
  }

  private canVisit(node: Node): boolean {
    return !this.hasVisited(node);
  }
}
