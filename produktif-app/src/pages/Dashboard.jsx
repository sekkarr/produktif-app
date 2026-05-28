import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../firebase";
import { collection, onSnapshot, query, where  } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Dashboard() {
  const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

  const [notes, setNotes] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(0);

  const [streak, setStreak] = useState(0);
  const [lastCheckIn, setLastCheckIn] = useState(null);

  const [focusSessions, setFocusSessions] = useState(0);
  const [focusMinutes, setFocusMinutes] = useState(0);

  const today = new Date().toDateString();


useEffect(() => {
  const unsub = onAuthStateChanged(auth, (u) => {
    setUser(u);
    setLoading(false);
  });

  return () => unsub();
}, []);



useEffect(() => {
  if (loading || !user) return;

  const q = query(
    collection(db, "notes"),
    where("uid", "==", user.uid)
  );

  const unsub = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setNotes(data);
    setCompletedTasks(data.filter((n) => n.isCompleted).length);
  });

  return () => unsub();
}, [user, loading]);


useEffect(() => {
  const saved = localStorage.getItem("streak");

  if (saved) {
    const data = JSON.parse(saved);

    setStreak(data.count || 0);
    setLastCheckIn(data.lastDate || null);
  }
}, []);



  //eisenhower matrix
  const urgentImportant = notes.filter(
    (n) => n.priority === "urgent-important",
  );

  const notUrgentImportant = notes.filter(
    (n) => n.priority === "not-urgent-important",
  );

  const urgentNotImportant = notes.filter(
    (n) => n.priority === "urgent-not-important",
  );

  const notUrgentNotImportant = notes.filter(
    (n) => n.priority === "not-urgent-not-important",
  );

  //summary
  const totalNotes = notes.length;

  const overdue = notes.filter((n) => {
    if (!n.deadline) return false;
    return (
      new Date(n.deadline).setHours(0, 0, 0, 0) <
      new Date().setHours(0, 0, 0, 0)
    );
  }).length;

  const dueTodayList = notes.filter(
    (n) => n.deadline && new Date(n.deadline).toDateString() === today,
  );

  const dueToday = dueTodayList.length;

  //streak
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




if (loading) {
  return (
    <div className="text-white flex justify-center items-center h-screen">
      Loading...
    </div>
  );
}

  return (
    <div className="min-h-screen px-6 py-10 text-white">
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold">Dashboard</h1>

          <img
            src="/icon/dashboard.png"
            alt="Dashboard Icon"
            className="w-10 h-10"
          />
        </div>

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
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* CARD */}
        <div className="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:scale-[1.02] backdrop-blur-md h-full flex flex-col justify-between">
          <p className="text-gray-300 text-sm">Total Tasks</p>
          <h2 className="text-3xl font-bold mt-2">{totalNotes}</h2>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:scale-[1.02] backdrop-blur-md h-full flex flex-col justify-between">
          <p className="text-gray-300 text-sm">Overdue</p>
          <h2 className="text-3xl font-bold mt-2 text-red-400">{overdue}</h2>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:scale-[1.02] backdrop-blur-md h-full flex flex-col justify-between">
          <p className="text-gray-300 text-sm">Due Today</p>
          <h2 className="text-3xl font-bold mt-2 text-yellow-400">
            {dueToday}
          </h2>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:scale-[1.02] backdrop-blur-md h-full flex flex-col justify-between">
          <p className="text-gray-300 text-sm">Completed Tasks</p>
          <h2 className="text-3xl font-bold mt-2 text-green-400">
            {completedTasks}
          </h2>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:scale-[1.02] backdrop-blur-md h-full flex flex-col justify-between">
          <p className="text-gray-300 text-sm">Focus Sessions</p>
          <h2 className="text-3xl font-bold mt-2 text-indigo-400">
            {focusSessions}
          </h2>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:scale-[1.02] backdrop-blur-md h-full flex flex-col justify-between">
          <p className="text-gray-300 text-sm">Focus Minutes</p>
          <h2 className="text-3xl font-bold mt-2 text-green-300">
            {focusMinutes}
          </h2>
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
            <p className="text-sm text-gray-300">Eliminate</p>
            <h3 className="text-2xl font-bold">
              {notUrgentNotImportant.length}
            </h3>
          </div>
        </div>

        {/* STREAK */}
        <div className="bg-white/10 border border-white/10 rounded-2xl p-6 text-center flex flex-col justify-center">
          <h2 className="text-lg font-semibold mb-2">🔥 Daily Streak</h2>

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
