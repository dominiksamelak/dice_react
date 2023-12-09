import { useState, useEffect } from 'react';

export function countingLogic() {

  const [scoreOne, setScoreOne] = useState("---");
  const [scoreTwo, setScoreTwo] = useState("---");
  const [scoreThree, setScoreThree] = useState("---");
  const [scoreFour, setScoreFour] = useState("---");
  const [scoreFive, setScoreFive] = useState("---");
  const [scoreSix, setScoreSix] = useState("---");
  const [schoolScoreCount, setSchoolScoreCount] = React.useState(0);

  useEffect(() => {
    const countOneValue = dice.filter((die) => die.value === 1).length;
    const countTwoValue = dice.filter((die) => die.value === 2).length;
    const countThreeValue = dice.filter((die) => die.value === 3).length;
    const countFourValue = dice.filter((die) => die.value === 4).length;
    const countFiveValue = dice.filter((die) => die.value === 5).length;
    const countSixValue = dice.filter((die) => die.value === 6).length;

    // Define scoring logic for value 1
    if (countOneValue === 1) {
      setScoreOne(-2);
    } else if (countOneValue === 2) {
      setScoreOne(-1);
    } else if (countOneValue === 3) {
      setScoreOne(0);
    } else if (countOneValue === 4) {
      setScoreOne(1);
    } else if (countOneValue === 5) {
      setScoreOne(2);
    } else {
      setScoreOne("---");
    }

    // Define scoring logic for value 2
    if (countTwoValue === 1) {
      setScoreTwo(-4);
    } else if (countTwoValue === 2) {
      setScoreTwo(-2);
    } else if (countTwoValue === 3) {
      setScoreTwo(0);
    } else if (countTwoValue === 4) {
      setScoreTwo(2);
    } else if (countTwoValue === 5) {
      setScoreTwo(4);
    } else {
      setScoreTwo("---");
    }

    // Define scoring logic for value 3
    if (countThreeValue === 1) {
      setScoreThree(-6);
    } else if (countThreeValue === 2) {
      setScoreThree(-3);
    } else if (countThreeValue === 3) {
      setScoreThree(0);
    } else if (countThreeValue === 4) {
      setScoreThree(3);
    } else if (countThreeValue === 5) {
      setScoreThree(6);
    } else {
      setScoreThree("---");
    }

    // Define scoring logic for value 4
    if (countFourValue === 1) {
      setScoreFour(-8);
    } else if (countFourValue === 2) {
      setScoreFour(-4);
    } else if (countFourValue === 3) {
      setScoreFour(0);
    } else if (countFourValue === 4) {
      setScoreFour(4);
    } else if (countFourValue === 5) {
      setScoreFour(8);
    } else {
      setScoreFour("---");
    }

    // Define scoring logic for value 5
    if (countFiveValue === 1) {
      setScoreFive(-10);
    } else if (countFiveValue === 2) {
      setScoreFive(-5);
    } else if (countFiveValue === 3) {
      setScoreFive(0);
    } else if (countFiveValue === 4) {
      setScoreFive(5);
    } else if (countFiveValue === 5) {
      setScoreFive(10);
    } else {
      setScoreFive("---");
    }

    // Define scoring logic for value 6
    if (countSixValue === 1) {
      setScoreSix(-12);
    } else if (countSixValue === 2) {
      setScoreSix(-6);
    } else if (countSixValue === 3) {
      setScoreSix(0);
    } else if (countSixValue === 4) {
      setScoreSix(6);
    } else if (countSixValue === 5) {
      setScoreSix(12);
    } else {
      setScoreSix("---");
    }

    const schoolScoreCount = countOneValue + countTwoValue + countThreeValue + countFourValue + countFiveValue + countSixValue;
    setSchoolScoreCount(schoolScoreCount)
  }, [dice]);

  return scoreOne, scoreTwo, scoreThree, scoreFour, scoreFive, scoreSix, schoolScoreCount
}