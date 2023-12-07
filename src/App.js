import React from "react";
import { useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import "./dice.css";
import Score from "./Score";

const DICE_COUNT = 5;
let oneValue = 0

function App() {
  const [dice, setDice] = React.useState(newRoll());
  const [scoreOne, setScoreOne] = React.useState("---");
  const [scoreTwo, setScoreTwo] = React.useState("---");
  const [scoreThree, setScoreThree] = React.useState("---");
  const [scoreFour, setScoreFour] = React.useState("---");
  const [scoreFive, setScoreFive] = React.useState("---");
  const [scoreSix, setScoreSix] = React.useState("---");
  
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
    return Array(DICE_COUNT).fill().map(generateNewDie);
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

  useEffect(() => {
    const countOneValue = dice.filter((die) => die.value === 1).length;
    const countTwoValue = dice.filter((die) => die.value === 2).length;
    const countThreeValue = dice.filter((die) => die.value === 3).length;
    const countFourValue = dice.filter((die) => die.value === 4).length;
    const countFiveValue = dice.filter((die) => die.value === 5).length;
    const countSixValue = dice.filter((die) => die.value === 6).length;

    // Define scoring logic for value 1
    if (countOneValue === 1) {
      setScoreOne(-2);
    } else if (countOneValue === 2) {
      setScoreOne(-1);
    } else if (countOneValue === 3) {
      setScoreOne(0);
    } else if (countOneValue === 4) {
      setScoreOne(1);
    } else if (countOneValue === 5) {
      setScoreOne(2);
    } else {
      setScoreOne("---");
    }

    // Define scoring logic for value 2
    if (countTwoValue === 1) {
      setScoreTwo(-4);
    } else if (countTwoValue === 2) {
      setScoreTwo(-2);
    } else if (countTwoValue === 3) {
      setScoreTwo(0);
    } else if (countTwoValue === 4) {
      setScoreTwo(2);
    } else if (countTwoValue === 5) {
      setScoreTwo(4);
    } else {
      setScoreTwo("---");
    }

    // Define scoring logic for value 3
    if (countThreeValue === 1) {
      setScoreThree(-6);
    } else if (countThreeValue === 2) {
      setScoreThree(-3);
    } else if (countThreeValue === 3) {
      setScoreThree(0);
    } else if (countThreeValue === 4) {
      setScoreThree(3);
    } else if (countThreeValue === 5) {
      setScoreThree(6);
    } else {
      setScoreThree("---");
    }

    // Define scoring logic for value 4
    if (countFourValue === 1) {
      setScoreFour(-8);
    } else if (countFourValue === 2) {
      setScoreFour(-4);
    } else if (countFourValue === 3) {
      setScoreFour(0);
    } else if (countFourValue === 4) {
      setScoreFour(4);
    } else if (countFourValue === 5) {
      setScoreFour(8);
    } else {
      setScoreFour("---");
    }

    // Define scoring logic for value 5
    if (countFiveValue === 1) {
      setScoreFive(-10);
    } else if (countFiveValue === 2) {
      setScoreFive(-5);
    } else if (countFiveValue === 3) {
      setScoreFive(0);
    } else if (countFiveValue === 4) {
      setScoreFive(5);
    } else if (countFiveValue === 5) {
      setScoreFive(10);
    } else {
      setScoreFive("---");
    }

    // Define scoring logic for value 5
    if (countSixValue === 1) {
      setScoreSix(-12);
    } else if (countSixValue === 2) {
      setScoreSix(-6);
    } else if (countSixValue === 3) {
      setScoreSix(0);
    } else if (countSixValue === 4) {
      setScoreSix(6);
    } else if (countSixValue === 5) {
      setScoreSix(12);
    } else {
      setScoreSix("---");
    }
  }, [dice]);


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
      {/* <button onClick={}>s</button> */}
      <div>
        <Score 
        scoreOne={scoreOne}
        scoreTwo={scoreTwo}
        scoreThree={scoreThree}
        scoreFour={scoreFour}
        scoreFive={scoreFive}
        scoreSix={scoreSix}
         />
      </div>
    </main>
  );
}

export default App;