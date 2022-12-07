import { computeMarker } from "./solve";

describe("Day 6", () => {
  describe("First part", () => {
    it("should return 5 for bvwbjplbgvbhsrlpgdmjqwftvncz", () => {
      expect(computeMarker("bvwbjplbgvbhsrlpgdmjqwftvncz", 4)).toEqual(5);
    });

    it("should return 6 for nppdvjthqldpwncqszvftbrmjlhg", () => {
      expect(computeMarker("nppdvjthqldpwncqszvftbrmjlhg", 4)).toEqual(6);
    });

    it("should return 10 for nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", () => {
      expect(computeMarker("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 4)).toEqual(10);
    });

    it("should return 11 for zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", () => {
      expect(computeMarker("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 4)).toEqual(11);
    });
  });
});
