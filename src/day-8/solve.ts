import { readFileSync } from "fs";
import { resolve } from "path";
import { Grid } from "./grid";

const inputs: string[] = readFileSync(resolve(__dirname, "./inputs.txt"))
  .toString()
  .split("\n");

const grid = new Grid();

inputs.forEach((input, y) => {
  input
    .split("")
    .map(Number)
    .forEach((treeHeight, x) => {
      grid.addTree(treeHeight, x, y);
    });
});

const firstPart = grid.countVisibleTrees();
const secondPart = grid.computeMaxScenicScore();

console.log(`First part: ${firstPart}`);
console.log(`Second part: ${secondPart}`);
