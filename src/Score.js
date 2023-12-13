import React, { useState } from 'react';

export default function Score(props) {
  const { scores, isOnePairConfirmed, setIsOnePairConfirmed } = props;
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

    // If the locked key is 'onePair', set isOnePairConfirmed to true
    if (key === 'onePair') {
      setIsOnePairConfirmed(true);
    }
  };

  return (
    <section className="player-one-score">
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
        <div className="school-score-container">
          <div className="school-score">{sumLockedValues()}</div>
        </div>
      </div>

      <div className="world">
        <div className="one-pair-container">
          <p className="onep">1P</p>
          <div className="one-pair">
            {/* Use isOnePairConfirmed to conditionally render the value */}
            {isOnePairConfirmed
              ? `${scores.onePair} (Confirmed)`
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
        {/* <div className="two-pairs-container"> */}
        {/* <p className="twop">2P</p>
          <div className="two-pairs">{scores.twoPairs}</div>
          <button
            className="confirm-two-pairs"
            id="button-two-pairs"
            onClick={() => handleLock(6)}
          >
            {lockedScores[6] ? <>&#x2714;</> : "Pick"}
          </button>
          <button
            className="confirm-two-pairs-x"
            id="button-two-pairsx"
            onClick={() => handleLock(6)}
          >
            X
          </button>
        </div>
        <div className="triple-container">
        <p className="triplep">T</p>
          <div className="triple">{scores.triple}</div>
            <button
              className="confirm-triple"
              id="button-triple"
              onClick={() => handleLock(6)}
            >
              {lockedScores[6] ? <>&#x2714;</> : "Pick"}
            </button>
            <button
              className="confirm-triple-x"
              id="button-triplex"
              onClick={() => handleLock(6)}
            >
              X
            </button>
        </div>
        <div className="straight-flush-container">
        <p className="straight-flushp">SF</p>
          <div className="straight-flush">{scores.straightFlush}</div>
            <button
              className="confirm-straight-flush"
              id="button-straight-flush"
              onClick={() => handleLock(6)}
            >
              {lockedScores[6] ? <>&#x2714;</> : "Pick"}
            </button>
            <button
              className="confirm-straight-flush-x"
              id="button-straight-flushx"
              onClick={() => handleLock(6)}
            >
              X
            </button>
        </div>
        <div className="royal-flush-container">
          <p className="straight-flushp">RF</p>
            <div className="royal-flush">{scores.royalFlush}</div>
            <button
              className="confirm-royal-flush"
              id="button-royal-flush"
              onClick={() => handleLock(6)}
            >
              {lockedScores[6] ? <>&#x2714;</> : "Pick"}
            </button>
            <button
              className="confirm-royal-flush-x"
              id="button-royal-flushx"
              onClick={() => handleLock(6)}
            >
              X
            </button>
        </div>
        <div class="full-house-container">
          <p className="full-housep">FH</p>
          <div className="full-house">{scores.fullHouse}</div>
          <button
            className="confirm-full-house"
            id="button-full-house"
            onClick={() => handleLock(6)}
           >
            {lockedScores[6] ? <>&#x2714;</> : "Pick"}
          </button>
          <button
            className="confirm-full-house-x"
            id="button-full-housex"
            onClick={() => handleLock(6)}
          >
            X
          </button>
        </div>
        <div class="quads-container">
        <p className="quadsp">Q</p>
            <div className="quads">{scores.quads}</div>
            <button
              className="confirm-quads"
              id="button-quads"
              onClick={() => handleLock(6)}
            >
              {lockedScores[6] ? <>&#x2714;</> : "Pick"}
            </button>
            <button
              className="quads-x"
              id="button-quadsx"
              onClick={() => handleLock(6)}
            >
              X
            </button>
        </div>
        <div class="poker-container">
        <p className="pokerp">P</p>
            <div className="poker">{scores.poker}</div>
            <button
              className="confirm-poker"
              id="button-poker"
              onClick={() => handleLock(6)}
            >
              {lockedScores[6] ? <>&#x2714;</> : "Pick"}
            </button>
            <button
              className="poker-x"
              id="button-pokerx"
              onClick={() => handleLock(6)}
            >
              X
            </button>
        </div> */}
      </div>
    </section>
  );
}
