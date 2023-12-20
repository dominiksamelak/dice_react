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
  const {
    scores,
    schoolScoreCount,
    isOnePairConfirmedPlayerOne,
    setIsOnePairConfirmedPlayerOne,
    isTwoPairsConfirmedPlayerOne,
    setIsTwoPairsConfirmedPlayerOne,
    isTripleConfirmedPlayerOne,
    setIsTripleConfirmedPlayerOne,
    isStraightFlushConfirmedPlayerOne,
    setIsStraightFlushConfirmedPlayerOne,
    isRoyalFlushConfirmedPlayerOne,
    setIsRoyalFlushConfirmedPlayerOne,
    isFullHouseConfirmedPlayerOne,
    setIsFullHouseConfirmedPlayerOne,
    isQuadsConfirmedPlayerOne,
    setIsQuadsConfirmedPlayerOne,
    isPokerConfirmedPlayerOne,
    setIsPokerConfirmedPlayerOne,
  } = CountingLogic({
    dice,
    currentPlayer,
  }); // Use CountingLogic and get returned values

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
      <div className="score-container">
        <Score
          scores={scores}
          schoolScoreCount={schoolScoreCount}
          isOnePairConfirmedPlayerOne={isOnePairConfirmedPlayerOne}
          setIsOnePairConfirmedPlayerOne={setIsOnePairConfirmedPlayerOne}
          isTwoPairsConfirmedPlayerOne={isTwoPairsConfirmedPlayerOne}
          setIsTwoPairsConfirmedPlayerOne={setIsTwoPairsConfirmedPlayerOne}
          isTripleConfirmedPlayerOne={isTripleConfirmedPlayerOne}
          setIsTripleConfirmedPlayerOne={setIsTripleConfirmedPlayerOne}
          isStraightFlushConfirmedPlayerOne={isStraightFlushConfirmedPlayerOne}
          setIsStraightFlushConfirmedPlayerOne={
            setIsStraightFlushConfirmedPlayerOne
          }
          isRoyalFlushConfirmedPlayerOne={isRoyalFlushConfirmedPlayerOne}
          setIsRoyalFlushConfirmedPlayerOne={setIsRoyalFlushConfirmedPlayerOne}
          isFullHouseConfirmedPlayerOne={isFullHouseConfirmedPlayerOne}
          setIsFullHouseConfirmedPlayerOne={setIsFullHouseConfirmedPlayerOne}
          isQuadsConfirmedPlayerOne={isQuadsConfirmedPlayerOne}
          setIsQuadsConfirmedPlayerOne={setIsQuadsConfirmedPlayerOne}
          isPokerConfirmedPlayerOne={isPokerConfirmedPlayerOne}
          setIsPokerConfirmedPlayerOne={setIsPokerConfirmedPlayerOne}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
        />
        <Score
          scores={scores}
          schoolScoreCount={schoolScoreCount}
          isOnePairConfirmedPlayerOne={isOnePairConfirmedPlayerOne}
          setIsOnePairConfirmedPlayerOne={setIsOnePairConfirmedPlayerOne}
          isTwoPairsConfirmedPlayerOne={isTwoPairsConfirmedPlayerOne}
          setIsTwoPairsConfirmedPlayerOne={setIsTwoPairsConfirmedPlayerOne}
          isTripleConfirmedPlayerOne={isTripleConfirmedPlayerOne}
          setIsTripleConfirmedPlayerOne={setIsTripleConfirmedPlayerOne}
          isStraightFlushConfirmedPlayerOne={isStraightFlushConfirmedPlayerOne}
          setIsStraightFlushConfirmedPlayerOne={
            setIsStraightFlushConfirmedPlayerOne
          }
          isRoyalFlushConfirmedPlayerOne={isRoyalFlushConfirmedPlayerOne}
          setIsRoyalFlushConfirmedPlayerOne={setIsRoyalFlushConfirmedPlayerOne}
          isFullHouseConfirmedPlayerOne={isFullHouseConfirmedPlayerOne}
          setIsFullHouseConfirmedPlayerOne={setIsFullHouseConfirmedPlayerOne}
          isQuadsConfirmedPlayerOne={isQuadsConfirmedPlayerOne}
          setIsQuadsConfirmedPlayerOne={setIsQuadsConfirmedPlayerOne}
          isPokerConfirmedPlayerOne={isPokerConfirmedPlayerOne}
          setIsPokerConfirmedPlayerOne={setIsPokerConfirmedPlayerOne}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
        />
      </div>
    </main>
  );
}

export default App;
