import { readFileSync } from "fs";
import { resolve } from "path";
import { Grid } from "./grid";
import { PathsFinder } from "./pathsFinder";
import { START_NODE_NAME } from "./node";

const lines: string[] = readFileSync(resolve(__dirname, "./inputs.txt"))
  .toString()
  .split("\n");

const grid: Grid = new Grid().build(lines);
const pathFinder = new PathsFinder(grid);

const firstPart = pathFinder.getLowestPathsSteps(
  grid
    .getNodes()
    .find((n) => n.getName() === START_NODE_NAME)
    .getPosition()
);

const secondPart = grid
  .getNodes()
  .filter((n) => n.getLevel() === 1)
  .map((node) => node.getPosition())
  .reduce((acc, startingPosition) => {
    const lowestPathSteps = pathFinder.getLowestPathsSteps(startingPosition);

    if (acc > lowestPathSteps) {
      return lowestPathSteps;
    }

    return acc;
  }, Infinity);

console.log(`First part: ${firstPart}`);
console.log(`Second part:\n${secondPart}`);
