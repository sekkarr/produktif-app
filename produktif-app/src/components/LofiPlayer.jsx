import { useState, useRef } from "react";

export default function LofiPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

 return (
  <div className="flex justify-center items-center">
    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl w-full max-w-sm text-center">

      {/* TITLE */}
      <h2 className="text-xl font-semibold mb-2 text-gray-200">
        Lofi Player
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        Focus / Study Music
      </p>

      {/* DISPLAY AREA */}
      <div className="bg-gradient-to-r from-purple-800 to-blue-400 text-white p-4 rounded-xl mb-6">
        Chill Lofi - Study Beats
      </div>

      <button
        onClick={togglePlay}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition"
      >
        {isPlaying ? "Pause ⏸" : "Play ▶"}
      </button>

    </div>
  </div>
);
}
