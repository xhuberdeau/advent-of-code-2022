import { Item } from "./item";

export class MonkeyInspection {
  constructor(private item: Item, private nextInspectingMonkeyNumber: number) {}

  getItem(): Item {
    return this.item;
  }

  getNextInspectingMonkeyNumber(): number {
    return this.nextInspectingMonkeyNumber;
  }
}
