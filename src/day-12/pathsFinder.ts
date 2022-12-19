import { Grid } from "./grid";
import { END_NODE_NAME } from "./node";
import { Path } from "./path";
import { Position } from "./position";

export class PathsFinder {
  private pendingPaths: Path[] = [];
  private terminatedPaths: Path[] = [];
  private end: Position;

  constructor(private grid: Grid) {
    this.end = this.grid
      .getNodes()
      .find((n) => n.getName() === END_NODE_NAME)
      .getPosition();
  }

  getLowestPathsSteps(startingPosition: Position): number {
    const allPaths = this.computeAllPossiblesPathsFrom(startingPosition);

    return Math.min(...allPaths.map((path) => path.countSteps()));
  }

  private computeAllPossiblesPathsFrom(startingPosition: Position): Path[] {
    const startingNode = this.grid
      .getNodes()
      .find((n) => n.getPosition().equals(startingPosition));

    this.pendingPaths.push(new Path([startingNode], this.end));
    let finished = this.finished();

    while (!finished) {
      this.pendingPaths.forEach((path) => {
        this.spread(path);
      });

      const remainingPaths = this.filterOutDeadEnds();
      this.synchronizePendingPaths(remainingPaths);
      this.synchronizeTerminatedPath(remainingPaths);

      finished = this.finished();
    }

    return this.terminatedPaths;
  }

  private spread(path: Path): void {
    const neighbours = path.availableNeighbours(this.grid.allNeighbours());
    const [firstNeighbour, ...remainingNeighbours] = neighbours;
    if (!firstNeighbour) {
      return;
    }
    remainingNeighbours.forEach((node) => {
      this.pendingPaths.push(path.copy().visit(node));
    });
    path.visit(firstNeighbour);
  }

  private finished(): boolean {
    return this.pendingPaths.length === 0;
  }

  private filterOutDeadEnds(): Path[] {
    return this.pendingPaths.filter((path) => !path.isDeadEnd());
  }

  private synchronizeTerminatedPath(remainingPaths: Path[]): void {
    this.terminatedPaths = [
      ...this.terminatedPaths,
      ...remainingPaths.filter((path) => path.isCompleted()),
    ];
  }

  private synchronizePendingPaths(remainingPaths: Path[]): void {
    this.pendingPaths = [
      ...remainingPaths.filter((path) => !path.isCompleted()),
    ];
  }
}
