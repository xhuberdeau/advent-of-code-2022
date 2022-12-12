import { readFileSync } from "fs";
import { resolve } from "path";
import { DOWN, LEFT, RIGHT, UP } from "./directions";
import { Head } from "./head";
import { Tail } from "./tail";

const DirectionsMapping = {
  R: RIGHT,
  U: UP,
  D: DOWN,
  L: LEFT,
};

const head = new Head();
const tail1 = new Tail();
const tail2 = new Tail();
const tail3 = new Tail();
const tail4 = new Tail();
const tail5 = new Tail();
const tail6 = new Tail();
const tail7 = new Tail();
const tail8 = new Tail();
const tail9 = new Tail();

head.attach(tail1);
tail1.attach(tail2);
tail2.attach(tail3);
tail3.attach(tail4);
tail4.attach(tail5);
tail5.attach(tail6);
tail6.attach(tail7);
tail7.attach(tail8);
tail8.attach(tail9);

readFileSync(resolve(__dirname, "./inputs.txt"))
  .toString()
  .split("\n")
  .forEach((line) => {
    const [direction, quantity] = line.split(" ");
    const mappedDirection = DirectionsMapping[direction];
    for (let i = 0; i < parseInt(quantity, 10); i++) {
      head.move(mappedDirection);
    }
  });

const firstPart = tail1.getUniquelyVisitedPositions();
const secondPart = tail9.getUniquelyVisitedPositions();

console.log(`First part: ${firstPart}`);
console.log(`Second part: ${secondPart}`);
