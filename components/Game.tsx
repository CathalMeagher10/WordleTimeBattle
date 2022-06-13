import { useState, useEffect, useRef } from "react";
import GameBoard from "./GameBoard";
import Keyboard from "./Keyboard";
import { isValidGuess } from "../utils//gameHelpers";
const Game: React.FC<{
  correctWord: string;
  numberOfGuesses: number;
  resetGame: () => void;
  resetTimer: () => void;
  forceGameOver: () => void;
  gameStarted: boolean;
}> = ({
  correctWord,
  numberOfGuesses,
  resetGame,
  resetTimer,
  forceGameOver,
  gameStarted,
}) => {
  const [currentRow, setCurrentRow] = useState(0);
  const [guess, setGuess] = useState("");
  const [pastGuesses, setPastGuesses] = useState<string[]>([]);
  const focusedDiv = useRef<HTMLDivElement>(null);

  const [incorrectGuess, setIncorrectGuess] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const submitGuess = () => {
    if (guess.length != correctWord.length || !gameStarted) return;
    if (!isValidGuess(guess)) {
      setIncorrectGuess(true);
      setTimeout(() => {
        setIncorrectGuess(false);
      }, 750);
      return;
    }

    resetTimer();

    setPastGuesses([...pastGuesses, guess]);
    setGuess("");

    setCurrentRow(pastGuesses.length + 1);

    if (guess == correctWord) {
      setGameWon(true);
      setTimeout(() => {
        setPastGuesses([]);
        resetGame();
      }, 1500);
      return;
    } else if (currentRow == numberOfGuesses - 1) {
      setTimeout(() => {
        forceGameOver();
      }, 1000);
    }
  };

  const handleCharacterEnter = (key: string) => {
    if (gameWon || !gameStarted) return;
    if (key == "Enter") {
      submitGuess();
    } else if (key == "Backspace" || key == "back") {
      if (guess.length > 0) {
        setGuess(guess.slice(0, guess.length - 1));
      }
    }

    //Filters out characters that are non-alphabetic
    if (!/^[a-zA-Z()]$/.test(key)) return;

    if (guess.length < correctWord.length) {
      setGuess(guess + key);
    }
  };

  useEffect(() => {
    setGameWon(false);
    setCurrentRow(0);
  }, [correctWord]);

  useEffect(() => {
    focusedDiv.current?.focus();
  });

  return (
    <div
      className=" w-full text-center flex flex-col items-center outline-none"
      onKeyDown={(e) => handleCharacterEnter(e.key)}
      tabIndex={0}
      ref={focusedDiv}
    >
      <div className="h-full flex justify-between flex-col">
        <GameBoard
          numberOfGuesses={numberOfGuesses}
          pastGuesses={pastGuesses}
          correctWord={correctWord}
          currentRow={currentRow}
          guess={guess}
          incorrectGuess={incorrectGuess}
        />

        <Keyboard
          handleCharacterEnter={handleCharacterEnter}
          pastGuesses={pastGuesses}
          correctWord={correctWord}
        />
      </div>
    </div>
  );
};

export default Game;
