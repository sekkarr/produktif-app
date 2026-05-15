import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);

  const [streak, setStreak] = useState(0);
  const [lastCheckIn, setLastCheckIn] = useState(null);

  const today = new Date().toDateString();

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes(savedNotes);

    const savedStreak = JSON.parse(localStorage.getItem("streak") || null);

    if (savedStreak) {
      setStreak(savedStreak.count || 0);
      setLastCheckIn(savedStreak.lastDate || null);
    }
  }, []);

  // ================= EISENHOWER =================
  const urgentImportant = notes.filter(
    (n) => n.priority === "urgent-important"
  );

  const notUrgentImportant = notes.filter(
    (n) => n.priority === "not-urgent-important"
  );

  const urgentNotImportant = notes.filter(
    (n) => n.priority === "urgent-not-important"
  );

  const notUrgentNotImportant = notes.filter(
    (n) => n.priority === "not-urgent-not-important"
  );

  // ================= SUMMARY =================
  const totalNotes = notes.length;

  const overdue = notes.filter((n) => {
    if (!n.deadline) return false;
    return (
      new Date(n.deadline).setHours(0, 0, 0, 0) <
      new Date().setHours(0, 0, 0, 0)
    );
  }).length;

  const dueTodayList = notes.filter(
    (n) => n.deadline && new Date(n.deadline).toDateString() === today
  );

  const dueToday = dueTodayList.length;

  // ================= CHECK IN =================
  const handleCheckIn = () => {
    if (lastCheckIn === today) {
      alert("Already checked in today!");
      return;
    }

    let newStreak = 1;

    if (lastCheckIn) {
      const last = new Date(lastCheckIn);
      const now = new Date();

      const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        newStreak = streak + 1;
      }
    }

    const data = {
      count: newStreak,
      lastDate: today,
    };

    localStorage.setItem("streak", JSON.stringify(data));

    setStreak(newStreak);
    setLastCheckIn(today);
  };

  return (
    <div className="min-h-screen px-6 py-10 text-white bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#1E1B4B]">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard 📊</h1>
        <p className="text-gray-300">
          Your productivity overview from Eisenhower Matrix & Focus System
        </p>
      </div>

      {/* QUICK ACTION */}
      <div className="max-w-6xl mx-auto flex gap-4 mb-10">
        <Link
          to="/eisenhower"
          className="bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-xl font-medium transition text-white"
        >
          📒 Go to Tasks
        </Link>

        <Link
          to="/fokus-mode"
          className="bg-white/10 hover:bg-white/20 px-5 py-3 rounded-xl font-medium transition border border-white/10"
        >
          🎯 Start Focus Mode
        </Link>
      </div>

      {/* SUMMARY */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white/10 border border-white/10 rounded-2xl p-6">
          <p className="text-gray-300">Total Tasks</p>
          <h2 className="text-3xl font-bold mt-2">{totalNotes}</h2>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-2xl p-6">
          <p className="text-gray-300">Overdue</p>
          <h2 className="text-3xl font-bold mt-2 text-red-400">{overdue}</h2>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-2xl p-6">
          <p className="text-gray-300">Due Today</p>
          <h2 className="text-3xl font-bold mt-2 text-yellow-400">{dueToday}</h2>
        </div>
      </div>

      {/* TODAY INSIGHT */}
      <div className="max-w-6xl mx-auto mb-6 bg-white/10 border border-white/10 p-5 rounded-2xl">
        <h2 className="text-lg font-semibold mb-2">🎯 Today Insight</h2>
        <p className="text-gray-300 text-sm">
          {urgentImportant.length > 0
            ? `You have ${urgentImportant.length} Do Now tasks. Focus on the most urgent one first.`
            : "No urgent tasks today. You are on a good track."}
        </p>
      </div>

      {/* DUE TODAY LIST */}
      <div className="max-w-6xl mx-auto mb-8">
        <h2 className="text-lg font-semibold mb-3">📅 Due Today</h2>

        <div className="space-y-2">
          {dueTodayList.slice(0, 3).map((n, i) => (
            <div
              key={i}
              className="bg-white/5 p-3 rounded-xl text-sm text-gray-300"
            >
              {n.title}
            </div>
          ))}

          {dueToday === 0 && (
            <p className="text-gray-400 text-sm">No tasks due today 🎉</p>
          )}
        </div>
      </div>

      {/* EISENHOWER + STREAK */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-10">

        {/* EISENHOWER */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4">

          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
            <p className="text-sm text-gray-300">Do Now</p>
            <h3 className="text-2xl font-bold">{urgentImportant.length}</h3>
            <p className="text-xs text-gray-400 mt-1">High priority tasks</p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4">
            <p className="text-sm text-gray-300">Schedule</p>
            <h3 className="text-2xl font-bold">{notUrgentImportant.length}</h3>
            <p className="text-xs text-gray-400 mt-1">Important but not urgent</p>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4">
            <p className="text-sm text-gray-300">Delegate</p>
            <h3 className="text-2xl font-bold">{urgentNotImportant.length}</h3>
            <p className="text-xs text-gray-400 mt-1">Can be delegated</p>
          </div>

          <div className="bg-gray-500/10 border border-gray-500/20 rounded-2xl p-4">
            <p className="text-sm text-gray-300">Delete</p>
            <h3 className="text-2xl font-bold">{notUrgentNotImportant.length}</h3>
            <p className="text-xs text-gray-400 mt-1">Low priority tasks</p>
          </div>
        </div>

        {/* STREAK */}
        <div className="bg-white/10 border border-white/10 rounded-2xl p-6 text-center flex flex-col justify-center">

          <h2 className="text-lg font-semibold mb-2">🔥 Daily Streak</h2>

          <p className="text-xs text-gray-400 mb-2">
            {streak >= 3
              ? "Great consistency 🔥"
              : "Keep building your habit"}
          </p>

          <h3 className="text-4xl font-bold mb-2">{streak}</h3>

          <p className="text-xs text-gray-400 mb-4">days</p>

          <button
            onClick={handleCheckIn}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl text-sm transition"
          >
            Check In
          </button>

          {lastCheckIn === today && (
            <p className="text-green-400 mt-3 text-xs">
              ✓ Already checked in today
            </p>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center text-gray-400 text-sm">
        Connect your focus, tasks, and habits into one system.
      </div>

    </div>
  );
}