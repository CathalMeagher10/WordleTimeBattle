import { useEffect, useState, useRef } from "react";
import { isSameDay } from "date-fns";
export default function usePastGuesses(key: string, intitialValue: any) {
  const [pastGuesses, setPastGuesses] = useState(intitialValue);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialize();
    }

    localStorage.setItem("pastGuesses", JSON.stringify(pastGuesses));
  }, [pastGuesses]);

  const initialize = () => {
    const savedDay = localStorage.getItem("day");
    var setGuesses = true;

    if (savedDay) {
      const lastPlayedDay: Date = new Date(savedDay);
      const currDate = new Date();
      setGuesses = isSameDay(lastPlayedDay, currDate);
    }

    if (setGuesses) {
      setGuessesFromFile();
    }

    initialized.current = true;
    localStorage.setItem("day", new Date().toISOString());
  };

  const setGuessesFromFile = () => {
    const savedGuesses = localStorage.getItem("pastGuesses");
    if (savedGuesses) {
      setPastGuesses(JSON.parse(savedGuesses));
    }
  };

  return [pastGuesses, setPastGuesses];
}
