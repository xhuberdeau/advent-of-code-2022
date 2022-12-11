import { Tree } from "./tree";

enum Direction {
  Top,
  Bottom,
  Left,
  Right,
}

const HORIZONTAL_DIRECTION = [Direction.Left, Direction.Right];
const VERTICAL_DIRECTION = [Direction.Top, Direction.Bottom];

const REVERSE_ORDER_DIRECTION = [Direction.Top, Direction.Left];

export class Grid {
  private trees: Tree[] = [];
  private gridWidth = 0;
  private gridHeight = 0;

  addTree(treeHeight: number, x: number, y: number): this {
    if (x > this.gridWidth) {
      this.gridWidth = x;
    }
    if (y > this.gridHeight) {
      this.gridHeight = y;
    }

    this.trees.push(new Tree(x, y, treeHeight));

    return this;
  }

  countVisibleTrees(): number {
    return this.trees.reduce((acc, tree) => {
      if (this.isTreeVisible(tree)) {
        return acc + 1;
      }

      return acc;
    }, 0);
  }

  computeMaxScenicScore(): number {
    return Math.max(...this.trees.map((t) => this.computeTreeScenicScore(t)));
  }

  private computeTreeScenicScore(tree: Tree): number {
    if (this.isEdgyTree(tree)) {
      return 0;
    }

    return (
      this.treeViewingDistance(tree, Direction.Top) *
      this.treeViewingDistance(tree, Direction.Bottom) *
      this.treeViewingDistance(tree, Direction.Left) *
      this.treeViewingDistance(tree, Direction.Right)
    );
  }

  private treeViewingDistance(tree: Tree, direction: Direction): number {
    const method = VERTICAL_DIRECTION.includes(direction) ? "getY" : "getX";

    const sortingFn = (a, b) =>
      REVERSE_ORDER_DIRECTION.includes(direction)
        ? b[method]() - a[method]()
        : a[method]() - b[method]();

    const trees = this.getTreeLine(tree, direction).sort(sortingFn);

    const treeWithSameOrGreaterHeightIndex = trees.findIndex(
      (t) => t.getHeight() >= tree.getHeight()
    );

    if (treeWithSameOrGreaterHeightIndex === -1) {
      return trees.length;
    }

    return treeWithSameOrGreaterHeightIndex + 1;
  }

  private isTreeVisible(tree: Tree): boolean {
    const treeHeight = tree.getHeight();

    return (
      this.isEdgyTree(tree) ||
      treeHeight > this.maxTreeHeightOnLine(tree, Direction.Top) ||
      treeHeight > this.maxTreeHeightOnLine(tree, Direction.Left) ||
      treeHeight > this.maxTreeHeightOnLine(tree, Direction.Right) ||
      treeHeight > this.maxTreeHeightOnLine(tree, Direction.Bottom)
    );
  }

  private isEdgyTree(tree: Tree): boolean {
    const x = tree.getX();
    const y = tree.getY();

    return x === 0 || x === this.gridWidth || y === 0 || y === this.gridHeight;
  }

  private maxTreeHeightOnLine(tree: Tree, direction: Direction): number {
    return Math.max(
      ...this.getTreeLine(tree, direction).map((t) => t.getHeight())
    );
  }

  private getTreeLine(tree: Tree, direction: Direction): Tree[] {
    if (direction === Direction.Top) {
      return this.trees.filter(
        (t) => t.getX() === tree.getX() && t.getY() < tree.getY()
      );
    }

    if (direction === Direction.Bottom) {
      return this.trees.filter(
        (t) => t.getX() === tree.getX() && t.getY() > tree.getY()
      );
    }

    if (direction === Direction.Left) {
      return this.trees.filter(
        (t) => t.getY() === tree.getY() && t.getX() < tree.getX()
      );
    }

    return this.trees.filter(
      (t) => t.getY() === tree.getY() && t.getX() > tree.getX()
    );
  }
}
