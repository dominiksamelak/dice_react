  import { useState, useEffect, useCallback } from 'react';

  export function CountingLogic({ dice, currentPlayer, setCurrentPlayer, doubleScores, setDoubleScores }) {
    const initialScores = {
      playerOneScores: {
        1: '---',
        2: '---',
        3: '---',
        4: '---',
        5: '---',
        6: '---',
        onePair: '---',
        twoPairs: '---',
        triple: '---',
        straightFlush: '---',
        royalFlush: '---',
        fullHouse: '---',
        quads: '---',
        poker: '---',
        is1Confirmed: false,
        is2Confirmed: false,
        is3Confirmed: false,
        is4Confirmed: false,
        is5Confirmed: false,
        is6Confirmed: false,
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
        1: '---',
        2: '---',
        3: '---',
        4: '---',
        5: '---',
        6: '---',
        is1Confirmed: false,
        is2Confirmed: false,
        is3Confirmed: false,
        is4Confirmed: false,
        is5Confirmed: false,
        is6Confirmed: false,
        onePair: '---',
        twoPairs: '---',
        triple: '---',
        straightFlush: '---',
        royalFlush: '---',
        fullHouse: '---',
        quads: '---',
        poker: '---',
        is1Confirmed: false,
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
    
        // Initialize the player's scores if not already present
        updatedScores[`player${playerString}Scores`] =
          updatedScores[`player${playerString}Scores`] || {};
    
        // Preserve existing scores when switching players
        for (let i = 1; i <= 6; i++) {
          const scoreKey = i.toString();
          const isConfirmedKey = `is${i}Confirmed`;
    
          if (currentPlayer === player) {
            // Preserve existing score when switching players
            updatedScores[`player${playerString}Scores`][scoreKey] =
              updatedScores[`player${playerString}Scores`][scoreKey] || null;
          }
    
          // Update the confirmation status based on the clicked scoreType
          updatedScores[`player${playerString}Scores`][isConfirmedKey] =
            scoreType === isConfirmedKey || updatedScores[`player${playerString}Scores`][isConfirmedKey];
    
          // Exclude updating the score if isConfirmed is already true
          if (updatedScores[`player${playerString}Scores`][isConfirmedKey]) {
            continue;
          }
    
          // Update the score based on the scoreType
          updatedScores[`player${playerString}Scores`][scoreKey] =
            updatedScores[`player${playerString}Scores`][scoreKey] || null;
        }
    
        // Additional properties like isOnePairConfirmed, isTwoPairsConfirmed, etc.
        updatedScores[`player${playerString}Scores`][
          `is${scoreType.charAt(0).toUpperCase()}${scoreType.slice(1)}Confirmed`
        ] = true;
    
        setCurrentPlayer((prevPlayer) => newPlayer);
        return updatedScores;
      });
    
      // After updating isConfirmed, stop further score calculation by returning from the function.
      // This assumes that score calculation is performed in the useEffect hook.
      return;
    }, [setScores, currentPlayer, setCurrentPlayer]);
    
    
    

    useEffect(() => {
      const countValues = {};
      for (let i = 1; i <= 6; i++) {
        countValues[i] = dice.filter((die) => die.value === i).length;
      }

      const calculateScore = (count, value) => {
        // if (count === 3) {
        //   const result = 0; // Returning 0 instead of null
        //   console.log('Result:', result);
        //   return result;
        // }
      
        let multiplier;

        if (count === 1) {
          multiplier = 2;
        } else if (count === 2) {
          multiplier = 1;
        } else if (count === 4) {
          multiplier = -1;
        } else if (count === 5) {
          multiplier = -2;
        } else if (count === 3) {
          multiplier = 0;
        }   else {
          multiplier = 'chuj';
        }
     
        // Ensure that the result is a numeric value
        let result = 0 - value * multiplier;

        return result

      };

    // Calculate scores for one through six
    for (let i = 1; i <= 6; i++) {
      const countValue = countValues[i];
      const scoreKey = i.toString(); // Convert the number to a string for the key
    
      const isConfirmedKey = `is${i}Confirmed`;
    
      // Ensure that the player's scores object is initialized
      const playerString = currentPlayer === 1 ? 'One' : 'Two';
      scores[`player${playerString}Scores`] =
        scores[`player${playerString}Scores`] || {};
    
      // Check if the score is confirmed and not null, continue to the next iteration
      if (
        scores[`player${playerString}Scores`][isConfirmedKey] === true
      ) {
        continue;
      }
    
      // If the score is not confirmed, calculate the score
      const scoreToAdd = calculateScore(countValue, i);
    
      // Update the score for the correct player
      scores[`player${playerString}Scores`][scoreKey] = scoreToAdd;
    }
    
      let highestPair = 0;

      // Calculate the two-pairs score based on face value
      for (let i = 1; i <= 6; i++) {
        if (countValues[i] >= 2) {
          if (i > highestPair) {
            highestPair = i;
          }
        }
      }

      let onePairScore = highestPair * 2;

      // If onePair is not confirmed, update the score
        if (currentPlayer === 1 && !scores.playerOneScores.isOnePairConfirmed) {
          if(doubleScores){
            scores.playerOneScores.onePair =
            onePairScore !== 0 ? 2 * onePairScore : '---';
          } else {
            scores.playerOneScores.onePair =
            onePairScore !== 0 ? onePairScore : '---';
          }
        }

        if (currentPlayer === 2 && !scores.playerTwoScores.isOnePairConfirmed) {
          if(doubleScores){
            scores.playerTwoScores.onePair =
            onePairScore !== 0 ? 2 * onePairScore : '---';
          } else {
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


      if (currentPlayer === 1 && !scores.playerOneScores.isTwoPairsConfirmed) {
        if(doubleScores){
          scores.playerOneScores.twoPairs =
          pairsFound === 2 ? 2 * twoPairsScore : '---';
        } else {
          scores.playerOneScores.twoPairs =
          pairsFound === 2 ? twoPairsScore : '---';
        }
      }

      if (currentPlayer === 2 && !scores.playerTwoScores.isTwoPairsConfirmed) {
        if(doubleScores){
          scores.playerTwoScores.twoPairs =
          pairsFound === 2 ? 2 * twoPairsScore : '---';
        } else  {
          scores.playerTwoScores.twoPairs =
          pairsFound === 2 ? twoPairsScore : '---';
        }
      }


      let tripleScore = 0;
      for (let i = 1; i <= 6; i++) {
        if (countValues[i] >= 3) {
          tripleScore += i * 3;
          break;
        }
      }

      if (currentPlayer === 1 && !scores.playerOneScores.isTripleConfirmed) {
        if(doubleScores){
          scores.playerOneScores.triple = 2 * tripleScore !== 0 ? tripleScore : '---';
        } else {
          scores.playerOneScores.triple = tripleScore !== 0 ? tripleScore : '---';
        }
      }
      if(doubleScores){
        if (currentPlayer === 2 && !scores.playerTwoScores.isTripleConfirmed) {
          scores.playerTwoScores.triple = 2 * tripleScore !== 0 ? tripleScore : '---';
        } else {
          scores.playerTwoScores.triple = tripleScore !== 0 ? tripleScore : '---';
        }
      }

      let straightFlushScore = 0;
      const sortedValuesStraight = dice.map((die) => die.value).sort((a, b) => a - b);

      // Check if the sorted values are [1, 2, 3, 4, 5]
      const isStraightFlush = sortedValuesStraight.join('') === '12345';

      if (isStraightFlush) {
        // Only calculate the score if it's a straight flush
        straightFlushScore = 15; // Adjust this value as needed
      }

      if (currentPlayer === 1 && !scores.playerOneScores.isStraightFlushConfirmed) {
        if (doubleScores) {
          scores.playerOneScores.straightFlush =
            2 * straightFlushScore !== 0 ? straightFlushScore : '---';
        } else {
          scores.playerOneScores.straightFlush =
            straightFlushScore !== 0 ? straightFlushScore : '---';
        }
      }

      if (currentPlayer === 2 && !scores.playerTwoScores.isStraightFlushConfirmed) {
        if (doubleScores) {
          scores.playerTwoScores.straightFlush =
            2 * straightFlushScore !== 0 ? straightFlushScore : '---';
        } else {
          scores.playerTwoScores.straightFlush =
            2 * straightFlushScore !== 0 ? straightFlushScore : '---';
        }
      }

      let royalFlushScore = 0;
      const sortedValuesRoyal = dice
        .map((die) => die.value)
        .sort((a, b) => a - b);
      if (sortedValuesRoyal[0] === 2 && sortedValuesRoyal[4] === 6) {
        royalFlushScore = 30;
      }

      if (currentPlayer === 1 && !scores.playerOneScores.isRoyalFlushConfirmed) {
        if(doubleScores){
          scores.playerOneScores.royalFlush =
          royalFlushScore !== 0 ? 2 * royalFlushScore : '---';
        } else {
          scores.playerOneScores.royalFlush =
          royalFlushScore !== 0 ? royalFlushScore : '---';
        }
      }
      if (currentPlayer === 2 && !scores.playerTwoScores.isRoyalFlushConfirmed) {
        if(doubleScores){
          scores.playerTwoScores.royalFlush =
          royalFlushScore !== 0 ? 2 * royalFlushScore : '---';
        } else {
          scores.playerTwoScores.royalFlush =
          royalFlushScore !== 0 ? royalFlushScore : '---';
        }
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
        if(doubleScores){
          scores.playerOneScores.fullHouse =
          fullHouseScore !== 0 ? 2 * fullHouseScore : '---';
        } else {
          scores.playerOneScores.fullHouse =
          fullHouseScore !== 0 ? fullHouseScore : '---';
        }
      }
      if (currentPlayer === 2 && !scores.playerTwoScores.isFullHouseConfirmed) {
        if(doubleScores){
          scores.playerTwoScores.fullHouse =
          fullHouseScore !== 0 ? 2 * fullHouseScore : '---';
        } else {
          scores.playerTwoScores.fullHouse =
          fullHouseScore !== 0 ? fullHouseScore : '---';
        }
      }

      let quadsScore = 0;
      for (let i = 1; i <= 6; i++) {
        if (countValues[i] === 4) {
          if (doubleScores){
            quadsScore += 50 + 2 * (i * 4);
          } else {
            quadsScore += 50 + i * 4;
          }
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
          if(doubleScores){
            pokerScore += 100 + 2 * (i * 4);
          } else {
            pokerScore += 100 + i * 4;
          }
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

    }, [dice, currentPlayer]);

    return {
      scores,
      pickScore,
    };
  }
