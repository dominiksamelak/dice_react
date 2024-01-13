import React, { useState } from 'react';

export default function Score(props, ) {
  const { scores } = props;

  return (
    <main className="scores">
      <section className="player-score">
      <div className="school-playerone">
          <ul>
            {scores.school.slice(1).map((score, index) => (
              <div className="school-scores" key={index}>
                  {index + 1}: {score}
                  <button>
                    Pick
                  </button>
                </div>
            ))}
          </ul> 
        </div>

        <div className="world">
          <div className="one-pair-container">
            <p className="onep">1P</p>
            <div className="one-pair">
              {/* Use isOnePairConfirmed to conditionally render the value */}
              {scores.onePair}
            </div>
            <button
              className="confirm-one-pair"
              id="button-one-pair"
              // onClick={handleConfirmOnePair}
              disabled={
                scores.onePair === '---'
              }
            >
              {'Pick'}
            </button>
          </div>
          <div className="two-pairs-container"> 
                <p className="twop">2P</p>
                <div className="two-pairs">
                  {scores.twoPairs}
                </div>
                <button
                  className="confirm-two-pairs"
                  id="button-two-pairs"
                  // onClick={() => handleConfirmButtonClick('twoPairsPlayerOne')}
                  disabled={
                   scores.twoPairs === '---'
                  }
                >
                  {'Pick'}
                </button>
              </div>
              
              {/* <div className="triple-containerr">
              <p className="triplep">T</p>
                <div className="triple">
                  {isTripleConfirmedPlayerOne ? `${lockedStates.triplePlayerOne.value}` : scoresPlayerOne.triplePlayerOne}
                </div>
                  <button
                    className="confirm-triple"
                    id="button-triple"
                    onClick={() => handleConfirmButtonClick('triplePlayerOne')}
                    disabled={lockedStates['triplePlayerOne']?.locked || scoresPlayerOne.triplePlayerOne === '---'}
                  >
                    {lockedStates['triplePlayerOne']?.locked ? <>&#x2714;</> : 'Pick'}
                  </button>
              </div>
              <div className="straight-flush-container">
              <p className="straight-flushp">SF</p>
                <div className="straight-flush">{isStraightFlushConfirmedPlayerOne ? `${lockedStates.straightFlushPlayerOne.value}` : scoresPlayerOne.straightFlushPlayerOne}</div>
                  <button 
                    className="confirm-straight-flush"
                    id="button-straight-flush"
                    onClick={() => handleConfirmButtonClick('straightFlushPlayerOne')}
                    disabled={lockedStates['straightFlushPlayerOne']?.locked || scoresPlayerOne.straightFlushPlayerOne === '---'}
                  >
                    {lockedStates['straightFlushPlayerOne']?.locked ? <>&#x2714;</> : 'Pick'}
                  </button>
              </div>
              </div>
              <div className="royal-flush-container">
                <p className="straight-flushp">RF</p>
                  <div className="royal-flush">{isRoyalFlushConfirmedPlayerOne ? `${lockedStates.royalFlushPlayerOne.value}` : scoresPlayerOne.royalFlushPlayerOne}</div>
                  <button 
                  className="confirm-royal-flush"
                    id="button-royal-flush"
                    onClick={() => handleConfirmButtonClick('royalFlushPlayerOne')}
                    disabled={lockedStates['royalFlushPlayerOne']?.locked || scoresPlayerOne.royalFlushPlayerOne === '---'}
                  >
                    {lockedStates['royalFlushPlayerOne']?.locked ? <>&#x2714;</> : 'Pick'}
                  </button>
              </div> 
              <div className='full-house-container'>
              <p className="full-housep">FH</p>
                  <div className="full-house">{isFullHouseConfirmedPlayerOne ? `${lockedStates.fullHousePlayerOne.value}` : scoresPlayerOne.fullHousePlayerOne}</div>
                  <button 
                  className="confirm-full-house"
                    id="button-full-house"
                    onClick={() => handleConfirmButtonClick('fullHousePlayerOne')}
                    disabled={lockedStates['fullHousePlayerOne']?.locked || scoresPlayerOne.fullHousePlayerOne === '---'}
                  >
                    {lockedStates['fullHousePlayerOne']?.locked ? <>&#x2714;</> : 'Pick'}
                  </button>
              </div>  
              <div className='quads-container'>
              <p className="quadsp">Q</p>
                  <div className="quads">{isQuadsConfirmedPlayerOne ? `${lockedStates.quadsPlayerOne.value}` : scoresPlayerOne.quadsPlayerOne}</div>
                  <button 
                  className="confirm-quads"
                    id="button-quads"
                    onClick={() => handleConfirmButtonClick('quadsPlayerOne')}
                    disabled={lockedStates['quadsPlayerOne']?.locked || scoresPlayerOne.quadsPlayerOne === '---'}
                  >
                    {lockedStates['quadsPlayerOne']?.locked ? <>&#x2714;</> : 'Pick'}
                  </button>
              </div> 
              <div className='poker-container'>
              <p className="pokerp">P</p>
                  <div className="poker">{isPokerConfirmedPlayerOne ? `${lockedStates.pokerPlayerOne.value}` : scoresPlayerOne.pokerPlayerOne}</div>
                  <button 
                  className="confirm-poker"
                    id="button-poker"
                    onClick={() => handleConfirmButtonClick('pokerPlayerOne')}
                    disabled={lockedStates['pokerPlayerOne']?.locked || scoresPlayerOne.poker === '---'}
                  >
                    {lockedStates['pokerPlayerOne']?.locked ? <>&#x2714;</> : 'Pick'}
                  </button> */} 
        </div>
      </section>
    </main>
  );
}
