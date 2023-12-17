import React, { useState } from 'react';

export default function Score(props) {
  const { scores, isOnePairConfirmed, setIsOnePairConfirmed, setIsTwoPairsConfirmed, isTwoPairsConfirmed, isTripleConfirmed, setIsTripleConfirmed, isStraightFlushConfirmed, setIsStraightFlushConfirmed, isRoyalFlushConfirmed, setIsRoyalFlushConfirmed, isFullHouseConfirmed, setIsFullHouseConfirmed, isQuadsConfirmed, setIsQuadsConfirmed, isPokerConfirmed, setIsPokerConfirmed } = props;
  const [lockedStates, setLockedStates] = useState({
    onePair: { locked: false, value: null },
    twoPairs: { locked: false, value: null },
    triple: { locked: false, value: null },
    straightFlush: { locked: false, value: null },
    royalFlush: { locked: false, value: null },
    fullHouse: { locked: false, value: null },
    quads: { locked: false, value: null },
    poker: { locked: false, value: null },
  });

  const handleLock = (key) => {
    setLockedStates((prevLockedStates) => ({
      ...prevLockedStates,
      [key]: { ...prevLockedStates[key], locked: true, value: scores[key] },
    }));

    // If the locked key is 'onePair', set isOnePairConfirmed to true
    if (key === 'onePair') {
      setIsOnePairConfirmed(true);
    }
    if(key === 'twoPairs') {
      setIsTwoPairsConfirmed(true)
    }
    if(key === 'triple') {
      setIsTripleConfirmed(true)
    }
    if(key ==='straightFlush'){
      setIsStraightFlushConfirmed(true)
    }
    if(key ==='royalFlush'){
      setIsRoyalFlushConfirmed(true)
    }
    if(key ==='fullHouse'){
      setIsFullHouseConfirmed(true)
    }
    if(key ==='quads'){
      setIsQuadsConfirmed(true)
    }
    if(key ==='poker'){
      setIsPokerConfirmed(true)
    }
  };

  const sumLockedValues = () => {
    return Object.values(lockedStates).reduce(
      (acc, { value }) => (value !== null ? acc + value : acc),
      0
    );
  };

  const handleConfirmButtonClick = (key) => {
    // Lock the score
    handleLock(key);
  };

  return (
    <main className='scores'>
      <section className="player-score">
            <div className="school">
              {Object.keys(scores)
                .filter(
                  (key) =>
                    ![
                      'onePair',
                      'twoPairs',
                      'triple',
                      'straightFlush',
                      'royalFlush',
                      'quads',
                      'poker',
                      'fullHouse',
                    ].includes(key)
                )
                .map((key, index) => (
                  <div className="die-school-container" key={key}>
                    <div className={`school-${key.toLowerCase()}`}>
                      {lockedStates[key]?.locked
                        ? `${index + 1}: ${lockedStates[key].value}`
                        : `${index + 1}: ${scores[key]}`}
                      <button
                        className={`confirm-${key.toLowerCase()}`}
                        id={`button-${key.toLowerCase()}`}
                        onClick={() => handleConfirmButtonClick(key)}
                        disabled={lockedStates[key]?.locked || scores[key] === '---'}
                      >
                        {lockedStates[key]?.locked ? <>&#x2714;</> : 'Pick'}
                      </button>
                    </div>
                  </div>
                ))}
              {/* <div className="school-score-container">
                <div className="school-score">{sumLockedValues()}</div>
              </div> */}
            </div>

            <div className="world">
              <div className="one-pair-container">
                <p className="onep">1P</p>
                <div className="one-pair">
                  {/* Use isOnePairConfirmed to conditionally render the value */}
                  {isOnePairConfirmed
                    ? `${lockedStates.onePair.value} (Confirmed)`
                    : scores.onePair}
                </div>
                <button
                  className="confirm-one-pair"
                  id="button-one-pair"
                  onClick={() => handleConfirmButtonClick('onePair')}
                  disabled={
                    lockedStates['onePair']?.locked || scores.onePair === '---'
                  }
                >
                  {lockedStates['onePair']?.locked ? <>&#x2714;</> : 'Pick'}
                </button>
              </div>
              <div className="two-pairs-container">
                <p className="twop">2P</p>
                <div className="two-pairs">
                  {isTwoPairsConfirmed
                    ? `${lockedStates.twoPairs.value} (Confirmed)`
                    : scores.twoPairs}
                </div>
                <button
                  className="confirm-two-pairs"
                  id="button-two-pairs"
                  onClick={() => handleConfirmButtonClick('twoPairs')}
                  disabled={
                    lockedStates['twoPairs']?.locked || scores.twoPairs === '---'
                  }
                >
                  {lockedStates['twoPairs']?.locked ? <>&#x2714;</> : 'Pick'}
                </button>
              </div>
              
              <div className="triple-containerr">
              <p className="triplep">T</p>
                <div className="triple">
                  {isTripleConfirmed ? `${lockedStates.triple.value}` : scores.triple}
                </div>
                  <button
                    className="confirm-triple"
                    id="button-triple"
                    onClick={() => handleConfirmButtonClick('triple')}
                    disabled={lockedStates['triple']?.locked || scores.triple === '---'}
                  >
                    {lockedStates['triple']?.locked ? <>&#x2714;</> : 'Pick'}
                  </button>
              </div>
              <div className="straight-flush-container">
              <p className="straight-flushp">SF</p>
                <div className="straight-flush">{isStraightFlushConfirmed ? `${lockedStates.straightFlush.value}` : scores.straightFlush}</div>
                  <button 
                    className="confirm-straight-flush"
                    id="button-straight-flush"
                    onClick={() => handleConfirmButtonClick('straightFlush')}
                    disabled={lockedStates['straightFlush']?.locked || scores.straightFlush === '---'}
                  >
                    {lockedStates['straightFlush']?.locked ? <>&#x2714;</> : 'Pick'}
                  </button>
              </div>
              </div>
              <div className="royal-flush-container">
                <p className="straight-flushp">RF</p>
                  <div className="royal-flush">{isRoyalFlushConfirmed ? `${lockedStates.royalFlush.value}` : scores.royalFlush}</div>
                  <button 
                  className="confirm-royal-flush"
                    id="button-royal-flush"
                    onClick={() => handleConfirmButtonClick('royalFlush')}
                    disabled={lockedStates['royalFlush']?.locked || scores.royalFlush === '---'}
                  >
                    {lockedStates['royalFlush']?.locked ? <>&#x2714;</> : 'Pick'}
                  </button>
              </div> 
              <div className='full-house-container'>
              <p className="full-housep">FH</p>
                  <div className="full-house">{isFullHouseConfirmed ? `${lockedStates.fullHouse.value}` : scores.fullHouse}</div>
                  <button 
                  className="confirm-full-house"
                    id="button-full-house"
                    onClick={() => handleConfirmButtonClick('fullHouse')}
                    disabled={lockedStates['fullHouse']?.locked || scores.fullHouse === '---'}
                  >
                    {lockedStates['fullHouse']?.locked ? <>&#x2714;</> : 'Pick'}
                  </button>
              </div>  
              <div className='quads-container'>
              <p className="quadsp">Q</p>
                  <div className="quads">{isQuadsConfirmed ? `${lockedStates.quads.value}` : scores.quads}</div>
                  <button 
                  className="confirm-quads"
                    id="button-quads"
                    onClick={() => handleConfirmButtonClick('quads')}
                    disabled={lockedStates['quads']?.locked || scores.quads === '---'}
                  >
                    {lockedStates['quads']?.locked ? <>&#x2714;</> : 'Pick'}
                  </button>
              </div> 
              <div className='poker-container'>
              <p className="pokerp">P</p>
                  <div className="poker">{isPokerConfirmed ? `${lockedStates.poker.value}` : scores.poker}</div>
                  <button 
                  className="confirm-poker"
                    id="button-poker"
                    onClick={() => handleConfirmButtonClick('poker')}
                    disabled={lockedStates['poker']?.locked || scores.poker === '---'}
                  >
                    {lockedStates['poker']?.locked ? <>&#x2714;</> : 'Pick'}
                  </button>
              </div>       
          </section>
    </main>
   
  );
}