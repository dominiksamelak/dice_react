import React, { useState } from "react";

export default function Score(props) {
  const { scores } = props;
  const [lockedScores, setLockedScores] = useState(Array(6).fill(false)); // Initialize lockedScores state for 6 scores
  const [lockedValues, setLockedValues] = useState(Array(6).fill(null)); // Initialize lockedValues state for 6 scores

  const handleLock = (index) => {
    const updatedLocks = [...lockedScores]; // Create a copy of lockedScores
    updatedLocks[index] = true; // Lock the score at the clicked index
    setLockedScores(updatedLocks); // Update the lockedScores state

    const updatedValues = [...lockedValues]; // Create a copy of lockedValues
    updatedValues[index] = scores[`score${index + 1}`]; // Store the locked value
    setLockedValues(updatedValues); // Update the lockedValues state
  };

  const sumLockedValues = () => {
    // Calculate the sum of locked values
    return lockedValues.reduce((acc, value) => (value !== null ? acc + value : acc), 0);
  };

  return (
    <section className="player-one-score">
      <div className="school">
        {Object.keys(scores).map((key, index) => (
          <div className="die-school-container" key={key}>
            <div className={`school-${key.toLowerCase()}`}>
              {lockedScores[index] ? (
                // If the score is locked, display the locked value
                `${index + 1}: ${lockedValues[index]}`
              ) : (
                // If the score is not locked, display the actual score and the button
                `${index + 1}: ${scores[key]}`
              )}
              <button
                className={`confirm-${key.toLowerCase()}`}
                id={`button-${key.toLowerCase()}`}
                onClick={() => handleLock(index)}
                disabled={lockedScores[index]} // Disable button if score is locked
              >
                {lockedScores[index] ? "Locked" : "Pick"}
              </button>
            </div>
          </div>
        ))}
        <div className="school-score-container">
          <div className="school-score">
            {/* Display sum of locked values */}
            {sumLockedValues()}
          </div>
        </div>
      </div>
    </section>
  );
}
