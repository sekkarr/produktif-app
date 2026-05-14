import PomodoroTimer from "../components/PomodoroTimer";
import LofiPlayer from "../components/LofiPlayer";


export default function FokusMode() {
  return (
    <div className="min-h-screen from-gray-50 to-gray-100 px-6 py-10">

      {/* HEADER */}

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-400">
          Focus Mode
        </h1>
        <p className="text-gray-500 mt-2">
          Pomodoro + Lofi untuk meningkatkan fokus belajar
        </p>
      </div>

      {/* MAIN LAYOUT */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div >
          <PomodoroTimer />
        </div>
        <div>
          <LofiPlayer />
        </div>

      </div>

      <div className="text-center mt-10 text-xs text-gray-400">
        Built for productivity • Focus Mode System
      </div>

    </div>
  );
}