export const ROCK = "ROCK";
export const PAPER = "PAPER";
export const SCISSORS = "SCISSORS";
export type HandShape = typeof ROCK | typeof PAPER | typeof SCISSORS;

export const LOSE = "LOSE";
export const DRAW = "DRAW";
export const WIN = "WIN";

export type RoundOutcome = typeof LOSE | typeof DRAW | typeof WIN;

export const OpponentHandShapeMapping: { [key: string]: HandShape } = {
  A: ROCK,
  B: PAPER,
  C: SCISSORS,
};

export type ExpectedOutcomeWithOpponentShape = {
  expectedOutcome: RoundOutcome;
  opponentHandShape: HandShape;
};

export const LOSING_CHAIN: { [key in HandShape]: HandShape } = {
  ROCK: SCISSORS,
  SCISSORS: PAPER,
  PAPER: ROCK,
};

export const WINNING_CHAIN: { [key in HandShape]: HandShape } = Object.entries(
  LOSING_CHAIN
).reduce((acc, [winner, loser]) => {
  acc[loser] = winner;
  return acc;
}, {}) as { [key in HandShape]: HandShape };
