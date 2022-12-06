import { readFileSync } from "fs";
import { resolve } from "path";

const parseHorizontalStacks = (line: string) => {
  if (line === "") {
    return [];
  }
  return [line.slice(0, 3), ...parseHorizontalStacks(line.slice(4))];
};

const inputs: string[] = readFileSync(resolve(__dirname, "./inputs.txt"))
  .toString()
  .split("\n");

const inputsLineSeparatorIndex = inputs.findIndex((line) => line === "");

const stacks = inputs
  .slice(0, inputsLineSeparatorIndex - 1)
  .map(parseHorizontalStacks)
  .reduce((acc, horizontalStacks) => {
    horizontalStacks.forEach((stack, index) => {
      if (stack.trim() === "") {
        return;
      }
      if (!acc[index]) {
        acc[index] = [];
      }
      acc[index] = [stack[1], ...acc[index]];
    });

    return acc;
  }, []);

const inputsMovements = inputs
  .slice(inputsLineSeparatorIndex + 1)
  .map((line) => line.split(" ").filter(Number).map(Number));

const solve = (stacks: string[][], reverse = true): string => {
  inputsMovements.forEach(([quantity, from, to]) => {
    const taken = stacks[from - 1].splice(-quantity);
    stacks[to - 1] = [
      ...stacks[to - 1],
      ...(reverse ? taken.reverse() : taken),
    ];
  });

  return stacks.reduce((acc, stack) => `${acc}${stack.slice(-1)}`, "");
};

const deepCopy = (data) => JSON.parse(JSON.stringify(data));

const firstPart = solve(deepCopy(stacks));
const secondPart = solve(deepCopy(stacks), false);
console.log(`First part: ${firstPart}`);
console.log(`Second part: ${secondPart}`);
