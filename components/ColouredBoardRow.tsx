import { replaceBasePath } from "next/dist/server/router";
import React, { useState, useEffect, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { wordIndexes, getKeyboardRowColor } from "../utils/gameHelpers";
import { isProxy } from "util/types";
import gu from "date-fns/esm/locale/gu/index.js";
const BoardRow: React.FC<{
  guess: string;
  correctWord: string;
}> = ({ guess, correctWord }) => {
  const renderRow = () => {
    let arr = [];
    const colors = getKeyboardRowColor(guess, correctWord);
    for (var i = 0; i < 5; i++) {
      let v = " ";
      if (guess.slice(i, i + 1)) {
        v = guess.slice(i, i + 1);
      }

      arr.push(
        <motion.div
          key={i}
          animate={{ rotate: guess == "" ? 0 : 360 }}
          transition={{ duration: i / 5 }}
          style={{ backgroundColor: colors[i] }}
          className={` items-center  justify-center flex text-white mb-2 rounded-md mr-2 h-14 w-14 text-3xl font-bold shadow-lg text-center uppercase outline-none caret-transparent transition-all`}
        >
          {v}
        </motion.div>
      );
    }

    return arr;
  };

  return (
    <div className="flex flex-row  justify-center">
      <div className="flex">{renderRow()}</div>
    </div>
  );
};

export default React.memo(BoardRow);
