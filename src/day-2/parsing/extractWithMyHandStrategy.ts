import { Round } from "../round";
import {
  HandShape,
  OpponentHandShapeMapping,
  PAPER,
  ROCK,
  SCISSORS,
} from "../types";
import { IExtractRound } from "./roundsParser";

export class ExtractWithMyHandStrategy implements IExtractRound {
  private MyHandShapeMapping: { [key: string]: HandShape } = {
    X: ROCK,
    Y: PAPER,
    Z: SCISSORS,
  };

  execute(roundInput: string): Round {
    const [opponentShape, myShape] = roundInput.split(" ");

    return new Round(
      OpponentHandShapeMapping[opponentShape],
      this.MyHandShapeMapping[myShape]
    );
  }
}
