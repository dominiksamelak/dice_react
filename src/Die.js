import React, { useState } from 'react';

export default function Die(props) {
  const [hovered, setHovered] = useState(false);

  const styles = {
    borderStyle: 'solid',
    borderWidth: 'medium',
    borderColor: props.isHeld ? 'red' : (hovered ? 'yellow' : 'white'),
    borderRadius: '13px',
  };

  return (
    <div 
      className="die-face" 
      onClick={props.holdDice} 
      style={styles}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={`img/${props.src}`} alt="dice" className="dice-img" />
    </div>
  );
}