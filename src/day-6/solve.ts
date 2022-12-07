import { readFileSync } from "fs";
import { resolve } from "path";

const input: string = readFileSync(
  resolve(__dirname, "./inputs.txt")
).toString();

export const computeMarker = (input: string, markerSize: number): number => {
  let chars = [];
  let totalScannedChars = null;

  input.split("").find((char, index) => {
    const indexOfChar = chars.indexOf(char);
    if (indexOfChar !== -1) {
      chars = [...chars.slice(indexOfChar + 1), char];
    } else {
      chars.push(char);
    }
    if (chars.length === markerSize) {
      totalScannedChars = index + 1;
    }

    return totalScannedChars !== null;
  });

  return totalScannedChars;
};

const firstPart = computeMarker(input, 4);
const secondPart = computeMarker(input, 14);

console.log(`First part: ${firstPart}`);
console.log(`Second part: ${secondPart}`);
