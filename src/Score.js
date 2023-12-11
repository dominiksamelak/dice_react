import React, { useState } from "react";

export default function Score(props) {
  const { scores } = props;
  const [lockedScores, setLockedScores] = useState(Array(6).fill(false));
  const [lockedValues, setLockedValues] = useState(Array(6).fill(null));

  const handleLock = (index) => {
    const updatedLocks = [...lockedScores];
    updatedLocks[index] = true;
    setLockedScores(updatedLocks);

    const updatedValues = [...lockedValues];
    updatedValues[index] = scores[`score${index + 1}`];
    setLockedValues(updatedValues);
  };

  const sumLockedValues = () => {
    return lockedValues.reduce((acc, value) => (value !== null ? acc + value : acc), 0);
  };

  return (
    <section className="player-one-score">
      <div className="school">
        {Object.keys(scores)
          .filter((key) => key !== "onePair"  && key !== "twoPairs" && key !== "triple" && key !== "straightFlush" && key !== "royalFlush" && key !== "quads" && key !== "poker" && key !== "fullHouse") 
          .map((key, index) => (
            <div className="die-school-container" key={key}>
              <div className={`school-${key.toLowerCase()}`}>
                {lockedScores[index] ? (
                  `${index + 1}: ${lockedValues[index]}`
                ) : (
                  `${index + 1}: ${scores[key]}`
                )}
                <button
                  className={`confirm-${key.toLowerCase()}`}
                  id={`button-${key.toLowerCase()}`}
                  onClick={() => handleLock(index)}
                  disabled={lockedScores[index]}
                >
                  {lockedScores[index] ? <>&#x2714;</> : "Pick"}
                </button>
              </div>
            </div>
          ))}
        <div className="school-score-container">
          <div className="school-score">{sumLockedValues()}</div>
        </div>
      </div>

      <div className="world">
        {/* Render one-pair-container only inside the world div */}
        <div className="one-pair-container">
          <p className="onep">1P</p>
          <div className="one-pair">{scores.onePair}</div>
          <button
            className="confirm-one-pair"
            id="button-one-pair"
            onClick={() => handleLock(6)}
          >
            {lockedScores[6] ? <>&#x2714;</> : "Pick"}
          </button>
          <button
            className="confirm-one-pair-x"
            id="button-one-pairx"
            onClick={() => handleLock(6)}
          >
            X
          </button>
        </div>
        <div className="two-pairs-container">
        <p className="twop">2P</p>
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
        </div>
      </div>
    </section>
  );
}
