import BoardRow from "./BoardRow";
import ColouredBoardRow from "./ColouredBoardRow";

const GameBoard: React.FC<{
  numberOfGuesses: number;
  currentRow: number;
  guess: string;
  correctWord: string;
  pastGuesses: string[];
  incorrectGuess: boolean;
}> = ({
  numberOfGuesses,
  currentRow,
  guess,
  correctWord,
  pastGuesses,
  incorrectGuess,
}) => {
  const renderRow = () => {
    const rows = [];

    for (var i = 0; i < numberOfGuesses; i++) {
      if (i == currentRow) {
        rows.push(
          <BoardRow
            key={i}
            currentGuess={guess}
            length={correctWord.length}
            incorrectGuess={incorrectGuess}
          />
        );
      } else {
        rows.push(
          <ColouredBoardRow
            key={i}
            guess={pastGuesses[i] ? pastGuesses[i] : ""}
            correctWord={correctWord}
          />
        );
      }
    }

    return rows;
  };

  return <div className="flex flex-col transition-all">{renderRow()}</div>;
};

export default GameBoard;
