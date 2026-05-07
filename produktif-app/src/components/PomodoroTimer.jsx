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
  <div className="flex justify-center items-center">
    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl w-full max-w-sm text-center">

      {/* TITLE */}
      <h2 className="text-xl font-semibold mb-2 text-gray-200">
        {mode === "focus"
          ? "Focus Time"
          : mode === "shortBreak"
          ? "Short Break"
          : "Long Break"}
      </h2>

      {/* TIMER */}
      <h1 className="text-5xl font-bold mb-6">
        {formatTime(timeLeft)}
      </h1>

      {/* MODE BUTTONS */}
      <div className="flex gap-2 mb-6">
        {["focus", "shortBreak", "longBreak"].map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            disabled={isRunning}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition
              ${
                mode === m
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }
              ${isRunning ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"}
            `}
          >
            {m === "focus"
              ? "Focus"
              : m === "shortBreak"
              ? "Break"
              : "Long Break"}
          </button>
        ))}
      </div>

      {/* CONTROL BUTTONS */}
      <div className="flex gap-3">
        <button
          onClick={toggleTimer}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium"
        >
          {isRunning ? "Pause" : "Start"}
        </button>

        <button
          onClick={resetTimer}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium"
        >
          Reset
        </button>
      </div>

    </div>
  </div>
);
}
