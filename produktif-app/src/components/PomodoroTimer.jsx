import { useState, useEffect } from "react";

export default function PomodoroTimer() {
  const TIMER = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  const [mode, setMode] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(TIMER.focus);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const switchMode = (newMode) => {
    setMode(newMode);
    setTimeLeft(TIMER[newMode]);
    setIsRunning(false);
  };

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(TIMER[mode]);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>
        {mode === "focus"
          ? "Focus Time"
          : mode === "shortBreak"
            ? "Short Break"
            : "Long Break"}
      </h1>

      <h2 style={{ fontSize: "48px" }}>{formatTime(timeLeft)}</h2>

      {/* button */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => switchMode("focus")}>Focus</button>
        <button onClick={() => switchMode("shortBreak")}>Break</button>
        <button onClick={() => switchMode("longBreak")}>Long Break</button>
      </div>

      {/* control */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button onClick={toggleTimer}>{isRunning ? "Pause" : "Start"}</button>

        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
