const GameOverScreen: React.FC<{
  startNewGame: () => void;
  correctWord: string;
  streak: number;
}> = ({ startNewGame, correctWord, streak }) => {
  return (
    <div>
      <h1 className="text-5xl mb-2 uppercase font-bold text-amber-500">
        Game Over!
      </h1>
      <h1 className="text-white">
        <span className="italic">The correct word was: </span>{" "}
        <span className="text-green-400 font-bold">{correctWord}</span>
      </h1>

      <div className="mb-4">
        <h3 className="text-white font-bold text-xl">
          Words guessed correctly: {streak}
        </h3>
        <h3 className="text-white font-bold text-xl">
          High Score: {localStorage.getItem("streak")}{" "}
        </h3>
      </div>

      <button
        onClick={() => startNewGame()}
        className="p-2  text-xl text-white bg-green-500 font-medium rounded"
      >
        Start New Game
      </button>
    </div>
  );
};

export default GameOverScreen;
