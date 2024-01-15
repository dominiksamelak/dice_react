  import React, { useState, useEffect } from 'react';
  import { isCompositeComponent } from 'react-dom/test-utils';


    export default function Score(props) {
      const { scores, onPick } = props;

      const renderPlayerScores = (player) => {
        const playerScores = scores[`${player}Scores`]; 
        return (
          <div key={player}>
            <h2>{`${player} Scores`}</h2> 
            <div className='school-scores'>
            <ul>
          {[1, 2, 3, 4, 5, 6].map((number) => (
            <div className="score-item" key={number}>
              <p>{`${number}: ${isNaN(playerScores[number]) ? '---' : playerScores[number]}`}</p>
              <button
                className="pick-button"
                onClick={() => onPick(player, number)}
              >
                Pick
              </button>
            </div>
          ))}
        </ul>
            </div>
            <div className='world-scores'>
          <p>2p: {scores[`${player}Scores`].onePair}</p>
          <button 
            className='pick-button'
            onClick={() => props.onPick('onePair')}>
            
              Pick
              </button>
        </div>
        <div className='world-scores'>
          <p>2p: {scores[`${player}Scores`].twoPairs}</p>
          <button 
            className='pick-button'
            onClick={() => props.onPick('twoPairs')}>
            
              Pick
              </button>
        </div>
        <div className='world-scores'>
        <p>T: {scores[`${player}Scores`].triple}</p>
        <button className='pick-button'
        onClick={() => props.onPick('triple')}>
        Pick</button>
        </div>
        <div className='world-scores'>
          <p>SF: {scores[`${player}Scores`].straightFlush}</p>
          <button className='pick-button'
          onClick={() => props.onPick('straightFlush')}>
          Pick</button>
        </div>
        <div className='world-scores'>
          <p>RF: {scores[`${player}Scores`].royalFlush}</p>
          <button className='pick-button'
          onClick={() => props.onPick('royalFlush')}
          >Pick</button>
        </div>
        <div className='world-scores'>
        <p>FH: {scores[`${player}Scores`].fullHouse}</p>
        <button className='pick-button'
         onClick={() => props.onPick('fullHouse')}
        >Pick</button>
        </div>
        <div className='world-scores'>
        <p>Q: {scores[`${player}Scores`].quads}</p>
        <button className='pick-button'
          onClick={() => props.onPick('quads')}
        >Pick</button>
        </div>
        <div className='world-scores'>
          <p>P: {scores[`${player}Scores`].poker}</p>
          <button className='pick-button'
            onClick={() => props.onPick('poker')}
          >Pick</button>
        </div>
            
            
            
            
            
            
            
            
            {/* Add other score components here */}
          </div>
        );
      };
    
      return (
        <main className="scores">
          {renderPlayerScores('playerOne')}
          {renderPlayerScores('playerTwo')} 
          {/* Add other components for different scores */}
        </main>
      );
    }