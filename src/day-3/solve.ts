import { readFileSync } from "fs";
import { resolve } from "path";

const inputs: string[][] = readFileSync(resolve(__dirname, "./inputs.txt"))
  .toString()
  .split("\n")
  .map((line) => line.split(""));

const computePriority = (char: string): number => {
  if (char.toUpperCase() === char) {
    return char.charCodeAt(0) - 38;
  }

  return char.charCodeAt(0) - 96;
};

const findCommonChar = (array: string[][]): string => {
  const arrayCopy = [...array];
  const firstValues = arrayCopy.pop();

  return arrayCopy.reduce(
    (acc, string) => acc.filter((value) => string.includes(value)),
    firstValues
  )[0];
};

const sum = (a: number, b: number): number => a + b;

const chunks = (array: any[], size: number) =>
  array.reduce((acc, element, index) => {
    if ((index + 1) % size === 1) {
      acc.push([]);
    }
    acc[acc.length - 1].push(element);

    return acc;
  }, []);

const firstPart = inputs
  .map((rucksack: string[]) => [
    rucksack.slice(0, rucksack.length / 2),
    rucksack.slice(rucksack.length / 2),
  ])
  .map(findCommonChar)
  .map(computePriority)
  .reduce(sum, 0);

const secondPart = chunks(inputs, 3)
  .map(findCommonChar)
  .map(computePriority)
  .reduce(sum, 0);

console.log(`First part: ${firstPart}`);
console.log(`Second part: ${secondPart}`);
