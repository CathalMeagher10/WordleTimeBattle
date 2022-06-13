import React from "react";
import { getBGColor } from "../utils/gameHelpers";

interface KeyboardProps {
  handleCharacterEnter: (key: string) => void;
  correctWord: string;
  pastGuesses: string[];
}

const keyboardMap: { [key: number]: string } = {
  0: "q",
  1: "w",
  2: "e",
  3: "r",
  4: "t",
  5: "y",
  6: "u",
  7: "i",
  8: "o",
  9: "p",
  10: "a",
  11: "s",
  12: "d",
  13: "f",
  14: "g",
  15: "h",
  16: "j",
  17: "k",
  18: "l",
  19: "Enter",
  20: "z",
  21: "x",
  22: "c",
  23: "v",
  24: "b",
  25: "n",
  26: "m",
  27: "back",
};
const Keyboard: React.FC<KeyboardProps> = ({
  handleCharacterEnter,
  pastGuesses,
  correctWord,
}) => {
  const renderRow = (start: number, stop: number) => {
    const arr = [];
    for (var i = start; i < stop; i++) {
      const color = getBGColor(pastGuesses, correctWord, keyboardMap[i]);

      arr.push(
        <button
          key={keyboardMap[i]}
          onClick={() => handleCharacterEnter(keyboardMap[i])}
          style={{ backgroundColor: color }}
          className={`font-medium text-white  shadow-md cursor-pointer
          } p-2 pt-3 pb-3 md:p-4 mb:pt-5 md:pb-5 rounded-md mr-1 text-center flex items-center justify-center uppercase text-lg`}
        >
          {keyboardMap[i]}
        </button>
      );
    }

    return arr;
  };

  return (
    <div className="flex flex-col  mt-3 mb-1">
      <div className="topRow flex flex-row items-center justify-center mb-2">
        {renderRow(0, 10)}
      </div>

      <div className="middleRow flex flex-row items-center justify-center mb-2">
        {renderRow(10, 19)}
      </div>
      <div className="BottomRow flex flex-row items-center justify-center mb-2">
        {renderRow(19, 28)}
      </div>
    </div>
  );
};

export default Keyboard;
