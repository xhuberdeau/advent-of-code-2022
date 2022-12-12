import { Position } from "./position";
import { Subject } from "./head";

export interface Observer {
  onPositionUpdate(position: Position): void;
}

const ADJACENT_DISTANCE = 1;

export class Tail implements Observer, Subject {
  private visitedPositions: Set<string> = new Set();
  private position: Position;
  private observers: Observer[] = [];

  constructor(private x: number = 0, private y: number = 0) {
    this.position = new Position(this.x, this.y);
    this.recordVisitedPosition();
  }

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  notifyPositionChanged(): void {
    this.observers.forEach((o) => o.onPositionUpdate(this.position));
  }

  getUniquelyVisitedPositions(): number {
    return this.visitedPositions.size;
  }

  onPositionUpdate(position: Position): void {
    if (!this.isAdjacentTo(position)) {
      this.goCloserTo(position);
    }
  }

  private goCloserTo(position: Position): void {
    const targetX = position.getX();
    const targetY = position.getY();

    const currentX = this.position.getX();
    const currentY = this.position.getY();

    let nextX = currentX;
    if (targetX > currentX) {
      nextX = currentX + ADJACENT_DISTANCE;
    } else if (targetX < currentX) {
      nextX = currentX - ADJACENT_DISTANCE;
    }

    let nextY = currentY;
    if (targetY > currentY) {
      nextY = currentY + ADJACENT_DISTANCE;
    } else if (targetY < currentY) {
      nextY = currentY - ADJACENT_DISTANCE;
    }

    this.position = new Position(nextX, nextY);
    this.notifyPositionChanged();
    this.recordVisitedPosition();
  }

  private isAdjacentTo(position: Position): boolean {
    return (
      this.getAdjacentXs().includes(position.getX()) &&
      this.getAdjacentYs().includes(position.getY())
    );
  }

  private getAdjacentXs(): number[] {
    return [
      this.position.getX(),
      this.position.getX() + ADJACENT_DISTANCE,
      this.position.getX() - ADJACENT_DISTANCE,
    ];
  }

  private getAdjacentYs() {
    return [
      this.position.getY(),
      this.position.getY() - ADJACENT_DISTANCE,
      this.position.getY() + ADJACENT_DISTANCE,
    ];
  }

  private recordVisitedPosition(): void {
    this.visitedPositions.add(this.position.toString());
  }
}
