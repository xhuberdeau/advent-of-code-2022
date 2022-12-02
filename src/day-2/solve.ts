import { RoundsParser } from "./parsing/roundsParser";
import { ExtractWithMyHandStrategy } from "./parsing/extractWithMyHandStrategy";
import { ExtractWithExpectedOutcomeStrategy } from "./parsing/extractWithExpectedOutcomeStrategy";

const parser = new RoundsParser(new ExtractWithMyHandStrategy());

const myTotalScore: number = parser
  .parseRounds()
  .reduce((score, round) => score + round.score(), 0);

const myTotalScoreWithSecondStrategy: number = parser
  .changeStategy(new ExtractWithExpectedOutcomeStrategy())
  .parseRounds()
  .reduce((score, round) => score + round.score(), 0);

console.log(myTotalScore);
console.log(myTotalScoreWithSecondStrategy);
