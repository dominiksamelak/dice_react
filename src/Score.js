  import React, { useState, useEffect } from 'react';
  import { isCompositeComponent } from 'react-dom/test-utils';


    export default function Score(props) {
      const { scores, onPick, currentPlayer } = props;

      const renderPlayerScores = (player) => {
        const playerScores = scores[`${player}Scores`]; 
        console.log(playerScores)
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
                  onClick={() => onPick(`is${num}Confirmed`)}
                  disabled={currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) || isNaN(playerScores[num])  }
                >
                  Pick
                </button>
              </div>
                ))}
              </ul>
            </div>
            <div className='world-scores'>
              <p>1P: {scores[`${player}Scores`].onePair}</p>
              <button 
                className='pick-button'
                onClick={() => props.onPick('onePair')}
                disabled={currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) || isNaN(playerScores?.onePair)}>
                
                  Pick
                  </button>
            </div>
            <div className='world-scores'>
              <p>2P: {scores[`${player}Scores`].twoPairs}</p>
              <button 
                className='pick-button'
                onClick={() => props.onPick('twoPairs')}
                disabled={currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) || isNaN(playerScores?.twoPairs)}>
                
                  Pick
                  </button>
            </div>
            <div className='world-scores'>
              <p>T: {scores[`${player}Scores`].triple}</p>
              <button className='pick-button'
              onClick={() => props.onPick('triple')}
              disabled={currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) || isNaN(playerScores?.triple)}>
              Pick</button>
            </div>
            <div className='world-scores'>
              <p>SF: {scores[`${player}Scores`].straightFlush}</p>
              <button className='pick-button'
              onClick={() => props.onPick('straightFlush')}
              disabled={currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) || isNaN(playerScores?.straightFlush)}>
              Pick</button>
            </div>
            <div className='world-scores'>
              <p>RF: {scores[`${player}Scores`].royalFlush}</p>
              <button className='pick-button'
              onClick={() => props.onPick('royalFlush')}
              disabled={currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) || isNaN(playerScores?.royalFlush)}
              >Pick</button>
            </div>
            <div className='world-scores'>
              <p>FH: {scores[`${player}Scores`].fullHouse}</p>
              <button className='pick-button'
              onClick={() => props.onPick('fullHouse')}
              disabled={currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) || isNaN(playerScores?.fullHouse)}
              >Pick</button>
            </div>
            <div className='world-scores'>
            <p>Q: {scores[`${player}Scores`].quads}</p>
              <button className='pick-button'
                onClick={() => props.onPick('quads')}
                disabled={currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) || isNaN(playerScores?.quads)}
              >Pick</button>
            </div>
            <div className='world-scores'>
              <p>P: {scores[`${player}Scores`].poker}</p>
              <button className='pick-button'
                onClick={() => props.onPick('poker')}
                disabled={currentPlayer !== (player.slice(-1) === 'o' ? 2 : 1) || isNaN(playerScores?.poker)}
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