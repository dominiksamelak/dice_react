import React from "react";

export default function Score(props) {
  
  return (
    <section className="player-one-score">
      <div className="school">
        <div className="one-container">
          <p id="one">1</p>
          <div className="school-one">{props.scoreOne}</div>
          <button className="confirm-one" id="button-school">
            Pick
          </button>
        </div>
        <div className="two-container">
          <p id="two">2</p>
          <div className="school-two">{props.scoreTwo}</div>
          <button className="confirm-two" id="button-school">Pick</button>
        </div>
        <div className="three-container">
          <p id="three">3</p>
          <div className="school-three">{props.scoreThree}</div>
          <button className="confirm-three" id="button-school">Pick</button>
        </div>
        <div className="four-container">
          <p id="four">4</p>
          <div className="school-four">{props.scoreFour}</div>
          <button className="confirm-four" id="button-school">Pick</button>
        </div>
        <div className="five-container">
          <p id="five">5</p>
          <div className="school-five">{props.scoreFive}</div>
          <button className="confirm-five" id="button-school">Pick</button>
        </div>
        <div className="six-container">
          <p id="six">6</p>
          <div className="school-six">{props.scoreSix}</div>
          <button className="confirm-six" id="button-school">Pick</button>
        </div>
      </div>
    </section>
  );
}
