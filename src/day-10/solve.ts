import { readFileSync } from "fs";
import { resolve } from "path";

let X = 1;
let currentCycle = 1;
const cycles = {};
const NOOP = "noop";

readFileSync(resolve(__dirname, "./inputs.txt"))
  .toString()
  .split("\n")
  .forEach((line) => {
    if (line === NOOP) {
      cycles[currentCycle] = X;
      currentCycle++;
    } else {
      const [, V] = line.split(" ");
      cycles[currentCycle] = X;
      currentCycle++;
      cycles[currentCycle] = X;
      currentCycle++;
      X += parseInt(V, 10);
    }
  });

const computePartOne = (): number => {
  const wantedCycles = [20, 60, 100, 140, 180, 220];

  return wantedCycles.map((n) => n * cycles[n]).reduce((sum, a) => sum + a, 0);
};

const computePartTwo = (): string => {
  const SPRITE_CHARACTER = "#";
  const LIT_PIXEL = "#";
  const DARK_PIXEL = ".";
  const LINE_WIDTH = 40;
  const LINES_COUNT = 6;

  const computeSprite = (middleCursorPosition: number): string => {
    const spriteIndexes = [
      middleCursorPosition - 1,
      middleCursorPosition,
      middleCursorPosition + 1,
    ];

    return [...Array(LINE_WIDTH)]
      .map((_, index) =>
        spriteIndexes.includes(index) ? SPRITE_CHARACTER : DARK_PIXEL
      )
      .join("");
  };

  return [...Array(LINES_COUNT)]
    .map((_, rowNumber) => {
      return [...Array(LINE_WIDTH)].reduce((row, _, localCycleNumber) => {
        const globalCycleNumber =
          rowNumber * LINE_WIDTH + (localCycleNumber + 1);
        const sprite = computeSprite(cycles[globalCycleNumber]);
        const nextPixel =
          sprite[localCycleNumber] === SPRITE_CHARACTER
            ? LIT_PIXEL
            : DARK_PIXEL;

        return row + nextPixel;
      }, "");
    })
    .join("\n");
};

const firstPart = computePartOne();
const secondPart = computePartTwo();

console.log(`First part: ${firstPart}`);
console.log(`Second part:\n${secondPart}`);
