import React, { useState } from 'react';

function PlayerNamesInput({ onSubmit }) {
  const [playerOneName, setPlayerOneName] = useState('');
  const [playerTwoName, setPlayerTwoName] = useState('');

  const handleSubmit = () => {
    onSubmit(playerOneName, playerTwoName);
  };

  return (
    
    <div className='player-name-container'>
      <div className='input-text'>Input player names</div>
      <input className='input-box'
        type="text"
        value={playerOneName}
        onChange={(e) => setPlayerOneName(e.target.value)}
        placeholder="Enter Player One Name"
      />
      <input className='input-box'
        type="text"
        value={playerTwoName}
        onChange={(e) => setPlayerTwoName(e.target.value)}
        placeholder="Enter Player Two Name"
      />
      <button className='submit-player-name-button' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default PlayerNamesInput;
