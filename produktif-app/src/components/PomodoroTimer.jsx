import { useState, useEffect, useRef } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function PomodoroTimer() {
  const TIMER = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };


  const [mode, setMode] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(TIMER.focus);
  const [isRunning, setIsRunning] = useState(false);

  const [sessions, setSessions] = useState(0);
  const [focusMinutes, setFocusMinutes] = useState(0);

  const alarmRef = useRef(null);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  const [user, setUser] = useState(null);

  useEffect(() => {
  setUser(auth.currentUser);
}, []);

useEffect(() => {
  let timer;

  if (isRunning && timeLeft > 0) {
    timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
  } else if (isRunning && timeLeft === 0) {
    alarmRef.current?.play();
    setIsRunning(false);

    if (mode === "focus") {
      const updateFirebase = async () => {
        if (!user) return;
        const docRef = doc(db, "users", user.uid);

        const newSessions = sessions + 1;
        const newMinutes = focusMinutes + 25;

        await setDoc(
          docRef,
          {
            focusSessions: newSessions,
            focusMinutes: newMinutes,
          },
          { merge: true }
        );

        setSessions(newSessions);
        setFocusMinutes(newMinutes);

        setMode("shortBreak");
        setTimeLeft(TIMER.shortBreak);
      };

      updateFirebase();
    } else {
      setMode("focus");
      setTimeLeft(TIMER.focus);
    }
  }

  return () => clearInterval(timer);
}, [isRunning, timeLeft, mode, user, sessions, focusMinutes]);

  const switchMode = (newMode) => {
    setMode(newMode);
    setTimeLeft(TIMER[newMode]);
    setIsRunning(false);
  };

  const toggleTimer = () => setIsRunning((prev) => !prev);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(TIMER[mode]);
  };

  // progress waktu (circle)
  const totalTime = TIMER[mode];

  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  const circleColor =
    mode === "focus"
      ? "#6366F1"
      : mode === "shortBreak"
        ? "#10B981"
        : "#F59E0B";

  return (
    <div className="flex justify-center items-center text-white">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl w-full max-w-sm text-center">
        <h2 className="text-2xl font-semibold mb-2">⏱️Pomodoro Timer</h2>
        {/* MODE */}
        <h2 className="text-xl font-semibold mb-2">
          {mode === "focus"
            ? "Focus Time"
            : mode === "shortBreak"
              ? "Break Time"
              : "Long Break"}
        </h2>

        {/* CIRCLE */}
        <div className="flex justify-center items-center relative mb-6">
          <svg width="220" height="220">
            <circle
              cx="110"
              cy="110"
              r={radius}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="10"
              fill="none"
            />

            <circle
              cx="110"
              cy="110"
              r={radius}
              stroke={circleColor}
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 110 110)"
            />
          </svg>

          <div className="absolute text-center">
            <h1 className="text-5xl font-bold">{formatTime(timeLeft)}</h1>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-2 mb-5">
          {["focus", "shortBreak", "longBreak"].map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              disabled={isRunning}
              className={`flex-1 py-2 rounded-lg text-sm ${
                mode === m ? "bg-indigo-600" : "bg-white/10"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* CONTROL */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={toggleTimer}
            className="flex-1 bg-green-500 py-2 rounded-lg"
          >
            {isRunning ? "Pause" : "Start"}
          </button>

          <button
            onClick={resetTimer}
            className="flex-1 bg-red-500 py-2 rounded-lg"
          >
            Reset
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 p-3 rounded-xl">
            <p className="text-xs text-gray-300">Sessions</p>
            <h2 className="text-2xl font-bold text-green-400">{sessions}</h2>
          </div>

          <div className="bg-white/10 p-3 rounded-xl">
            <p className="text-xs text-gray-300">Focus Minutes</p>
            <h2 className="text-2xl font-bold text-indigo-400">
              {focusMinutes}
            </h2>
          </div>
        </div>

        {/* ALARM */}
        <audio ref={alarmRef} src="/sounds/alarm.mp3" />
      </div>
    </div>
  );
}
