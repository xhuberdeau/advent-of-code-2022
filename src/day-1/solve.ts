import { readFileSync } from "fs";
import { resolve } from "path";

const ELF_CALORIES_SEPARATOR = "";

const parseInputsFile = (): string[] =>
  readFileSync(resolve(__dirname, "./inputs.txt")).toString().split("\n");

const groupedCaloriesByElf = (elvesCalories: string[]): number[][] =>
  elvesCalories.reduce(
    (acc: number[][], elfCalories: string) => {
      if (elfCalories === ELF_CALORIES_SEPARATOR) {
        return [...acc, []];
      }
      acc[acc.length - 1].push(parseInt(elfCalories, 10));

      return acc;
    },
    [[]]
  );

const sumCaloriesByElf = (groupedCaloriesByElf: number[][]) =>
  groupedCaloriesByElf.reduce((acc: number[], calories) => [
    ...acc,
    calories.reduce((acc, value) => acc + value, 0),
  ]);

const summedCaloriesByElfInDescendingOrder = sumCaloriesByElf(
  groupedCaloriesByElf(parseInputsFile())
).sort((a, b) => b - a);

const findMostCalories = () => {
  return Math.max(...summedCaloriesByElfInDescendingOrder);
};

const findSummedOfTop3ElvesCarryingMostCalories = () => {
  return summedCaloriesByElfInDescendingOrder
    .slice(0, 3)
    .reduce((acc, val) => acc + val, 0);
};

console.log(`Most: ${findMostCalories()}`);
console.log(`Top 3: ${findSummedOfTop3ElvesCarryingMostCalories()}`);
