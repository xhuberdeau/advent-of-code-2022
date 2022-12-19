import { Monkey } from "./monkey";

export class StuffSlingingSimianShenanigans {
  private monkeys: Monkey[] = [];

  getMonkeyBusinessLevel(): number {
    return this.monkeys
      .sort((a, b) => b.getInspectedItems() - a.getInspectedItems())
      .slice(0, 2)
      .reduce((acc, monkey) => acc * monkey.getInspectedItems(), 1);
  }

  launchRounds(roundsCount: number): this {
    for (let round = 0; round < roundsCount; round++) {
      this.monkeys.forEach((monkey) => {
        const turn = monkey.launchTurn();
        turn.getInspections().forEach((inspection) => {
          this.monkeys[
            inspection.getNextInspectingMonkeyNumber()
          ].addItemToInspect(inspection.getItem());
        });
      });
    }

    return this;
  }

  addMonkey(monkey: Monkey): this {
    this.monkeys.push(monkey);

    return this;
  }

  getMonkeys() {
    return this.monkeys;
  }
}
