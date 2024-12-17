import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const cardsData = [
  { id: 1, name: "🍎" },
  { id: 2, name: "🍌" },
  { id: 3, name: "🍒" },
  { id: 4, name: "🍇" },
  { id: 5, name: "🍉" },
  { id: 6, name: "🍍" },
  { id: 1, name: "🍎" },
  { id: 2, name: "🍌" },
  { id: 3, name: "🍒" },
  { id: 4, name: "🍇" },
  { id: 5, name: "🍉" },
  { id: 6, name: "🍍" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [disableClick, setDisableClick] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    if (matchedCards.length === cardsData.length) {
      setGameWon(true); // Set win condition
    }
  }, [matchedCards]);

  const handleCardClick = (index) => {
    if (disableClick || flippedCards.includes(index) || matchedCards.includes(index)) {
      return;
    }

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setDisableClick(true);
      const [firstIndex, secondIndex] = newFlipped;
      if (cards[firstIndex].id === cards[secondIndex].id) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
      }
      setTimeout(() => {
        setFlippedCards([]);
        setDisableClick(false);
      }, 1000);
    }
  };

  const isCardFlipped = (index) =>
    flippedCards.includes(index) || matchedCards.includes(index);

  const resetGame = () => {
    const shuffled = [...cardsData].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedCards([]);
    setGameWon(false);
    setDisableClick(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjEwMTMtcC0wMDE1YS14LmpwZw.jpg')",
        backgroundSize: "cover",
      }}
    >
      
      {gameWon && <Confetti />}

      
      {gameWon && (
        <div className="absolute top-10 text-4xl text-green-500 font-bold animate-bounce">
          🎉 Congratulations!!! You Won!!! 🎉
        </div>
      )}

      
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`h-24 w-24 bg-white flex items-center justify-center text-3xl font-bold rounded-lg cursor-pointer transform transition-all ${
              isCardFlipped(index) ? "bg-white" : "bg-yellow-200"
            }`}
            onClick={() => handleCardClick(index)}
          >
            {isCardFlipped(index) ? card.name : ""}
          </div>
        ))}
      </div>

      {gameWon && (
        <div className="mt-8">
          <button
            onClick={resetGame}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-lg font-bold shadow-lg transition-transform transform hover:scale-105"
          >
            🔄 Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
