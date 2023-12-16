import { useState, useEffect } from 'react';

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
  const [isOnePairConfirmed, setIsOnePairConfirmed] = useState(false);
  const [isTwoPairsConfirmed, setIsTwoPairsConfirmed] = useState(false);
  const [isTripleConfirmed, setIsTripleConfirmed] = useState(false)
  const [isStraightFlushConfirmed, setIsStraightFlushConfirmed] = useState(false)
  const [isRoyalFlushConfirmed, setIsRoyalFlushConfirmed] = useState(false)
  const [isFullHouseConfirmed, setIsFullHouseConfirmed] = useState(false)
  const [isQuadsConfirmed, setIsQuadsConfirmed] = useState(false)
  const [isPokerConfirmed, setIsPokerConfirmed] = useState(false)

  useEffect(() => {
    if (isOnePairConfirmed) {
      return;
    }
    if(isTwoPairsConfirmed){
      return
    }
    if( isTripleConfirmed){
      return
    }
    if (isStraightFlushConfirmed){
      return
    }
    if(isRoyalFlushConfirmed){
      return
    }
    if(isFullHouseConfirmed){
      return
    }
    if(isQuadsConfirmed){
      return
    }
    if(isPokerConfirmed){
      return
    }



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

    // If onePair is not confirmed, update the score
    if (!isOnePairConfirmed) {
      updatedScores.onePair = onePairScore !== 0 ? onePairScore : '---';
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
    if(!isTwoPairsConfirmed){
      updatedScores.twoPairs = pairsFound === 2 ? twoPairsScore : '---';
    }
    

    let tripleScore = 0;
    for (let i = 1; i <= 6; i++) {
      if (countValues[i] >= 3) {
        tripleScore += i * 3;
        break;
      }
    }
    if(!isTripleConfirmed){
      updatedScores.triple = tripleScore !== 0 ? tripleScore : '---';
    }


    let straightFlushScore = 0;
    const sortedValuesStraight = dice
      .map((die) => die.value)
      .sort((a, b) => a - b);
    if (sortedValuesStraight[0] === 1 && sortedValuesStraight[4] === 5) {
      straightFlushScore = 15;
    }

    if(!isStraightFlushConfirmed) {
      updatedScores.straightFlush =
      straightFlushScore !== 0 ? straightFlushScore : '---';
    }


    let royalFlushScore = 0;
    const sortedValuesRoyal = dice
      .map((die) => die.value)
      .sort((a, b) => a - b);
    if (sortedValuesRoyal[0] === 2 && sortedValuesRoyal[4] === 6) {
      royalFlushScore = 30;
    }

    if(!isRoyalFlushConfirmed){
      updatedScores.royalFlush = royalFlushScore !== 0 ? royalFlushScore : '---';
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

      if(!isFullHouseConfirmed){
        updatedScores.fullHouse = fullHouseScore !== 0 ? fullHouseScore : '---';
      }


    let quadsScore = 0;
    for (let i = 1; i <= 6; i++) {
      if (countValues[i] === 4) {
        quadsScore += 50 + i * 4;
      }
    }

      if(!isQuadsConfirmed){
        updatedScores.quads = quadsScore !== 0 ? quadsScore : '---';
      }


    let pokerScore = 0;
    for (let i = 1; i <= 6; i++) {
      if (countValues[i] === 5) {
        pokerScore += 100 + i * 4;
      }
    }

      if(!isPokerConfirmed){
        updatedScores.poker = pokerScore !== 0 ? pokerScore : '---';
      }

    const schoolScoreCount =
      Object.values(countValues).reduce((acc, value) => acc + value, 0) -
      countValues[onePairScore / 2];

    setScores(updatedScores);
    setSchoolScoreCount(schoolScoreCount);
  }, [dice, isOnePairConfirmed, isTwoPairsConfirmed, isTripleConfirmed, setIsTripleConfirmed, isStraightFlushConfirmed, setIsStraightFlushConfirmed, isRoyalFlushConfirmed, setIsRoyalFlushConfirmed, isFullHouseConfirmed, setIsFullHouseConfirmed, isQuadsConfirmed, setIsQuadsConfirmed, isPokerConfirmed, setIsPokerConfirmed]);

  return {
    scores,
    schoolScoreCount,
    isOnePairConfirmed,
    setIsOnePairConfirmed,
    isTwoPairsConfirmed,
    setIsTwoPairsConfirmed,
    isTripleConfirmed,
    setIsTripleConfirmed,
    isStraightFlushConfirmed,
    setIsStraightFlushConfirmed,
    isRoyalFlushConfirmed,
    setIsRoyalFlushConfirmed,
    isFullHouseConfirmed,
    setIsFullHouseConfirmed,
    isQuadsConfirmed,
    setIsQuadsConfirmed,
    isPokerConfirmed,
    setIsPokerConfirmed
  };
}