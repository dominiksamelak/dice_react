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
    twoPairs: '---'
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
    for (let i = 6; i >= 1; i--) {
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
    console.log(pairsFound)
    console.log(countValues)
    // If two pairs are not found, reset twoPairsScore to 0
    if (pairsFound !== 2) {
      twoPairsScore = 0;
    }

    // Add the one-pair score if only one pair is found
    if (pairsFound === 1 && onePairScore !== '---') {
      twoPairsScore += onePairScore;
    }

    updatedScores.twoPairs = pairsFound === 2 ? twoPairsScore : '---';
    const schoolScoreCount = Object.values(countValues).reduce((acc, value) => acc + value, 0) - countValues[onePairScore / 2];
    
    setScores(updatedScores);
    setSchoolScoreCount(schoolScoreCount);
  }, [dice]);

  return { scores, schoolScoreCount };
}
