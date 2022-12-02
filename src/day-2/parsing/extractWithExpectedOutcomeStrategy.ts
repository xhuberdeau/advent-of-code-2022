import { Round } from "../round";
import {
  DRAW,
  HandShape,
  LOSE,
  LOSING_CHAIN,
  OpponentHandShapeMapping,
  RoundOutcome,
  WIN,
  WINNING_CHAIN,
} from "../types";
import { IExtractRound } from "./roundsParser";

const ExpectedOutcomeMapping: { [key: string]: RoundOutcome } = {
  X: LOSE,
  Y: DRAW,
  Z: WIN,
};

export class ExtractWithExpectedOutcomeStrategy implements IExtractRound {
  execute(roundInput: string): Round {
    const [opponentShape, expectedOutcome] = roundInput.split(" ");
    const translatedOpponentShape = OpponentHandShapeMapping[opponentShape];

    return new Round(
      translatedOpponentShape,
      this.computeMyHandShapFromOutcome(
        translatedOpponentShape,
        ExpectedOutcomeMapping[expectedOutcome]
      )
    );
  }

  private computeMyHandShapFromOutcome = (
    opponentHandShape: HandShape,
    expectedOutcome: RoundOutcome
  ): HandShape => {
    if (expectedOutcome === DRAW) {
      return opponentHandShape;
    }
    if (expectedOutcome === WIN) {
      return WINNING_CHAIN[opponentHandShape];
    }

    return LOSING_CHAIN[opponentHandShape];
  };
}
