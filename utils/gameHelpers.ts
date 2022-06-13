import { formatISO9075 } from "date-fns/esm";
import allowedWords from "./allowedWords.js";

export const isValidGuess = (word: string): boolean => {
  return allowedWords.includes(word);
};

interface indexInterface {
  [key: string]: number[];
}

export const wordIndexes = (word: string) => {
  // This object contains the correct words
  // characters as keys and indexes as array
  var indexes: indexInterface = {};
  for (var i = 0; i < word.length; i++) {
    if (indexes[word.charAt(i)]) {
      indexes[word.charAt(i)].push(i);
    } else {
      indexes[word.charAt(i)] = [i];
    }
  }

  return indexes;
};

export const getKeyboardRowColor = (
  guess: string,
  correctWord: string
): string[] => {
  const COLOR_NOT_ENTERED = "#6B7280";
  const COLOR_CORRECT_SPOT = "#4ade80";
  const COLOR_WRONG_SPOT = "#facc15";
  const COLOR_NOT_ANY_SPOT = "#4b5563";

  let colors = new Array(guess.length);
  if (correctWord.length !== guess.trim().length) {
    return new Array(correctWord.length).fill(COLOR_NOT_ENTERED);
  }

  // color matched guess letters as correct-spot,
  // and count unmatched word letters
  let unmatched: { [key: string]: number } = {}; // unmatched word letters
  for (let i = 0; i < correctWord.length; i++) {
    let letter = correctWord[i];
    if (letter === guess[i]) {
      colors[i] = COLOR_CORRECT_SPOT;
    } else {
      unmatched[letter] = (unmatched[letter] || 0) + 1;
    }
  }

  // color unmatched guess letters right-to-left,
  // allocating remaining word letters as wrong-spot,
  // otherwise, as not-any-spot
  for (let i = 0; i < guess.length; i++) {
    let letter = guess[i];
    if (letter !== correctWord[i]) {
      if (unmatched[letter]) {
        colors[i] = COLOR_WRONG_SPOT;
        unmatched[letter]--;
      } else {
        colors[i] = COLOR_NOT_ANY_SPOT;
      }
    }
  }

  return colors;
};
export const getBGColor = (
  pastGuesses: string[],
  correctWord: string,
  key: string
): string => {
  var color = "#4b5563";

  for (var i = 0; i < pastGuesses.length; i++) {
    var guess = pastGuesses[i];
    if (!guess) continue;
    // Our guess

    var indexes = wordIndexes(correctWord);
    if (
      correctWord.includes(key) &&
      guess.includes(key) &&
      indexes[key] &&
      indexes[key].includes(guess.indexOf(key))
    ) {
      return "#4ade80";
    } else if (correctWord.includes(key) && guess.includes(key)) {
      color = "#facc15";
    } else if (guess.includes(key)) {
      color = "#1e293b";
    }
  }

  return color;
};

export const getTimerColor = (timer: number) => {
  if (timer > 20) {
    return "#ffffff";
  } else if (timer > 15) {
    return "#f59e0b";
  } else if (timer > 10) {
    return "#f97316";
  } else if (timer > 5) {
    return "#ef4444";
  } else {
    return "#991b1b";
  }
};
