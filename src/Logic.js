  import { useState, useEffect, useCallback } from 'react';

  export function CountingLogic({ dice, currentPlayer, setCurrentPlayer }) {
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
        if (count === 3) {
          return 0;
        }
        const multiplier = count === 1 ? 2 : count === 2 ? 1 : count === 4 ? -1 : count === 5 ? -2 : 'chuj';
        return 0 - value * multiplier;
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
    

      console.log(scores)
      let onePairScore = 0;
      for (let i = 1; i <= 6; i++) {
        if (countValues[i] >= 2) {
          onePairScore = i * 2;
          break;
        }
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

    }, [dice, currentPlayer]);

    return {
      scores,
      pickScore,
    };
  }
