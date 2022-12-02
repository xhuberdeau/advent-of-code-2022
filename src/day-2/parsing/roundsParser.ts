import { readFileSync } from "fs";
import { resolve } from "path";
import { Round } from "../round";

export interface IExtractRound {
  execute: (roundInput: string) => Round;
}

export class RoundsParser {
  private parsedRounds: string[];

  constructor(private strategy: IExtractRound) {
    this.parsedRounds = readFileSync(resolve(__dirname, "../inputs.txt"))
      .toString()
      .split("\n");
  }

  parseRounds(): Round[] {
    return this.parsedRounds.map((line) => this.strategy.execute(line));
  }

  changeStategy(strategy: IExtractRound): this {
    this.strategy = strategy;

    return this;
  }
}
