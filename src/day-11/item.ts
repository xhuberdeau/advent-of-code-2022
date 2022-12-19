import { randomUUID } from "crypto";

export interface WorryDecreaseStrategy {
  decrease(...args): number;
}

export class DecreaseWorryWithLCMStrategy implements WorryDecreaseStrategy {
  private leastCommonDivisor: { value: bigint };

  decrease(worryLevel: number): number {
    return Number(BigInt(worryLevel) % this.leastCommonDivisor.value);
  }

  setLeastCommonDivisor(leastCommonDivisor: { value: bigint }): void {
    this.leastCommonDivisor = leastCommonDivisor;
  }
}

export class DecreaseWorryByDivisionStrategy implements WorryDecreaseStrategy {
  WORRY_LEVEL_DECREASE = 3;

  decrease(worryLevel: number): number {
    return Math.floor(worryLevel / this.WORRY_LEVEL_DECREASE);
  }
}

export class Item {
  private id: string;

  constructor(
    private worryLevel: number,
    private worryDecreaseStrategy: WorryDecreaseStrategy
  ) {
    this.id = randomUUID();
  }

  getId() {
    return this.id;
  }

  getWorryLevel(): number {
    return this.worryLevel;
  }

  multiplyWorryLevel(multiplier: number): this {
    this.worryLevel *= multiplier;

    return this;
  }

  increaseWorryLevel(sum: number): this {
    this.worryLevel += sum;

    return this;
  }

  isDivisibleBy(diviser: number): boolean {
    return this.worryLevel % diviser === 0;
  }

  setWorryLevel(operationResult: bigint) {
    this.worryLevel = Number(operationResult);
  }

  decreaseWorryLevel(): this {
    this.worryLevel = this.worryDecreaseStrategy.decrease(this.worryLevel);

    return this;
  }
}
