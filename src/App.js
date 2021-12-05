import Die from "./components/Die";
import { useState } from  "react";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = useState(generateAllNewDice())

  function generateNewDie() {
    return Math.floor(Math.random() * 6 + 1)
  }

  function generateAllNewDice() {
    return Array(10).fill(0, 0, 10).map(() => ({
      value: generateNewDie(),
      isHeld: false,
      id: nanoid()
    }));
  }

  function rollDice() {
    setDice(prevDice => prevDice.map(die => die.isHeld ? die : {...die, value: generateNewDie()}));
  }

  function toggleHold(id) {
    setDice(prevDice => prevDice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die))
  }

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>

      <div className="dice-container">
        {dice.map((die, idx) => (
          <Die 
            key={die.id} 
            id={die.id}
            value={die.value} 
            isHeld={die.isHeld} 
            toggleHold={toggleHold}
          />
        ))}
      </div>

      <button className="roll-button" onClick={rollDice}>
        Roll Dice
      </button>
    </main>
  );
}

export default App;
