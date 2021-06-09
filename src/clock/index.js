import { useState, useEffect } from "react";
import "./clock.css";

import BaseTimer from "./baseTimer";

const Clock = ({ turn, playerColor }) => {
  const [secondsW, setSecondsW] = useState(1800);
  const [isRunningW, setIsRunningW] = useState(true);
  const [intervalIDW, setIntervalIDW] = useState(null);

  const [secondsB, setSecondsB] = useState(1800);
  const [isRunningB, setIsRunningB] = useState(false);
  const [intervalIDB, setIntervalIDB] = useState(null);

  useEffect(() => {
    if (turn === "white") {
      setIsRunningW(true);
      setIsRunningB(false);
    }
    if (turn === "black") {
      setIsRunningW(false);
      setIsRunningB(true);
    }
  });

  useEffect(() => {
    if (isRunningW) {
      const id = setInterval(
        () => setSecondsW((secondsW) => secondsW - 1),
        1000
      );
      setIntervalIDW(id);
    } else {
      clearInterval(intervalIDW);
    }
  }, [isRunningW]);

  useEffect(() => {
    if (isRunningB) {
      const id = setInterval(
        () => setSecondsB((secondsB) => secondsB - 1),
        1000
      );
      setIntervalIDB(id);
    } else {
      clearInterval(intervalIDB);
    }
  }, [isRunningB]);

  return (
    <div id="clock">
      {playerColor === "white" ? (
        <>
          <div id="clock-black" style={{ "margin-bottom": "8rem" }}>
            <BaseTimer>{`${Math.floor(secondsB / 60)}:
            ${Math.floor(secondsB % 60) < 10 ? 0 : ""}
            ${Math.floor(secondsB % 60)}`}</BaseTimer>
          </div>
          <div id="clock-white">
            <BaseTimer>{`${Math.floor(secondsW / 60)}:
            ${Math.floor(secondsW % 60) < 10 ? 0 : ""}
            ${Math.floor(secondsW % 60)}`}</BaseTimer>
          </div>
        </>
      ) : (
        <>
          <div id="clock-white" style={{ "margin-bottom": "8rem" }}>
            <BaseTimer>{`${Math.floor(secondsW / 60)}:
            ${Math.floor(secondsW % 60) < 10 ? 0 : ""}
            ${Math.floor(secondsW % 60)}`}</BaseTimer>
          </div>
          <div id="clock-black">
            <BaseTimer>{`${Math.floor(secondsB / 60)}:
            ${Math.floor(secondsB % 60) < 10 ? 0 : ""}
            ${Math.floor(secondsB % 60)}`}</BaseTimer>
          </div>
        </>
      )}
    </div>
  );
};

export default Clock;
