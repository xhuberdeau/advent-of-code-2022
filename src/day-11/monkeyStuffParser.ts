import {
  DecreaseWorryWithLCMStrategy,
  Item,
  WorryDecreaseStrategy,
} from "./item";
import { ADDITION, Monkey, MULTIPLICATION, WORRY_LEVEL } from "./monkey";
import { StuffSlingingSimianShenanigans } from "./stuffSlingingSimianShenanigans";

export class MonkeyStuffParser {
  constructor(private worryDecreaseStrategy: WorryDecreaseStrategy) {}

  parse(inputs: string[][]): StuffSlingingSimianShenanigans {
    const monkeyStuff = new StuffSlingingSimianShenanigans();

    const lcm = { value: 1n };
    inputs.forEach((monkeyProperties) => {
      const items = monkeyProperties[1]
        .split(":")[1]
        .trim()
        .split(", ")
        .map(Number);
      const [operation, value] = monkeyProperties[2]
        .split("= old ")[1]
        .split(" ");
      const convertedOperation = operation === "*" ? MULTIPLICATION : ADDITION;
      const convertedOperationValue =
        value === "old" ? WORRY_LEVEL : parseInt(value, 10);
      const [, test] = monkeyProperties[3].split("divisible by ");
      const [, successfulTestMonkeyIndex] =
        monkeyProperties[4].split("throw to monkey ");

      const [, unsuccessfulTestMonkeyIndex] =
        monkeyProperties[5].split("throw to monkey ");
      const monkey = new Monkey(
        convertedOperation,
        convertedOperationValue,
        parseInt(test, 10),
        parseInt(successfulTestMonkeyIndex, 10),
        parseInt(unsuccessfulTestMonkeyIndex, 10)
      );
      lcm.value = lcm.value * BigInt(monkey.getTestDivisor());
      const strategy = this.worryDecreaseStrategy;
      if (strategy instanceof DecreaseWorryWithLCMStrategy) {
        strategy.setLeastCommonDivisor(lcm);
      }
      items.forEach((worrylevel) =>
        monkey.addItemToInspect(new Item(worrylevel, strategy))
      );
      monkeyStuff.addMonkey(monkey);
    });

    return monkeyStuff;
  }

  changeStrategy(worryDecreaseStrategy: WorryDecreaseStrategy): this {
    this.worryDecreaseStrategy = worryDecreaseStrategy;

    return this;
  }
}
