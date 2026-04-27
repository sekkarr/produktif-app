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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          width: "320px",
          textAlign: "center",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "10px", color: "#555" }}>
          {mode === "focus"
            ? "Pomodoro Timer"
            : mode === "shortBreak"
              ? "Short Break"
              : "Long Break"}
        </h2>

        <h1 style={{ fontSize: "56px", marginBottom: "20px" }}>
          {formatTime(timeLeft)}
        </h1>

        {/* Mode Button */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          {["focus", "shortBreak", "longBreak"].map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              disabled={isRunning}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "8px",
                border: "none",
                cursor: isRunning ? "not-allowed" : "pointer",
                background: isRunning
                  ? "#d1d5db"
                  : mode === m
                    ? "#4f46e5"
                    : "#e5e7eb",
                color: mode === m && !isRunning ? "white" : "#333",
                opacity: isRunning ? 0.6 : 1,
              }}
            >
              {m === "focus"
                ? "Focus"
                : m === "shortBreak"
                  ? "Break"
                  : "Long Break"}
            </button>
          ))}
        </div>

        {/* Control */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={toggleTimer}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              background: "#10b981",
              color: "white",
              cursor: "pointer",
            }}
          >
            {isRunning ? "Pause" : "Start"}
          </button>

          <button
            onClick={resetTimer}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              background: "#ef4444",
              color: "white",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
