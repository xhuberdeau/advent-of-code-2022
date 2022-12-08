import { readFileSync } from "fs";
import { resolve } from "path";
import { createFileSystemTree } from "./treeParser";

const TOTAL_DISK_SIZE = 70000000;
const SIZE_NEEDED_FOR_UPDATE = 30000000;
const inputs: string[] = readFileSync(resolve(__dirname, "./inputs.txt"))
  .toString()
  .split("\n");
const root = createFileSystemTree(inputs, undefined);

const findSumOfMostSizeDirectories = (size: number): number => {
  return root
    .findDirectoriesBySize(size, "most")
    .reduce((acc, dir) => acc + dir.getSize(), 0);
};

const findDirectorySizeToDelete = (): number => {
  const rootSize = root.getSize();
  const currentUnusedSpace = TOTAL_DISK_SIZE - rootSize;
  const toFree = SIZE_NEEDED_FOR_UPDATE - currentUnusedSpace;

  return Math.min(
    ...root.findDirectoriesBySize(toFree, "minimum").map((dir) => dir.getSize())
  );
};

const firstPart = findSumOfMostSizeDirectories(100000);
const secondPart = findDirectorySizeToDelete();

console.log(`First part: ${firstPart}`);
console.log(`Second part: ${secondPart}`);
