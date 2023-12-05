import React from "react";

export default function Score(props) {
  return (
    <section className="player-one-score">
      <div className="school">
        <div className="one-container">
          <p id="one">1</p>
          <div className="school-one">{props.countOne}</div>
          <button className="confirm-one" id="button-school">
            Pick
          </button>
        </div>
      </div>
    </section>
  );
}
