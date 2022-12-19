import { readFileSync } from "fs";
import { resolve } from "path";
import {
  DecreaseWorryByDivisionStrategy,
  DecreaseWorryWithLCMStrategy,
} from "./item";
import { MonkeyStuffParser } from "./monkeyStuffParser";

const chunks = (array: any[], size: number): string[][] => {
  if (array.length === 0) {
    return [];
  }
  return [array.slice(0, size), ...chunks(array.slice(size), size)];
};

const inputs = chunks(
  readFileSync(resolve(__dirname, "./inputs.txt"))
    .toString()
    .split("\n")
    .filter((line) => line !== ""),
  6
);

const parser = new MonkeyStuffParser(new DecreaseWorryByDivisionStrategy());

const firstPart = parser
  .parse(inputs)
  .launchRounds(20)
  .getMonkeyBusinessLevel();

const secondPart = parser
  .changeStrategy(new DecreaseWorryWithLCMStrategy())
  .parse(inputs)
  .launchRounds(10000)
  .getMonkeyBusinessLevel();

console.log(`First part: ${firstPart}`);
console.log(`Second part: ${secondPart}`);
