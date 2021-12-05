import Die from "./components/Die";
import { useState } from  "react";

function App() {
  const [dice, setDice] = useState(generateNewDice())

  function generateNewDice() {
    return Array(10).fill(0, 0, 10).map(() => Math.floor(Math.random() * 6 + 1));
  }

  function rollDice() {
    setDice(generateNewDice());
  }

  return (
    <main>
      <div className="dice-container">
        {dice.map((die, idx) => <Die key={idx} value={die} />)}
      </div>

      <button className="roll-button" onClick={rollDice}>
        Roll Dice
      </button>
    </main>
  );
}

export default App;
