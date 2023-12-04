import React from "react";

export default function Die(props) {
  const styles = {
    borderStyle: props.isHeld ? "solid" : "none",
    borderWidth: props.isHeld ? "medium" : "0",
    borderColor: props.isHeld ? "red" : "none",
  };
  return (
    <div className="die-face" onClick={props.holdDice} style={styles}>
      <img src={`img/${props.src}`} alt="dice" />
    </div>
  );
}
