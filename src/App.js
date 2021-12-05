import Die from "./components/Die";

function App() {
  const dice = [1,2,3,4,5,6,5,4,3,4];

  return (
    <main>
      <div className="dice-container">
        {dice.map((die, idx) => <Die key={idx} value={die} />)}
      </div>
    </main>
  );
}

export default App;
