import { Direction, DOWN, LEFT, RIGHT, UP } from "./directions";
import { Position } from "./position";
import { Observer } from "./tail";

export interface Subject {
  attach(observer: Observer): void;

  notifyPositionChanged(): void;
}

export class Head implements Subject {
  private position: Position;
  private observers: Observer[] = [];

  constructor(private x: number = 0, private y: number = 0) {
    this.position = new Position(this.x, this.y);
  }

  move(direction: Direction): void {
    switch (direction) {
      case LEFT:
        this.position = new Position(
          this.position.getX() - 1,
          this.position.getY()
        );
        break;
      case RIGHT:
        this.position = new Position(
          this.position.getX() + 1,
          this.position.getY()
        );
        break;
      case UP:
        this.position = new Position(
          this.position.getX(),
          this.position.getY() - 1
        );
        break;
      case DOWN:
        this.position = new Position(
          this.position.getX(),
          this.position.getY() + 1
        );
        break;
    }
    this.notifyPositionChanged();
  }

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  notifyPositionChanged(): void {
    this.observers.forEach((o) => o.onPositionUpdate(this.position));
  }
}
