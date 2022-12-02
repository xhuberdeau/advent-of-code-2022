import {
  DRAW,
  HandShape,
  LOSE,
  PAPER,
  ROCK,
  RoundOutcome,
  SCISSORS,
  WIN,
  WINNING_CHAIN,
} from "./types";

export class Round {
  private HAND_SHAPED_SCORE_MAPPING = {
    [ROCK]: 1,
    [PAPER]: 2,
    [SCISSORS]: 3,
  };

  private ROUND_OUTCOME_SCORE_MAPPING: { [key in RoundOutcome]: number } = {
    [LOSE]: 0,
    [DRAW]: 3,
    [WIN]: 6,
  };

  constructor(private opponentShape: HandShape, private myShape: HandShape) {}

  score(): number {
    return (
      this.ROUND_OUTCOME_SCORE_MAPPING[this.outcome()] +
      this.HAND_SHAPED_SCORE_MAPPING[this.myShape]
    );
  }

  private outcome(): RoundOutcome {
    if (this.opponentShape == this.myShape) {
      return DRAW;
    }

    if (WINNING_CHAIN[this.opponentShape] === this.myShape) {
      return WIN;
    }

    return LOSE;
  }
}
