import React, { useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import "./dice.css";
import Score from "./Score";
import { CountingLogic } from "./Logic";

const DICE_COUNT = 5;

function App() {
  const [dice, setDice] = useState(newRoll());
  const { scores, schoolScoreCount } = CountingLogic({ dice }); // Use CountingLogic and get returned values

  function generateNewDie() {
    const diceValue = Math.floor(Math.random() * DICE_COUNT) + 1;
    return {
      value: diceValue,
      isHeld: false,
      id: nanoid(),
      src: `${diceValue}.png`,
    };
  }

  function newRoll() {
    return Array(DICE_COUNT)
      .fill()
      .map(generateNewDie);
  }

  function rollUnselected() {
    setDice((oldDice) =>
      oldDice.map((die) => (die.isHeld ? die : generateNewDie()))
    );
  }

  function rollAll() {
    setDice(newRoll());
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

  return (
    <main>
      <div className="dice-container">{diceElements}</div>
      <button onClick={rollAll}>Roll all</button>
      <button onClick={rollUnselected}>Roll unselected</button>
      {/* Pass scores and schoolScoreCount as props to Score component */}
      <div>
        <Score
          scores={scores}
          schoolScoreCount={schoolScoreCount}
        />
      </div>
    </main>
  );
}

export default App;
