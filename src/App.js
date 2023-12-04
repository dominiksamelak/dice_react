import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import "./dice.css";
// import oneDie from './img/1.png'
// import twoDice from './img/2.png'
// import threeDice from './img/3.png'
// import fourDice from './img/4.png'
// import fiveDice from './img/5.png'
// import sixDice from './img/6.png'

function App() {
  const [dice, setDice] = React.useState(generateNewDie());

  function generateNewDie() {
    return Array(5)
      .fill()
      .map(() => {
        const diceValue = Math.ceil(Math.random() * 6);
        return {
          value: diceValue,
          isHeld: false,
          id: nanoid(),
          src: `${diceValue}.png`,
        };
      });
  }

  function rollUnSelected() {
    setDice((oldDice) =>
      oldDice.map((die) => (die.isHeld ? die : generateNewDie()))
    );
  }

  function rollAll() {
    setDice(generateNewDie());
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
      <button onClick={rollUnSelected}>Roll unselected</button>
    </main>
  );
}

export default App;
