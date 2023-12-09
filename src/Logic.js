import React, { useState, useEffect } from 'react';

export function CountingLogic({ dice }) {
  const initialScores = {
    scoreOne: '---',
    scoreTwo: '---',
    scoreThree: '---',
    scoreFour: '---',
    scoreFive: '---',
    scoreSix: '---',
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
        updatedScores[`score${i}`] = i;
      } else if (countValue === 5) {
        updatedScores[`score${i}`] = 2 * i;
      } else if (countValue === 6) {
        updatedScores[`score${i}`] = 2 * i;
      } else {
        updatedScores[`score${i}`] = '---';
      }
    }

    const schoolScoreCount = Object.values(countValues).reduce((acc, value) => acc + value, 0);
    
    setScores(updatedScores);
    setSchoolScoreCount(schoolScoreCount);
  }, [dice]);

  return { scores, schoolScoreCount };
}