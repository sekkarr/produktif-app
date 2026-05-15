import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#1E1B4B] text-white">
      
      {/* ================= NAVBAR ================= */}
      <nav className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        
        {/* LOGO */}
        <h1 className="text-2xl font-bold tracking-wide mt-10">
          FokusIn
        </h1>

        {/* MENU */}
        <div className="flex items-center gap-6 text-sm">
          <a href="#features" className="hover:text-indigo-300 transition">
            Features
          </a>

          <Link
            to="/fokus-mode"
            className="hover:text-indigo-300 transition"
          >
            Focus Mode
          </Link>

          <Link
            to="/login"
            className="
              transition
              font-medium
              text-white
            "
          >
            Login
          </Link>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-24">
        
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div>
            <p className="text-indigo-300 font-medium mb-4">
              Productivity Web App
            </p>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Stay Focused &
              <span className="text-indigo-400"> Organized</span>
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              FokusIn helps you manage focus sessions, organize priorities,
              and build productive habits through Pomodoro and Eisenhower
              Matrix methods.
            </p>

            {/* BUTTONS */}
            <div className="flex gap-4">

              <Link
                to="/fokus-mode"
                className="
                  bg-indigo-600 hover:bg-indigo-700
                  transition
                  px-6 py-3
                  rounded-2xl
                  font-medium
                  shadow-xl
                  text-white
                "
              >
                Start Focusing
              </Link>

              <a
                href="#features"
                className="
                  bg-white/10 hover:bg-white/20
                  border border-white/10
                  transition
                  px-6 py-3
                  rounded-2xl
                  font-medium
                  backdrop-blur-md
                "
              >
                Explore Features
              </a>

            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center">

            <div
              className="
                w-full max-w-md
                bg-white/10
                border border-white/10
                backdrop-blur-md
                rounded-3xl
                p-8
                shadow-2xl
              "
            >

              <h2 className="text-2xl font-semibold mb-6">
                Productivity Overview
              </h2>

              <div className="space-y-4">

                <div className="bg-white/10 rounded-2xl p-4">
                  <p className="text-gray-300 text-sm">Focus Sessions</p>
                  <h3 className="text-3xl font-bold mt-2">12</h3>
                </div>

                <div className="bg-white/10 rounded-2xl p-4">
                  <p className="text-gray-300 text-sm">Tasks Completed</p>
                  <h3 className="text-3xl font-bold mt-2">24</h3>
                </div>

                <div className="bg-white/10 rounded-2xl p-4">
                  <p className="text-gray-300 text-sm">Current Streak</p>
                  <h3 className="text-3xl font-bold mt-2">5 Days 🔥</h3>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-6 pb-24"
      >

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">
            Features
          </h2>

          <p className="text-gray-300">
            Tools designed to improve productivity and focus.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* CARD 1 */}
          <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-3xl p-6">
            <h3 className="text-2xl font-semibold mb-4">
              🎯 Focus Mode
            </h3>

            <p className="text-gray-300 leading-relaxed">
              Improve concentration using Pomodoro timer and relaxing lofi music.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-3xl p-6">
            <h3 className="text-2xl font-semibold mb-4">
              🧠 Eisenhower Matrix
            </h3>

            <p className="text-gray-300 leading-relaxed">
              Organize tasks based on urgency and importance effectively.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-3xl p-6">
            <h3 className="text-2xl font-semibold mb-4">
              📈 Productivity Dashboard
            </h3>

            <p className="text-gray-300 leading-relaxed">
              Track your progress, streaks, and productivity activities.
            </p>
          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="max-w-5xl mx-auto px-6 pb-24">

        <div
          className="
            bg-indigo-600/20
            border border-indigo-500/20
            backdrop-blur-md
            rounded-3xl
            p-10
            text-center
          "
        >

          <h2 className="text-4xl font-bold mb-4">
            Start Building Better Productivity Habits
          </h2>

          <p className="text-gray-300 mb-8">
            Focus smarter, organize priorities, and stay productive every day.
          </p>

          <Link
            to="/login"
            className="
              inline-block
              bg-indigo-600 hover:bg-indigo-700
              transition
              px-8 py-4
              rounded-2xl
              font-medium
              shadow-xl
              text-white
            "
          >
            Get Started
          </Link>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-6 text-center text-gray-400 text-sm">
        © 2026 FokusIn. All rights reserved.
      </footer>

    </div>
  );
}