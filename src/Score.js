import React, { useState, useEffect } from 'react';
export default function Score(props) {
  const { scores, onPick, currentPlayer, setCurrentPlayer } = props;
  const [selectedWorldScores, setSelectedWorldScores] = useState({
    playerOne: {
      onePair: false,
      twoPairs: false,
      triple: false,
      straightFlush: false,
      royalFlush: false,
      fullHouse: false,
      quads: false,
      poker: false,
    },
    playerTwo: {
      onePair: false,
      twoPairs: false,
      triple: false,
      straightFlush: false,
      royalFlush: false,
      fullHouse: false,
      quads: false,
      poker: false,
    },
  });
  const [pickedSchoolScores, setPickedSchoolScores] = useState({
    playerOne: 0,
    playerTwo: 0,
  });
  const [disabledButtons, setDisabledButtons] = useState({
    playerOne: {},
    playerTwo: {},
  });

  useEffect(() => {
    const schoolScoreCount = Object.keys(
      scores[`${currentPlayer === 1 ? 'playerOne' : 'playerTwo'}Scores`]
    )
      .filter(
        (scoreType) =>
          scoreType.startsWith('is') && scoreType.endsWith('Confirmed')
      )
      .reduce(
        (count, scoreType) =>
          scores[`${currentPlayer === 1 ? 'playerOne' : 'playerTwo'}Scores`][
            scoreType
          ]
            ? count + 1
            : count,
        0
      );

    setPickedSchoolScores((prevState) => ({
      ...prevState,
      [currentPlayer === 1 ? 'playerOne' : 'playerTwo']: schoolScoreCount,
    }));
  }, []);

  const handlePickButtonClick = (scoreType) => {
    // Check if the score is already picked for the current player
    if (
      !scores[`${currentPlayer === 1 ? 'playerOne' : 'playerTwo'}Scores`][
        scoreType
      ]
    ) {
      // Increment the pickedSchoolScores for the current player, so when it reaches 3, player can pick scores from div world
      setPickedSchoolScores((prevState) => ({
        ...prevState,
        [currentPlayer === 1 ? 'playerOne' : 'playerTwo']:
          prevState[currentPlayer === 1 ? 'playerOne' : 'playerTwo'] + 1,
      }));
    }

    // Disable the button for the current scoreType for the current player
    setDisabledButtons((prevState) => ({
      ...prevState,
      [currentPlayer === 1 ? 'playerOne' : 'playerTwo']: {
        ...prevState[currentPlayer === 1 ? 'playerOne' : 'playerTwo'],
        [scoreType]: true,
      },
    }));

    // Trigger the onPick callback
    onPick(scoreType);

    // Switch the currentPlayer after the onPick callback is triggered
    setCurrentPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1));
    console.log(scores);
  };

  const renderPlayerScores = (player) => {
    const playerScores = scores[`${player}Scores`];
    const schoolSum = [1, 2, 3, 4, 5, 6].reduce((sum, num) => {
      const score = playerScores[num];
      const isScorePicked = disabledButtons[player][`is${num}Confirmed`];
      return isScorePicked
        ? sum + (isNaN(score) || score === null ? 0 : score)
        : sum;
    }, 0);

    const handleWorldScoreButtonClick = (scoreType) => {
      setSelectedWorldScores((prevSelected) => ({
        ...prevSelected,
        [player]: {
          ...prevSelected[player],
          [scoreType]: true,
        },
      }));
      props.onPick(scoreType);
    };
    const calculateWorldScoresSum = () => {
      let sum = Object.keys(selectedWorldScores[player]).reduce(
        (partialSum, scoreType) => {
          const score = scores[`${player}Scores`][scoreType];
          if (
            !isNaN(score) &&
            score !== null &&
            selectedWorldScores[player][scoreType]
          ) {
            return partialSum + score;
          }
          return partialSum;
        },
        0
      );

      // Subtract 100 if schoolSum is below 0
      if (schoolSum < 0) {
        sum -= 100;
      }
      return sum;
    };
    const handleCrossOutButtonClick = (scoreType) => {
      // Check if there are three scores picked in the school
      if (pickedSchoolScores[player] >= 3) {
        // Update the corresponding score to 'X'
        const updatedScores = { ...scores };
        updatedScores[`${player}Scores`][scoreType] = 'X';

        // Trigger the onPick callback with the updated score
        props.onPick(scoreType, 'X', player);

        // Switch the currentPlayer after the onPick callback is triggered
        setCurrentPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1));
      }
    };

    return (
      <div className='school-scores-container' key={player}>
        <h2>{`Player ${player.slice(-3)} Score`}</h2>
        <div className="school-scores">
          <ul>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div className='player-scores' key={num}>
                <p className='sscore'>{`${num}: ${
                  isNaN(playerScores[num]) || playerScores[num] === null
                    ? '---'
                    : playerScores[num]
                }`}</p>
                <button
                  className="pick-button"
                  onClick={() => {  handlePickButtonClick(`is${num}Confirmed`)} }
                  disabled={
                    currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) ||
                    isNaN(playerScores[num]) ||
                    disabledButtons[player][`is${num}Confirmed`]
                  }
                  
                >
                  Pick
                </button>
                  {playerScores[`is${num}Confirmed`] && (
                    <span className="checkmark">&#10003;</span>
                  )}
              </div>
            ))}
          </ul>

        </div>
        <p className='sum-score'>{`School score: ${schoolSum}`}</p>
        <div className="world-scores">
          <div className='single-world-score'>
            <p>1P: {scores[`${player}Scores`].onePair}</p>
            <button
              className="pick-button"
              onClick={() => handleWorldScoreButtonClick('onePair')}
              disabled={
                currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) ||
                isNaN(playerScores?.onePair) ||
                pickedSchoolScores[player] < 3 ||
                disabledButtons[player].onePair ||
                scores[`${currentPlayer === 1 ? 'playerOne' : 'playerTwo'}Scores`]
                  .isOnePairConfirmed
              }
            >
              Pick
            </button>
            <button
              className="cross-out"
              onClick={() => handleCrossOutButtonClick('onePair')}
              disabled={
                currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) ||
                pickedSchoolScores[player] < 3
              }
            >
              X
            </button>
            {selectedWorldScores[player].onePair && (
              <span className="checkmark">&#10003;</span>
            )}
          </div>

          <div className='single-world-score'>
            <p>2P: {scores[`${player}Scores`].twoPairs}</p>
            <button
              className="pick-button"
              onClick={() => handleWorldScoreButtonClick('twoPairs')}
              disabled={
                currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) ||
                isNaN(playerScores?.twoPairs) ||
                pickedSchoolScores[player] < 3 ||
                disabledButtons[player].twoPairs ||
                scores[`${currentPlayer === 1 ? 'playerOne' : 'playerTwo'}Scores`]
                  .isTwoPairsConfirmed
              }
            >
              Pick
            </button>
            <button
              className="cross-out"
              onClick={() => handleCrossOutButtonClick('twoPairs')}
              disabled={
                currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) ||
                pickedSchoolScores[player] < 3
              }
            >
              X
            </button>
            {selectedWorldScores[player].twoPairs && (
              <span className="checkmark">&#10003;</span>
            )}
          </div>

          <div className='single-world-score'>
            <p>T: {scores[`${player}Scores`].triple}</p>
            <button
              className="pick-button"
              onClick={() => handleWorldScoreButtonClick('triple')}
              disabled={
                currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) ||
                isNaN(playerScores?.triple) ||
                pickedSchoolScores[player] < 3 ||
                disabledButtons[player].triple ||
                scores[`${currentPlayer === 1 ? 'playerOne' : 'playerTwo'}Scores`]
                  .isTripleConfirmed
              }
            >
              Pick
            </button>
            <button
              className="cross-out"
              onClick={() => handleCrossOutButtonClick('triple')}
              disabled={
                currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) ||
                pickedSchoolScores[player] < 3
              }
            >
              X
            </button>
            {selectedWorldScores[player].triple && (
              <span className="checkmark">&#10003;</span>
            )}
          </div>
          
          <div className='single-world-score'>
            <p>SF: {scores[`${player}Scores`].straightFlush}</p>
            <button
              className="pick-button"
              onClick={() => handleWorldScoreButtonClick('straightFlush')}
              disabled={
                currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) ||
                isNaN(playerScores?.straightFlush) ||
                pickedSchoolScores[player] < 3 ||
                disabledButtons[player].straightFlush ||
                scores[`${currentPlayer === 1 ? 'playerOne' : 'playerTwo'}Scores`]
                  .isStraightFlushConfirmed
              }
            >
              Pick
            </button>
            <button
              className="cross-out"
              onClick={() => handleCrossOutButtonClick('straightFlush')}
              disabled={
                currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) ||
                pickedSchoolScores[player] < 3
              }
            >
              X
            </button>
            {selectedWorldScores[player].straightFlush && (
              <span className="checkmark">&#10003;</span>
            )}
          </div>
          
          <div className='single-world-score'>
            <p>RF: {scores[`${player}Scores`].royalFlush}</p>
            <button
              className="pick-button"
              onClick={() => handleWorldScoreButtonClick('royalFlush')}
              disabled={
                currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) ||
                isNaN(playerScores?.royalFlush) ||
                pickedSchoolScores[player] < 3 ||
                disabledButtons[player].royalFlush ||
                scores[`${currentPlayer === 1 ? 'playerOne' : 'playerTwo'}Scores`]
                  .isRoyalFlushConfirmed
              }
            >
              Pick
            </button>
            <button
              className="cross-out"
              onClick={() => handleCrossOutButtonClick('royalFlush')}
              disabled={
                currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) ||
                pickedSchoolScores[player] < 3
              }
            >
              X
            </button>
            {selectedWorldScores[player].royalFlush && (
              <span className="checkmark">&#10003;</span>
            )}
          </div>
         
          <div className='single-world-score'>
            <p>FH: {scores[`${player}Scores`].fullHouse}</p>
            <button
              className="pick-button"
              onClick={() => handleWorldScoreButtonClick('fullHouse')}
              disabled={
                currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) ||
                isNaN(playerScores?.fullHouse) ||
                pickedSchoolScores[player] < 3 ||
                disabledButtons[player].fullHouse ||
                scores[`${currentPlayer === 1 ? 'playerOne' : 'playerTwo'}Scores`]
                  .isFullHouseConfirmed
              }
            >
              Pick
            </button>
            <button
              className="cross-out"
              onClick={() => handleCrossOutButtonClick('fullHouse')}
              disabled={
                currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) ||
                pickedSchoolScores[player] < 3
              }
            >
              X
            </button>
            {selectedWorldScores[player].fullHouse && (
              <span className="checkmark">&#10003;</span>
            )}
          </div>
         
          <div className='single-world-score'>
            <p>Q: {scores[`${player}Scores`].quads}</p>
            <button
              className="pick-button"
              onClick={() => handleWorldScoreButtonClick('quads')}
              disabled={
                currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) ||
                isNaN(playerScores?.quads) ||
                pickedSchoolScores[player] < 3 ||
                disabledButtons[player].quads ||
                scores[`${currentPlayer === 1 ? 'playerOne' : 'playerTwo'}Scores`]
                  .isQuadsConfirmed
              }
            >
              Pick
            </button>
            <button
              className="cross-out"
              onClick={() => handleCrossOutButtonClick('quads')}
              disabled={
                currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) ||
                pickedSchoolScores[player] < 3
              }
            >
              X
            </button>
            {selectedWorldScores[player].quads && (
              <span className="checkmark">&#10003;</span>
            )}
          </div>
         
          <div className='single-world-score'>
            <p>P: {scores[`${player}Scores`].poker}</p>
            <button
              className="pick-button"
              onClick={() => handleWorldScoreButtonClick('poker')}
              disabled={
                currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) ||
                isNaN(playerScores?.poker) ||
                pickedSchoolScores[player] < 3 ||
                disabledButtons[player].poker ||
                scores[`${currentPlayer === 1 ? 'playerOne' : 'playerTwo'}Scores`]
                  .isPokerConfirmed
              }
            >
              Pick
            </button>
            <button
              className="cross-out"
              onClick={() => handleCrossOutButtonClick('poker')}
              disabled={
                currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) ||
                pickedSchoolScores[player] < 3
              }
            >
              X
            </button>
            {selectedWorldScores[player].poker && (
              <span className="checkmark">&#10003;</span>
            )}
          </div>
         
        </div>
        <p>{`Total Score: ${calculateWorldScoresSum() + schoolSum}`}</p>
      </div>
    );
  };

  return (
    <main className="scores">
      {renderPlayerScores('playerOne')}
      {renderPlayerScores('playerTwo')}
    </main>
  );
}
