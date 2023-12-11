import { useState, useEffect } from 'react';

export function CountingLogic({ dice }) {
  const initialScores = {
    scoreOne: '---',
    scoreTwo: '---',
    scoreThree: '---',
    scoreFour: '---',
    scoreFive: '---',
    scoreSix: '---',
    onePair: '---',
    twoPairs: '---',
    triple: '---',
    straightFlush: '---'
  };

  const [scores, setScores] = useState(initialScores);
  const [schoolScoreCount, setSchoolScoreCount] = useState(0);

  useEffect(() => {
    const countValues = {};
    for (let i = 1; i <= 6; i++) {
      countValues[i] = dice.filter((die) => die.value === i).length;
    }

    const updatedScores = {};
    for (let i = 1; i <= 6; i++) {
      const countValue = countValues[i];
      if (countValue === 1) {
        updatedScores[`score${i}`] = -2 * i;
      } else if (countValue === 2) {
        updatedScores[`score${i}`] = -i;
      } else if (countValue === 3) {
        updatedScores[`score${i}`] = 0;
      } else if (countValue === 4) {
        updatedScores[`score${i}`] = i; // Updated to double the value for four of a kind
      } else if (countValue === 5) {
        updatedScores[`score${i}`] = i * 2; // Updated to double the value for five of a kind
      } else {
        updatedScores[`score${i}`] = '---';
      }
    }

    // Calculate the one-pair score based on face value
    let onePairScore = 0;
    for (let i = 1; i <= 6; i++) {
      if (countValues[i] >= 2) {
        onePairScore = i * 2;
        break;
      }
    }
    updatedScores.onePair = onePairScore !== 0 ? onePairScore : '---';
   
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
    }
    // If two pairs are not found, reset twoPairsScore to 0
    if (pairsFound !== 2) {
      twoPairsScore = 0;
    }

    // Add the one-pair score if only one pair is found
    if (pairsFound === 1 && onePairScore !== '---') {
      twoPairsScore += onePairScore;
    }

    updatedScores.twoPairs = pairsFound === 2 ? twoPairsScore : '---';

    let tripleScore = 0;
    for (let i = 1; i <= 6; i++) {
      if (countValues[i] >= 3) {
        tripleScore += i * 3;
        break;
      }
    }
    
    updatedScores.triple = tripleScore !== 0 ? tripleScore : '---';


    let straightFlushScore = 0
    const sortedValuesStraight = dice.map((die) => die.value).sort((a, b) => a - b);
    if (
      (sortedValuesStraight[0] === 1 && sortedValuesStraight[4] === 5)
    ) {
      straightFlushScore = 15;
    }

    updatedScores.straightFlush = straightFlushScore !== 0 ? straightFlushScore : '---';

    let royalFlushScore = 0
    const sortedValuesRoyal = dice.map((die) => die.value).sort((a, b) => a - b);
    if (
      (sortedValuesRoyal[0] === 2 && sortedValuesRoyal[4] === 6)
    ) {
      royalFlushScore = 30;
    }
  
    updatedScores.royalFlush = royalFlushScore !== 0 ? royalFlushScore : '---';

    let fullHouseScore = 0;

    const threeOfAKind = Object.keys(countValues).find((key) => countValues[key] === 3);
    const pair = Object.keys(countValues).find((key) => countValues[key] === 2);

    if (threeOfAKind && pair) {
      // If both a three of a kind and a pair are present, it's a full house
      fullHouseScore = threeOfAKind * 3 + pair * 2;
    }

    updatedScores.fullHouse = fullHouseScore !== 0 ? fullHouseScore : '---';

    let quadsScore = 0
    for (let i = 1; i <= 6; i++) {
      if (countValues[i] === 4) {
        quadsScore += 50 + i * 4;
      }
    }

    updatedScores.quads = quadsScore !== 0 ? quadsScore : '---';

    let pokerScore = 0
    for (let i = 1; i <= 6; i++) {
      if (countValues[i] === 5) {
        pokerScore += 100 + i * 4;
      }
    }

    updatedScores.poker = pokerScore !== 0 ? pokerScore : '---';
    const schoolScoreCount = Object.values(countValues).reduce((acc, value) => acc + value, 0) - countValues[onePairScore / 2];


    setScores(updatedScores);
    setSchoolScoreCount(schoolScoreCount);
  }, [dice]);

  return { scores, schoolScoreCount };
}
