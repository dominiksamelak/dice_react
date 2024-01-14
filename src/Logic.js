import { useState, useEffect, useCallback } from 'react';

export function CountingLogic({ dice, currentPlayer, setCurrentPlayer }) {
  const initialScores = {
    playerOneScores: {
      school: ['---', '---', '---', '---', '---', '---', '---'],
      onePair: '---',
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
      isPokerConfirmed: false,
    },
    playerTwoScores: {
      school: ['---', '---', '---', '---', '---', '---', '---'],
      onePair: '---',
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
      isPokerConfirmed: false,
    },
  };

  const [scores, setScores] = useState(initialScores);

  const pickScore = useCallback((player, scoreType) => {
    
    setScores((prevScores) => {
      const updatedScores = { ...prevScores };
      const newPlayer = currentPlayer === 1 ? 2 : 1;
  
      // Convert player to One or Two
      const playerString = player === 1 ? 'One' : 'Two';
      console.log(playerString)
      // Initialize the player's scores if not already present
      updatedScores[`player${playerString}Scores`] = updatedScores[`player${playerString}Scores`] || {};
  
      // Initialize the specific score type if not already present
      updatedScores[`player${playerString}Scores`][scoreType] = updatedScores[`player${playerString}Scores`][scoreType] || null;
  
      // Update the isConfirmed property within playerScores
      updatedScores[`player${playerString}Scores`][`is${scoreType.charAt(0).toUpperCase()}${scoreType.slice(1)}Confirmed`] = true;
  
      console.log(updatedScores);
      setCurrentPlayer(prevPlayer => newPlayer)
      return updatedScores;
    });
    
  }, [setScores, currentPlayer, setCurrentPlayer]);

  useEffect(() => {
        const countValues = {};
    for (let i = 1; i <= 6; i++) {
      countValues[i] = dice.filter((die) => die.value === i).length;
    }

    for (let i = 1; i <= 6; i++) {
      const countValue = countValues[i];

      if(currentPlayer === 1){
        if (countValue === 1) {
          scores.playerOneScores.school[`${i}`] = -2 * i;    
        } else if (countValue === 2) {
          scores.playerOneScores.school[`${i}`] = -i;  
        } else if (countValue === 3) {
          scores.playerOneScores.school[`${i}`] = 0;    
        } else if (countValue === 4) {
          scores.playerOneScores.school[`${i}`] = i;  
        } else if (countValue === 5) {
          scores.playerOneScores.school[`${i}`] = i * 2;
        } else {
          scores.playerOneScores.school[`${i}`] = '---';         
        }
      } else if (currentPlayer === 2){
        if (countValue === 1) {
          scores.playerTwoScores.school[`${i}`] = -2 * i;
        } else if (countValue === 2) {
          scores.playerTwoScores.school[`${i}`] = -i;
        } else if (countValue === 3) {       
          scores.playerTwoScores.school[`${i}`] = 0;
        } else if (countValue === 4) {     
          scores.playerTwoScores.school[`${i}`] = i; // Updated to double the value for four of a kind
        } else if (countValue === 5) {
          scores.playerTwoScores.school[`${i}`] = i * 2; // Updated to double the value for five of a kind
        } else {  
          scores.playerTwoScores.school[`${i}`] = '---';
        }
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
      if (currentPlayer === 1 && !scores.playerOneScores.isOnePairConfirmed) {
        scores.playerOneScores.onePair =
          onePairScore !== 0 ? onePairScore : '---';
      }

      if (currentPlayer === 2 && !scores.playerTwoScores.isOnePairConfirmed) {
        scores.playerTwoScores.onePair =
          onePairScore !== 0 ? onePairScore : '---';
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


    if (currentPlayer === 1 && !scores.playerOneScores.isTwoPairsConfirmed) {
      scores.playerOneScores.twoPairs =
        pairsFound === 2 ? twoPairsScore : '---';
    }

    if (currentPlayer === 2 && !scores.playerTwoScores.isTwoPairsConfirmed) {
      scores.playerTwoScores.twoPairs =
        pairsFound === 2 ? twoPairsScore : '---';
    }


    let tripleScore = 0;
    for (let i = 1; i <= 6; i++) {
      if (countValues[i] >= 3) {
        tripleScore += i * 3;
        break;
      }
    }

    if (currentPlayer === 1 && !scores.playerOneScores.isTripleConfirmed) {
      scores.playerOneScores.triple = tripleScore !== 0 ? tripleScore : '---';
    }
    if (currentPlayer === 2 && !scores.playerTwoScores.isTripleConfirmed) {
      scores.playerTwoScores.triple = tripleScore !== 0 ? tripleScore : '---';
    }

    let straightFlushScore = 0;
    const sortedValuesStraight = dice
      .map((die) => die.value)
      .sort((a, b) => a - b);
    if (sortedValuesStraight[0] === 1 && sortedValuesStraight[4] === 5) {
      straightFlushScore = 15;
    }

    if (currentPlayer === 1 && !scores.playerOneScores.isStraightFlushConfirmed) {
      scores.playerOneScores.straightFlush =
        straightFlushScore !== 0 ? straightFlushScore : '---';
    }
    if (currentPlayer === 2 && !scores.playerTwoScores.isStraightFlushConfirmed) {
      scores.playerTwoScores.straightFlush =
        straightFlushScore !== 0 ? straightFlushScore : '---';
    }

    let royalFlushScore = 0;
    const sortedValuesRoyal = dice
      .map((die) => die.value)
      .sort((a, b) => a - b);
    if (sortedValuesRoyal[0] === 2 && sortedValuesRoyal[4] === 6) {
      royalFlushScore = 30;
    }

    if (currentPlayer === 1 && !scores.playerOneScores.isRoyalFlushConfirmed) {
      scores.playerOneScores.royalFlush =
        royalFlushScore !== 0 ? royalFlushScore : '---';
    }
    if (currentPlayer === 2 && !scores.playerTwoScores.isRoyalFlushConfirmed) {
      scores.playerTwoScores.royalFlush =
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

    if (currentPlayer === 1 && !scores.playerOneScores.isFullHouseConfirmed) {
      scores.playerOneScores.fullHouse =
        fullHouseScore !== 0 ? fullHouseScore : '---';
    }
    if (currentPlayer === 2 && !scores.playerTwoScores.isFullHouseConfirmed) {
      scores.playerTwoScores.fullHouse =
        fullHouseScore !== 0 ? fullHouseScore : '---';
    }

    let quadsScore = 0;
    for (let i = 1; i <= 6; i++) {
      if (countValues[i] === 4) {
        quadsScore += 50 + i * 4;
      }
    }

    if (currentPlayer === 1 && !scores.playerOneScores.isQuadsConfirmed) {
      scores.playerOneScores.quads = quadsScore !== 0 ? quadsScore : '---';
    }
    if (currentPlayer === 2 && !scores.playerTwoScores.isQuadsConfirmed) {
      scores.playerTwoScores.quads = quadsScore !== 0 ? quadsScore : '---';
    }

    let pokerScore = 0;
    for (let i = 1; i <= 6; i++) {
      if (countValues[i] === 5) {
        pokerScore += 100 + i * 4;
      }
    }

    if (currentPlayer === 1 && !scores.playerOneScores.isPokerConfirmed) {
      scores.playerOneScores.poker = pokerScore !== 0 ? pokerScore : '---';
    }
    if (currentPlayer === 2 && !scores.playerTwoScores.isPokerConfirmed) {
      scores.playerTwoScores.poker = pokerScore !== 0 ? pokerScore : '---';
    }
    // Update scores based on countValues and currentPlayer
    setScores((prevScores) => {
      const updatedScores = { ...prevScores };
      // ... (your existing scoring logic based on dice values and currentPlayer)

      return updatedScores;
    });
  }, [dice, currentPlayer,]);

  return {
    scores,
    pickScore,
  };
}
