import React, { useState, useEffect } from 'react';
export default function Score(props) {
  const { scores, onPick, currentPlayer, setCurrentPlayer } = props;
  const [pickedSchoolScores, setPickedSchoolScores] = useState({
    playerOne: 0,
    playerTwo: 0,
  });
  const [disabledButtons, setDisabledButtons] = useState({
    playerOne: {},
    playerTwo: {},
  });

  useEffect(() => {
    const schoolScoreCount = Object.keys(scores[`${currentPlayer === 1 ? 'playerOne' : 'playerTwo'}Scores`])
      .filter(scoreType => scoreType.startsWith('is') && scoreType.endsWith('Confirmed'))
      .reduce((count, scoreType) => (scores[`${currentPlayer === 1 ? 'playerOne' : 'playerTwo'}Scores`][scoreType] ? count + 1 : count), 0);

    setPickedSchoolScores(prevState => ({
      ...prevState,
      [currentPlayer === 1 ? 'playerOne' : 'playerTwo']: schoolScoreCount,
    }));
  }, []);

  const handlePickButtonClick = (scoreType) => {
    // Check if the score is already picked for the current player
    if (!scores[`${currentPlayer === 1 ? 'playerOne' : 'playerTwo'}Scores`][scoreType]) {
      // Increment the pickedSchoolScores for the current player
      setPickedSchoolScores(prevState => ({
        ...prevState, 
        [currentPlayer === 1 ? 'playerOne' : 'playerTwo']: prevState[currentPlayer === 1 ? 'playerOne' : 'playerTwo'] + 1,
      }));
    }
  
    // Disable the button for the current scoreType for the current player
    setDisabledButtons(prevState => ({
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
  };
 console.log(pickedSchoolScores)
  const  renderPlayerScores = (player) => {
    const playerScores = scores[`${player}Scores`];

    return (
      <div key={player}>
        <h2>{`Player ${player.slice(-3)} Score`}</h2>
        <div className='school-scores'>
          <ul>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num}>
                <p>{`${num}: ${isNaN(playerScores[num]) || playerScores[num] === null ? '---' : playerScores[num]}`}</p>
                <button
                  className='pick-button'
                  onClick={() => handlePickButtonClick(`is${num}Confirmed`)}
                  disabled={currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) || isNaN(playerScores[num]) || disabledButtons[player][`is${num}Confirmed`]}
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
            <div className='world-scores'>
            <p>1P: {scores[`${player}Scores`].onePair}</p>
          <button 
            className='pick-button'
            onClick={() => props.onPick('onePair')}
            disabled={currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) || isNaN(playerScores?.onePair) || pickedSchoolScores[player] < 3 || disabledButtons[player].onePair}>
            Pick
          </button>
          {playerScores.onePairConfirmed && (
            <span className="checkmark">&#10003;</span>
          )}
              <p>2P: {scores[`${player}Scores`].twoPairs}</p>
              <button 
                className='pick-button'
                onClick={() => props.onPick('twoPairs')}
                disabled={currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) || isNaN(playerScores?.twoPairs) || pickedSchoolScores[player] < 3 || disabledButtons[player].twoPairs}>
                
                  Pick
                  </button>

              <p>T: {scores[`${player}Scores`].triple}</p>
              <button className='pick-button'
              onClick={() => props.onPick('triple')}
              disabled={currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) || isNaN(playerScores?.triple) || pickedSchoolScores[player] < 3 || disabledButtons[player].triple}>
              Pick</button>

              <p>SF: {scores[`${player}Scores`].straightFlush}</p>
              <button className='pick-button'
              onClick={() => props.onPick('straightFlush')}
              disabled={currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) || isNaN(playerScores?.straightFlush) || pickedSchoolScores[player] < 3 || disabledButtons[player].straightFlush}>
              Pick</button>

              <p>RF: {scores[`${player}Scores`].royalFlush}</p>
              <button className='pick-button'
              onClick={() => props.onPick('royalFlush')}
              disabled={currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) || isNaN(playerScores?.royalFlush) || pickedSchoolScores[player] < 3 || disabledButtons[player].royalFlush}
              >Pick</button>

              <p>FH: {scores[`${player}Scores`].fullHouse}</p>
              <button className='pick-button'
              onClick={() => props.onPick('fullHouse')}
              disabled={currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) || isNaN(playerScores?.fullHouse) || pickedSchoolScores[player] < 3 || disabledButtons[player].fullHouse}
              >Pick</button>

            <p>Q: {scores[`${player}Scores`].quads}</p>
              <button className='pick-button'
                onClick={() => props.onPick('quads')}
                disabled={currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) || isNaN(playerScores?.quads) || pickedSchoolScores[player] < 3 || disabledButtons[player].quads}
              >Pick</button>

              <p>P: {scores[`${player}Scores`].poker}</p>
              <button className='pick-button'
                onClick={() => props.onPick('poker')}
                disabled={currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) || isNaN(playerScores?.poker) || pickedSchoolScores[player] < 3 || disabledButtons[player].poker}
              >Pick</button>
            </div>
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