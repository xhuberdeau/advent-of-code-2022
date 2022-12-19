import { Item } from "./item";
import { MonkeyTurn } from "./monkeyTurn";
import { MonkeyInspection } from "./monkeyInspection";

export const MULTIPLICATION = "MULTIPLICATION";
export const ADDITION = "ADDITION";
export const WORRY_LEVEL = "WORRY_LEVEL";

type OperationKind = typeof MULTIPLICATION | typeof ADDITION;
type OperationValue = number | typeof WORRY_LEVEL;

export class Monkey {
  private cumulatedInspectedItemsCount = 0;
  private itemsToInspect: Item[] = [];

  constructor(
    private operationKind: OperationKind,
    private operationValue: OperationValue,
    private testDivisor: number,
    private successfulTestMonkeyRedirectionIndex: number,
    private unsuccessfulTestMonkeyRedirectionIndex: number
  ) {}

  launchTurn(): MonkeyTurn {
    const turn = new MonkeyTurn();

    this.itemsToInspect.forEach((item) => {
      turn.addInspection(this.inspect(item));
    });

    return turn;
  }

  addItemToInspect(item: Item): void {
    this.itemsToInspect.push(item);
  }

  getInspectedItems(): number {
    return this.cumulatedInspectedItemsCount;
  }

  getTestDivisor(): number {
    return this.testDivisor;
  }

  private inspect(item: Item): MonkeyInspection {
    this.cumulatedInspectedItemsCount++;
    this.operate(item);
    const nextMonkeyIndex = this.test(item);
    this.removeInspectedItem(item);

    return new MonkeyInspection(item, nextMonkeyIndex);
  }

  private operate(item: Item): void {
    if (this.operationKind === MULTIPLICATION) {
      if (this.operationValue === WORRY_LEVEL) {
        item.multiplyWorryLevel(item.getWorryLevel());
      } else {
        item.multiplyWorryLevel(this.operationValue);
      }
    } else {
      if (this.operationValue === WORRY_LEVEL) {
        item.increaseWorryLevel(item.getWorryLevel());
      } else {
        item.increaseWorryLevel(this.operationValue);
      }
    }
    item.decreaseWorryLevel();
  }

  private test(item: Item): number {
    if (item.getWorryLevel() % this.testDivisor === 0) {
      return this.successfulTestMonkeyRedirectionIndex;
    }

    return this.unsuccessfulTestMonkeyRedirectionIndex;
  }

  private removeInspectedItem(item: Item): void {
    this.itemsToInspect = this.itemsToInspect.filter(
      (i) => i.getId() !== item.getId()
    );
  }
}
