import React from "react";

export default function Score(props) {
  
  return (
    <section className="player-one-score">
      <div className="school">
        <div className="die-school-container">
          <div className="school-one">{props.scoreOne}</div>
          <button className="confirm-one" id="button-school">
            Pick
          </button>
        </div>
        <div className="die-school-container">
          <div className="school-two">{props.scoreTwo}</div>
          <button className="confirm-two" id="button-school">Pick</button>
        </div>
        <div className="die-school-container">
          <div className="school-three">{props.scoreThree}</div>
          <button className="confirm-three" id="button-school">Pick</button>
        </div>
        <div className="die-school-container">
          <div className="school-four">{props.scoreFour}</div>
          <button className="confirm-four" id="button-school">Pick</button>
        </div>
        <div className="die-school-container">
          <div className="school-five">{props.scoreFive}</div>
          <button className="confirm-five" id="button-school">Pick</button>
        </div>
        <div className="die-school-container">
          <div className="school-six">{props.scoreSix}</div>
          <button className="confirm-six" id="button-school">Pick</button>
        </div>
        <div className="school-score-container">
          <div className="school-score">{props.schoolScoreCount}</div>
        </div>
      </div>
    </section>
  );
}
