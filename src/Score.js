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
          .filter((key) => key !== "onePair"  && key !== "twoPairs") // Exclude "onePair" key
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
            id="button-world"
            onClick={() => handleLock(6)}
          >
            {lockedScores[6] ? <>&#x2714;</> : "Pick"}
          </button>
          <button
            className="confirm-one-pair-x"
            id="button-worldx"
            onClick={() => handleLock(6)}
          >
            X
          </button>
        </div>
        {/* Add other containers in the world div as needed */}
        <div className="two-pairs-container">
        <p className="twop">2P</p>
          <div className="one-pair">{scores.twoPairs}</div>
          <button
            className="confirm-two-pairs"
            id="button-world"
            onClick={() => handleLock(6)}
          >
            {lockedScores[6] ? <>&#x2714;</> : "Pick"}
          </button>
          <button
            className="confirm-two-pairs-x"
            id="button-worldx"
            onClick={() => handleLock(6)}
          >
            X
          </button>
        </div>
        <div class="triple-container">
          {/* ... */}test
        </div>
        <div class="straight-flush-container">
          {/* ... */}test
        </div>
        <div class="royal-flush-container">
          {/* ... */}test
        </div>
        <div class="full-house-container">
          {/* ... */}test
        </div>
        <div class="quads-container">
          {/* ... */}test
        </div>
        <div class="poker-container">
          {/* ... */}test
        </div>
      </div>
    </section>
  );
}
