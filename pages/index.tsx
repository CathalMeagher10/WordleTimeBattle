import type { NextPage } from "next";
import Game from "../components/Game";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { getDayOfYear } from "date-fns";
import {
  useQueryClient,
  useQuery,
  QueryClientProvider,
  QueryClient,
} from "react-query";

import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import Modal from "../components/Modal";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import { getTimerColor } from "../utils/gameHelpers";

const Home = () => {
  const numberOfGuesses = 6;
  const [correctWord, setCorrectWord] = useState("     ");
  const [timer, setTimer] = useState(30);
  const [isOpen, setIsOpen] = useState(true);

  const pastWords = useRef<string[]>([]);
  const timerActive = useRef<boolean>(false);

  const fetchCorrectWord = async () => {
    const { data } = await axios.get(
      `${window.location.href}/api/getCorrectWord`,
      {
        params: { pastWords: pastWords.current },
      }
    );

    return data;
  };

  const { data, isError, isLoading, refetch } = useQuery(
    "correctWord",
    fetchCorrectWord,
    { refetchOnWindowFocus: false }
  );

  const resetGame = async () => {
    await refetch();
    setTimer(30);
  };

  useEffect(() => {
    if (data) {
      if (!pastWords.current.includes(data.currentWord)) {
        pastWords.current.push(data.correctWord);
      }
      const streak = localStorage.getItem("streak");
      if (streak) {
        if (parseInt(streak) < pastWords.current.length - 1) {
          localStorage.setItem(
            "streak",
            (pastWords.current.length - 1).toString()
          );
        }
      } else {
        localStorage.setItem("streak", "0");
      }
    }
  }, [data]);

  useEffect(() => {
    setInterval(() => {
      if (timerActive.current) {
        setTimer((t) => t - 1);
      }
    }, 1000);

    console.log(window.location);
  }, []);

  const startNewGame = () => {
    pastWords.current = [];
    resetGame();
  };

  useEffect(() => {
    timerActive.current = !isOpen;
  }, [isOpen]);
  return (
    <div className="h-full w-full flex  bg-gray-700 items-center flex-col text-center">
      {isOpen && <Modal setIsOpen={setIsOpen} />}

      <div className="flex flex-col h-full">
        {timer > 0 && (
          <div className="flex items-center justify-center text-center flex-col">
            <div className="flex flex-row">
              <h1 className="font-bold text-white inline text-4xl mt-1 mr-1">
                Wordle
              </h1>

              <QuestionMarkCircleIcon
                className="mt-[0.8rem] w-7 h-7 cursor-pointer text-white"
                onClick={() => setIsOpen(true)}
              />
            </div>

            <h1
              style={{ color: getTimerColor(timer) }}
              className={`text-2xl  font-bold`}
            >
              {timer}
            </h1>
          </div>
        )}

        <div className="grow justify-center flex items-center">
          {isLoading ? (
            <h1>loading...</h1>
          ) : isError ? (
            <h1 className="text-red-400 text-2xl font-bold">
              An error occured. Please refresh
            </h1>
          ) : timer <= 0 ? (
            <GameOverScreen
              startNewGame={startNewGame}
              correctWord={data.correctWord}
              streak={pastWords.current.length - 1}
            />
          ) : (
            <Game
              resetGame={resetGame}
              numberOfGuesses={6}
              correctWord={data?.correctWord}
              resetTimer={() => setTimer(30)}
              forceGameOver={() => setTimer(0)}
              gameStarted={!isOpen}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const queryClient = new QueryClient();

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
const wrapper: NextPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
};
export default wrapper;
