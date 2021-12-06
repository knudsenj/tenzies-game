import Die from "./components/Die"
import { useState, useEffect } from  "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = useState(generateAllNewDice())
  const [tenzies, setTenzies] = useState(newGame());

  useEffect(() => {
    // win if all dies are held and all dies are the same number
    const victory = dice.slice(1).reduce(
      (heldNumber, die) => die.isHeld && heldNumber === die.value && die.value, 
      dice[0].isHeld && dice[0].value
    );

    setTenzies(prevTenzies => ({...prevTenzies, hasWon: victory}));
  }, [dice])

  function newGame() {
    return {
      hasWon: false,
      rolls: 1,
    }
  }

  function generateNewDie() {
    // generate number between 1 and 6, inclusive
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
    if (tenzies.hasWon) {
      setTenzies(newGame())
      setDice(generateAllNewDice())
    } else {
      setTenzies(prevTenzies => ({...prevTenzies, rolls: prevTenzies.rolls + 1}))
      setDice(prevDice => prevDice.map(die => die.isHeld ? die : {...die, value: generateNewDie()}));
    }
  }

  function toggleHold(id) {
    setDice(prevDice => prevDice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die))
  }

  return (
    <main>
      { tenzies.hasWon && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
      <div className="stats">
        Rolls: {tenzies.rolls}
      </div>

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
        { tenzies.hasWon ? "New Game" : "Roll Dice" }
      </button>
    </main>
  );
}

export default App;
