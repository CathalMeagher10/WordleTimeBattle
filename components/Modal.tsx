import React from "react";
import ColouredBoardRow from "./ColouredBoardRow";

const Modal: React.FC<{ setIsOpen: (isOpen: boolean) => void }> = ({
  setIsOpen,
}) => {
  return (
    <div id="overlay" onClick={() => setIsOpen(false)}>
      <div id="text" className="min-w-1/3" onClick={(e) => e.stopPropagation()}>
        <div className="rounded bg-slate-800 text-white h-full p-3">
          <h1 className="text-lg mt-1 font-bold">HOW TO PLAY</h1>

          <ul>
            <li>Each guess must be a valid 5 letter word.</li>
            <li>
              After each guess, the color of the tile will change to show how
              close your guess was to the word.
            </li>
            <li>
              You have <span className="font-bold underline">30</span> seconds
              to make each guess before you lose.
            </li>
            <li>Get as many guesses correct in a row!</li>
            <hr></hr>

            <li className="font-bold mt-2 text-lg">EXAMPLE</li>
            <ColouredBoardRow guess="helps" correctWord="tries" />
            <li>
              The letter <span className="font-bold">E</span> is in the word but
              in the <span className="font-bold">incorrect position</span>
            </li>
            <li>
              The letter <span className="font-bold">S</span> is in the word and
              in the <span className="font-bold">correct position</span>
            </li>
            <li>
              The letters <span className="font-bold">H L and P</span> are{" "}
              <span className="font-bold">not</span> in the word
            </li>
          </ul>
          <hr></hr>
          <button
            className="p-3 bg-green-600  rounded mt-3 text-xl text-white"
            onClick={() => setIsOpen(false)}
          >
            Play game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
