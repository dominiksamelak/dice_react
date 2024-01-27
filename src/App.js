import React, { useState } from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';
import './dice.css';
import Score from './Score';
import { CountingLogic } from './Logic';

const DICE_COUNT = 5;

function App() {
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [dice, setDice] = useState(newRoll());
  const [rollCount, setRollCount] = useState(1)
  const [disableRollButtons, setDisableRollButtons] = useState(false);
  const [doubleScores, setDoubleScores] = useState(false);
  const {
    scores, pickScore
  } = CountingLogic({
    dice,
    currentPlayer,
    setCurrentPlayer,
    doubleScores,
    setDoubleScores
  }); 
 console.log(currentPlayer)

  function newRoll() {
    return Array(DICE_COUNT).fill().map(generateNewDie);
  }

  function generateNewDie() {
    const diceValue = Math.floor(Math.random() * 6) + 1; // Adjust to generate values between 1 and 6
    return {
      value: diceValue,
      isHeld: false,
      id: nanoid(),
      src: `${diceValue}.png`,
    };
  }
  function count() {
    setRollCount((prevRollCount) => prevRollCount + 1)
    if (rollCount === 3) {
      setDisableRollButtons(true);
    }
    console.log(rollCount)
  }
  
  function resetRollCount() {
    setRollCount(1);
    setDisableRollButtons(false);
  }

  function rollUnselected() {
    setDice((oldDice) =>
      oldDice.map((die) => (die.isHeld ? die : generateNewDie()))
    );
    count()
    setDoubleScores(false);
  }

  function rollAll() {
    setDice(newRoll());
    count()
    setDoubleScores(true);
  }



  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      src={die.src}
      holdDice={() => holdDice(die.id)}
    />
  ));

  const handlePickScore = (scoreType) => {
    pickScore(currentPlayer, scoreType);
    setCurrentPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1)); // Switch currentPlayer
    resetRollCount();
  }; 

  return (
    <main>
      <div className="dice-container">{diceElements}</div>
      <button onClick={rollAll} disabled={disableRollButtons}>Roll all</button>
      <button onClick={rollUnselected} disabled={disableRollButtons}>Roll unselected</button>
      {/* Pass scores and schoolScoreCount as props to Score component */}
      <div className="score-container">
        <Score
          scores={scores}
          onPick={handlePickScore}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer  }
        />

      </div>
    </main>
  );
}

export default App;