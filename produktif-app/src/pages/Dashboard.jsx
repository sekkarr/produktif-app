import { useEffect, useState } from "react";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);

  const [streak, setStreak] = useState(0);
  const [lastCheckIn, setLastCheckIn] = useState(null);

  const today = new Date().toDateString();

  // ================= LOAD DATA =================
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes(savedNotes);

    const savedStreak = JSON.parse(localStorage.getItem("streak") || null);

    if (savedStreak) {
      setStreak(savedStreak.count || 0);
      setLastCheckIn(savedStreak.lastDate || null);
    }
  }, []);

  // ================= EISENHOWER CONNECTION =================
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
    return new Date(n.deadline).setHours(0, 0, 0, 0) <
           new Date().setHours(0, 0, 0, 0);
  }).length;

  const dueToday = notes.filter((n) => {
    if (!n.deadline) return false;
    return new Date(n.deadline).toDateString() === today;
  }).length;

  // ================= CHECK IN SYSTEM =================
  const handleCheckIn = () => {
    if (lastCheckIn === today) {
      alert("Already checked in today!");
      return;
    }

    let newStreak = 1;

    if (lastCheckIn) {
      const last = new Date(lastCheckIn);
      const now = new Date();

      const diffDays = Math.floor(
        (now - last) / (1000 * 60 * 60 * 24)
      );

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

  // ================= UI =================
  return (
    <div className="min-h-screen px-6 py-10 text-white bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#1E1B4B]">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-bold mb-2">
          Dashboard 📊
        </h1>
        <p className="text-gray-300">
          Your productivity overview from Eisenhower Matrix & Focus System
        </p>
      </div>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white/10 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
          <p className="text-gray-300">Total Tasks</p>
          <h2 className="text-3xl font-bold mt-2">{totalNotes}</h2>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
          <p className="text-gray-300">Overdue</p>
          <h2 className="text-3xl font-bold mt-2 text-red-400">
            {overdue}
          </h2>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
          <p className="text-gray-300">Due Today</p>
          <h2 className="text-3xl font-bold mt-2 text-yellow-400">
            {dueToday}
          </h2>
        </div>
      </div>

      {/* ================= EISENHOWER MATRIX SUMMARY ================= */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-4 mb-10">

        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
          <p className="text-sm text-gray-300">Do Now</p>
          <h3 className="text-2xl font-bold">{urgentImportant.length}</h3>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4">
          <p className="text-sm text-gray-300">Schedule</p>
          <h3 className="text-2xl font-bold">{notUrgentImportant.length}</h3>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4">
          <p className="text-sm text-gray-300">Delegate</p>
          <h3 className="text-2xl font-bold">{urgentNotImportant.length}</h3>
        </div>

        <div className="bg-gray-500/10 border border-gray-500/20 rounded-2xl p-4">
          <p className="text-sm text-gray-300">Delete</p>
          <h3 className="text-2xl font-bold">{notUrgentNotImportant.length}</h3>
        </div>
      </div>

      {/* ================= STREAK ================= */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="bg-white/10 border border-white/10 rounded-2xl p-8 backdrop-blur-md text-center">

          <h2 className="text-2xl font-semibold mb-2">
            🔥 Daily Streak
          </h2>

          <p className="text-gray-300 mb-6">
            Stay consistent with your productivity habits
          </p>

          <h3 className="text-5xl font-bold mb-6">
            {streak} Days
          </h3>

          <button
            onClick={handleCheckIn}
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-medium transition"
          >
            Daily Check-In
          </button>

          {lastCheckIn === today && (
            <p className="text-green-400 mt-4 text-sm">
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