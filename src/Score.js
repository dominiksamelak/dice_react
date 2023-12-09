import React from "react";

export default function Score(props) {
  const { scores } = props; // Destructure scores from props

  // Calculate schoolScoreCount based on the values in scores object
  const schoolScoreCount = Object.values(scores)
    .filter(score => typeof score === 'number') // Filter out non-numeric scores
    .reduce((total, score) => total + score, 0); // Sum up the numeric scores

  return (
    <section className="player-one-score">
      <div className="school">
        {Object.keys(scores).map((key) => (
          <div className="die-school-container" key={key}>
            <div className={`school-${key.toLowerCase()}`}>{scores[key]}</div>
            <button className={`confirm-${key.toLowerCase()}`} id="button-school">
              Pick
            </button>
          </div>
        ))}
        <div className="school-score-container">
          <div className="school-score">{schoolScoreCount}</div>
        </div>
      </div>
    </section>
  );
}
