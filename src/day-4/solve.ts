import { readFileSync } from "fs";
import { resolve } from "path";

type Interval = {
  lowerBound: number;
  upperBound: number;
};

type ElvesIntervals = {
  firstElfInterval: Interval;
  secondElfInterval: Interval;
};

const inputs: ElvesIntervals[] = readFileSync(
  resolve(__dirname, "./inputs.txt")
)
  .toString()
  .split("\n")
  .map((line) => {
    const [firstElfSections, secondElfSections] = line.split(",");
    const firstInterval = firstElfSections.split("-").map(Number);
    const secondInterval = secondElfSections.split("-").map(Number);

    return {
      firstElfInterval: {
        lowerBound: firstInterval[0],
        upperBound: firstInterval[1],
      },
      secondElfInterval: {
        lowerBound: secondInterval[0],
        upperBound: secondInterval[1],
      },
    };
  });

const isFullyOverlapping = ({
  firstElfInterval,
  secondElfInterval,
}: ElvesIntervals): boolean =>
  (firstElfInterval.lowerBound <= secondElfInterval.lowerBound &&
    firstElfInterval.upperBound >= secondElfInterval.upperBound) ||
  (secondElfInterval.lowerBound <= firstElfInterval.lowerBound &&
    secondElfInterval.upperBound >= firstElfInterval.upperBound);

const isPartiallyOverlapping = ({
  firstElfInterval,
  secondElfInterval,
}: ElvesIntervals): boolean =>
  firstElfInterval.upperBound >= secondElfInterval.lowerBound &&
  secondElfInterval.upperBound >= firstElfInterval.lowerBound;

const firstPart = inputs.filter((elvesIntervals) =>
  isFullyOverlapping(elvesIntervals)
).length;

const secondPart = inputs.filter((elvesIntervals) =>
  isPartiallyOverlapping(elvesIntervals)
).length;

console.log(`First part: ${firstPart}`);
console.log(`Second part: ${secondPart}`);
