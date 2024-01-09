import { useState, useEffect } from 'react';

export function CountingLogic({ dice, currentPlayer }) {

  const initialScores = {
    playerOneScores: {
      school: '---',
      onePair:  '---' ,
      twoPairs: '---',
      triple: '---',
      straightFlush: '---',
      royalFlush: '---',
      fullHouse: '---',
      quads: '---',
      poker: '---',
      isOnePairConfirmed: false,
      isTwoPairsConfirmed: false,
      isTripleConfirmed: false,
      isStraightFlushConfirmed: false,
      isRoyalFlushConfirmed: false,
      isFullHouseConfirmed: false,
      isQuadsConfirmed: false,
      isPokerConfirmed: false
    },
    playerTwoScores: {
      school: '---',
      onePair:  '---' ,
      twoPairs: '---',
      triple: '---',
      straightFlush: '---',
      royalFlush: '---',
      fullHouse: '---',
      quads: '---',
      poker: '---',
      isOnePairConfirmed: false,
      isTwoPairsConfirmed: false,
      isTripleConfirmed: false,
      isStraightFlushConfirmed: false,
      isRoyalFlushConfirmed: false,
      isFullHouseConfirmed: false,
      isQuadsConfirmed: false,
      isPokerConfirmed: false
    },
  };
  const [scores, setScores] = useState(initialScores);


  const [schoolScoreCount, setSchoolScoreCount] = useState(1);

  useEffect(() => {
    const countValues = {};
    for (let i = 1; i <= 6; i++) {
      countValues[i] = dice.filter((die) => die.value === i).length;
    }

    for (let i = 1; i <= 6; i++) {
      const countValue = countValues[i];
      if (countValue === 1) {
        scores.playerOneScores.school[`Score${i}`] = -2 * i;
        scores.playerTwoScores.school[`Score${i}`] = -2 * i;
      } else if (countValue === 2) {
        scores.playerOneScores.school[`Score${i}`] = -i;
        scores.playerTwoScores.school[`Score${i}`] = -i;
      } else if (countValue === 3) {
        scores.playerOneScores.school[`Score${i}`] = 0;
        scores.playerTwoScores.school[`Score${i}`] = 0;
      } else if (countValue === 4) {
        scores.playerOneScores.school[`Score${i}`] = i; 
        scores.playerTwoScores.school[`Score${i}`] = i;// Updated to double the value for four of a kind
      } else if (countValue === 5) {
        scores.playerOneScores.school[`Score${i}`] = i * 2;
        scores.playerTwoScores.school[`Score${i}`] = i * 2; // Updated to double the value for five of a kind
      } else {
        scores.playerOneScores.school[`Score${i}`] = '---';
        scores.playerTwoScores.school[`Score${i}`] = '---';
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
      if (!scores.playerOneScores.isOnePairConfirmed) {
        scores.playerOneScores.onePair =
          onePairScore !== 0 ? onePairScore : '---';
      }
    } 
    if (currentPlayer === 2) {
      if (!scores.playerTwoScores.isOnePairConfirmed) {
        scores.playerTwoScores.onePair =
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
    if (!scores.playerOneScores.isTwoPairsConfirmed) {
      scores.playerOneScores.twoPairs =
        pairsFound === 2 ? twoPairsScore : '---';
    }

    let tripleScore = 0;
    for (let i = 1; i <= 6; i++) {
      if (countValues[i] >= 3) {
        tripleScore += i * 3;
        break;
      }
    }
    if (!scores.playerOneScores.isTripleConfirmed) {
      scores.playerOneScores.triple = tripleScore !== 0 ? tripleScore : '---';
    }

    let straightFlushScore = 0;
    const sortedValuesStraight = dice
      .map((die) => die.value)
      .sort((a, b) => a - b);
    if (sortedValuesStraight[0] === 1 && sortedValuesStraight[4] === 5) {
      straightFlushScore = 15;
    }

    if (!scores.playerOneScores.isStraightFlushConfirmed) {
      scores.playerOneScores.straightFlush =
        straightFlushScore !== 0 ? straightFlushScore : '---';
    }

    let royalFlushScore = 0;
    const sortedValuesRoyal = dice
      .map((die) => die.value)
      .sort((a, b) => a - b);
    if (sortedValuesRoyal[0] === 2 && sortedValuesRoyal[4] === 6) {
      royalFlushScore = 30;
    }

    if (!scores.playerOneScores.isRoyalFlushConfirmed) {
      scores.playerOneScores.royalFlush =
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

    if (!scores.playerOneScores.isFullHouseConfirmed) {
      scores.playerOneScores.fullHouse =
        fullHouseScore !== 0 ? fullHouseScore : '---';
    }

    let quadsScore = 0;
    for (let i = 1; i <= 6; i++) {
      if (countValues[i] === 4) {
        quadsScore += 50 + i * 4;
      }
    }

    if (!scores.playerOneScores.isQuadsConfirmed) {
      scores.playerOneScores.quads = quadsScore !== 0 ? quadsScore : '---';
    }

    let pokerScore = 0;
    for (let i = 1; i <= 6; i++) {
      if (countValues[i] === 5) {
        pokerScore += 100 + i * 4;
      }
    }

    if (!scores.playerOneScores.isPokerConfirmed) {
      scores.playerOneScores.poker = pokerScore !== 0 ? pokerScore : '---';
    }

    // const schoolScoreCount =
    //   Object.values(countValues).reduce((acc, value) => acc + value, 0) -
    //   countValues[onePairScore / 2];

    const updatedScores = {
      playerOneScores: {
        school: scores.playerOneScores.school,
        onePair: scores.playerOneScores.onePair,
        twoPairs: scores.playerOneScores.twoPairs,
        triple: scores.playerOneScores.triple,
        straightFlush: scores.playerOneScores.straightFlush,
        royalFlush: scores.playerOneScores.royalFlush,
        fullHouse: scores.playerOneScores.fullHouse,
        quads: scores.playerOneScores.quads,
        poker: scores.playerOneScores.poker,
      },
      playerTwoScores: {
        school: scores.playerTwoScores.school,
        onePair: scores.playerTwoScores.onePair,
        twoPairs: scores.playerTwoScores.twoPairs,
        triple: scores.playerTwoScores.triple,
        straightFlush: scores.playerTwoScores.straightFlush,
        royalFlush: scores.playerTwoScores.royalFlush,
        fullHouse: scores.playerTwoScores.fullHouse,
        quads: scores.playerTwoScores.quads,
        poker: scores.playerTwoScores.poker,
      },
    };
    // setSchoolScoreCount(schoolScoreCount);
    setScores(updatedScores)
  }, [
    dice, scores.playerOneScores.isOnePairConfirmed, scores.playerOneScores.isTwoPairsConfirmed, scores.playerOneScores.isTripleConfirmed, scores.playerOneScores.isStraightFlushConfirmed, scores.playerOneScores.isRoyalFlushConfirmed, scores.playerOneScores.isFullHouseConfirmed, scores.playerOneScores.isQuadsConfirmed, scores.playerOneScores.isPokerConfirmed,
    scores.playerTwoScores.isOnePairConfirmed, scores.playerTwoScores.isTwoPairsConfirmed, scores.playerTwoScores.isTripleConfirmed, scores.playerTwoScores.isStraightFlushConfirmed, scores.playerTwoScores.isRoyalFlushConfirmed, scores.playerTwoScores.isFullHouseConfirmed, scores.playerTwoScores.isQuadsConfirmed, scores.playerTwoScores.isPokerConfirmed
  ]);

  return {
    scores,

  };
}