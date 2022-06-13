import { replaceBasePath } from "next/dist/server/router";
import React, { useState, useEffect, KeyboardEvent } from "react";
import { motion } from "framer-motion";

const BoardRow: React.FC<{
  length: number;
  currentGuess: string;
  incorrectGuess: boolean;
}> = ({ length, currentGuess, incorrectGuess }) => {
  const renderRow = () => {
    var arr = [];

    for (var i = 0; i < length; i++) {
      arr.push(
        <motion.div
          key={i}
          style={{ color: "#ffffff" }}
          className={`${
            incorrectGuess ? "bg-red-500" : "bg-gray-500"
          }  mb-2 rounded-md mr-2 h-14 w-14 text-3xl font-bold shadow-lg text-center uppercase transition-all flex justify-center items-center`}
        >
          {currentGuess.slice(i, i + 1)}
        </motion.div>
      );
    }

    return arr;
  };

  return (
    <div className="flex justify-center">
      <div className="flex">{renderRow()}</div>
    </div>
  );
};

export default React.memo(BoardRow);
