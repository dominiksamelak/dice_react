import { useState, useEffect } from 'react';

export function CountingLogic({ dice, currentPlayer }) {
  const initialScores = {
    scoreOne: '---',
    scoreTwo: '---',
    scoreThree: '---',
    scoreFour: '---',
    scoreFive: '---',
    scoreSix: '---',
  };

  const [scoresPlayerOne, setScoresPlayerOne] = useState(initialScores);
  const [scoresPlayerTwo, setScoresPlayerTwo] = useState(initialScores)
  const [schoolScoreCount, setSchoolScoreCount] = useState(1);
  const [isOnePairConfirmedPlayerOne, setIsOnePairConfirmedPlayerOne] =
    useState(false);
    const [isOnePairConfirmedPlayerTwo, setIsOnePairConfirmedPlayerTwo] = useState(false);
  const [isTwoPairsConfirmedPlayerOne, setIsTwoPairsConfirmedPlayerOne] =
    useState(false);
  const [isTripleConfirmedPlayerOne, setIsTripleConfirmedPlayerOne] =
    useState(false);
  const [
    isStraightFlushConfirmedPlayerOne,
    setIsStraightFlushConfirmedPlayerOne,
  ] = useState(false);
  const [isRoyalFlushConfirmedPlayerOne, setIsRoyalFlushConfirmedPlayerOne] =
    useState(false);
  const [isFullHouseConfirmedPlayerOne, setIsFullHouseConfirmedPlayerOne] =
    useState(false);
  const [isQuadsConfirmedPlayerOne, setIsQuadsConfirmedPlayerOne] =
    useState(false);
  const [isPokerConfirmedPlayerOne, setIsPokerConfirmedPlayerOne] =
    useState(false);

  useEffect(() => {
    const countValues = {};
    for (let i = 1; i <= 6; i++) {
      countValues[i] = dice.filter((die) => die.value === i).length;
    }

    const updatedScoresPlayerOne = {};
    const updatedScoresPlayerTwo = {};
    for (let i = 1; i <= 6; i++) {
      const countValue = countValues[i];
      if (countValue === 1) {
        updatedScoresPlayerOne[`score${i}`] = -2 * i;
      } else if (countValue === 2) {
        updatedScoresPlayerOne[`score${i}`] = -i;
      } else if (countValue === 3) {
        updatedScoresPlayerOne[`score${i}`] = 0;
      } else if (countValue === 4) {
        updatedScoresPlayerOne[`score${i}`] = i; // Updated to double the value for four of a kind
      } else if (countValue === 5) {
        updatedScoresPlayerOne[`score${i}`] = i * 2; // Updated to double the value for five of a kind
      } else {
        updatedScoresPlayerOne[`score${i}`] = '---';
      }
    }

    // Calculate the one-pair score based on face value
    let onePairScore = 0;
    for (let i = 1; i <= 6; i++) {
      if (countValues[i] >= 2) {
        onePairScore = i * 2;
        break;
      }
      // debugger
    }

    // If onePair is not confirmed, update the score
    if (currentPlayer === 1) {
      if (!isOnePairConfirmedPlayerOne) {
        updatedScoresPlayerOne.onePairPlayerOne =
          onePairScore !== 0 ? onePairScore : '---';
      }
    } 
    if (currentPlayer === 2) {
      if (!isOnePairConfirmedPlayerTwo) {
        updatedScoresPlayerTwo.onePairPlayerTwo =
          onePairScore !== 0 ? onePairScore : '---';
      }
    } 



    // Calculate the two-pairs score based on face value
    let twoPairsScore = 0;
    let pairsFound = 0;

    for (let i = 1; i <= 6; i++) {
      if (countValues[i] >= 2) {
        twoPairsScore += i * 2;
        pairsFound++;

        if (pairsFound === 2) {
          break;
        }
      }

      if (countValues[i] === 4) {
        twoPairsScore += i * 2;
        pairsFound++;
      }

      // Special case: Five of a kind counts as two pairs
      if (countValues[i] === 5) {
        twoPairsScore += i * 2;
        pairsFound = 2; // Set pairsFound to 2 to exit the loop
        break;
      }
    }

    // If two pairs are not found, reset twoPairsScore to 0
    if (pairsFound < 2) {
      twoPairsScore = 0;
    }
    if (!isTwoPairsConfirmedPlayerOne) {
      updatedScoresPlayerOne.twoPairsPlayerOne =
        pairsFound === 2 ? twoPairsScore : '---';
    }

    let tripleScore = 0;
    for (let i = 1; i <= 6; i++) {
      if (countValues[i] >= 3) {
        tripleScore += i * 3;
        break;
      }
    }
    if (!isTripleConfirmedPlayerOne) {
      updatedScoresPlayerOne.triplePlayerOne = tripleScore !== 0 ? tripleScore : '---';
    }

    let straightFlushScore = 0;
    const sortedValuesStraight = dice
      .map((die) => die.value)
      .sort((a, b) => a - b);
    if (sortedValuesStraight[0] === 1 && sortedValuesStraight[4] === 5) {
      straightFlushScore = 15;
    }

    if (!isStraightFlushConfirmedPlayerOne) {
      updatedScoresPlayerOne.straightFlushPlayerOne =
        straightFlushScore !== 0 ? straightFlushScore : '---';
    }

    let royalFlushScore = 0;
    const sortedValuesRoyal = dice
      .map((die) => die.value)
      .sort((a, b) => a - b);
    if (sortedValuesRoyal[0] === 2 && sortedValuesRoyal[4] === 6) {
      royalFlushScore = 30;
    }

    if (!isRoyalFlushConfirmedPlayerOne) {
      updatedScoresPlayerOne.royalFlushPlayerOne =
        royalFlushScore !== 0 ? royalFlushScore : '---';
    }

    let fullHouseScore = 0;

    const threeOfAKind = Object.keys(countValues).find(
      (key) => countValues[key] === 3
    );
    const pair = Object.keys(countValues).find((key) => countValues[key] === 2);

    if (threeOfAKind && pair) {
      // If both a three of a kind and a pair are present, it's a full house
      fullHouseScore = threeOfAKind * 3 + pair * 2;
    }
    for (let i = 1; i <= 6; i++) {
      if (countValues[i] === 5) {
        fullHouseScore = i * 5;
      }
    }

    if (!isFullHouseConfirmedPlayerOne) {
      updatedScoresPlayerOne.fullHousePlayerOne =
        fullHouseScore !== 0 ? fullHouseScore : '---';
    }

    let quadsScore = 0;
    for (let i = 1; i <= 6; i++) {
      if (countValues[i] === 4) {
        quadsScore += 50 + i * 4;
      }
    }

    if (!isQuadsConfirmedPlayerOne) {
      updatedScoresPlayerOne.quadsPlayerOne = quadsScore !== 0 ? quadsScore : '---';
    }

    let pokerScore = 0;
    for (let i = 1; i <= 6; i++) {
      if (countValues[i] === 5) {
        pokerScore += 100 + i * 4;
      }
    }

    if (!isPokerConfirmedPlayerOne) {
      updatedScoresPlayerOne.pokerPlayerOne = pokerScore !== 0 ? pokerScore : '---';
    }

    const schoolScoreCount =
      Object.values(countValues).reduce((acc, value) => acc + value, 0) -
      countValues[onePairScore / 2];

    setScoresPlayerOne(updatedScoresPlayerOne);
    setScoresPlayerTwo(updatedScoresPlayerTwo);
    setSchoolScoreCount(schoolScoreCount);
  }, [
    dice,
    isOnePairConfirmedPlayerOne,
    isTwoPairsConfirmedPlayerOne,
    isTripleConfirmedPlayerOne,
    setIsTripleConfirmedPlayerOne,
    isStraightFlushConfirmedPlayerOne,
    setIsStraightFlushConfirmedPlayerOne,
    isRoyalFlushConfirmedPlayerOne,
    setIsRoyalFlushConfirmedPlayerOne,
    isFullHouseConfirmedPlayerOne,
    setIsFullHouseConfirmedPlayerOne,
    isQuadsConfirmedPlayerOne,
    setIsQuadsConfirmedPlayerOne,
    isPokerConfirmedPlayerOne,
    setIsPokerConfirmedPlayerOne,
    currentPlayer,
    isOnePairConfirmedPlayerTwo
  ]);

  return {
    scoresPlayerOne,
    scoresPlayerTwo,
    schoolScoreCount,
    isOnePairConfirmedPlayerOne,
    setIsOnePairConfirmedPlayerOne,
    isTwoPairsConfirmedPlayerOne,
    setIsTwoPairsConfirmedPlayerOne,
    isTripleConfirmedPlayerOne,
    setIsTripleConfirmedPlayerOne,
    isStraightFlushConfirmedPlayerOne,
    setIsStraightFlushConfirmedPlayerOne,
    isRoyalFlushConfirmedPlayerOne,
    setIsRoyalFlushConfirmedPlayerOne,
    isFullHouseConfirmedPlayerOne,
    setIsFullHouseConfirmedPlayerOne,
    isQuadsConfirmedPlayerOne,
    setIsQuadsConfirmedPlayerOne,
    isPokerConfirmedPlayerOne,
    setIsPokerConfirmedPlayerOne,
    isOnePairConfirmedPlayerTwo,
    setIsOnePairConfirmedPlayerTwo
  };
}