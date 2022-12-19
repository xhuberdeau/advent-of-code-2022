import { MonkeyInspection } from "./monkeyInspection";
export class MonkeyTurn {
  private inspections: MonkeyInspection[] = [];

  addInspection(inspection: MonkeyInspection): this {
    this.inspections.push(inspection);

    return this;
  }
  getInspections(): MonkeyInspection[] {
    return this.inspections;
  }
}
