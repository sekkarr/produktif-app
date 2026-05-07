import { useState, useRef } from "react";

export default function LofiPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const audioRef = useRef(null);

  // 5 slot playlist (sementara semua pakai lagu yang sama)
  const songs = [
    "/lofi-songs/bliss.mp3",
    "/lofi-songs/bliss.mp3",
    "/lofi-songs/bliss.mp3",
    "/lofi-songs/bliss.mp3",
    "/lofi-songs/bliss.mp3",
  ];

  const songTitles = [
    "Lofi Chill 1",
    "Lofi Chill 2",
    "Lofi Rain Focus",
    "Lofi Night Study",
    "Lofi Deep Focus",
  ];

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (err) {
      console.log("Audio error:", err);
    }
  };

  const nextSong = () => {
    const next = (currentSong + 1) % songs.length;
    setCurrentSong(next);
    setIsPlaying(false);
  };

  const prevSong = () => {
    const prev =
      currentSong === 0 ? songs.length - 1 : currentSong - 1;
    setCurrentSong(prev);
    setIsPlaying(false);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">

        {/* TITLE */}
        <h2 className="text-xl font-semibold text-white mb-2">
          Lofi Player
        </h2>

        <p className="text-sm text-gray-300 mb-4">
          Focus / Study Music
        </p>

        {/* SONG DISPLAY */}
        <div className="bg-gradient-to-r from-purple-700 to-blue-500 text-white p-4 rounded-xl mb-4 shadow">
          🎧 {songTitles[currentSong]}
        </div>

        {/* AUDIO */}
        <audio
          ref={audioRef}
          src={songs[currentSong]}
          loop
        />

        {/* CONTROLS */}
        <div className="flex justify-between items-center mb-4">

          <button
            onClick={prevSong}
            className="text-white bg-white/10 px-3 py-2 rounded-lg hover:bg-white/20"
          >
            ⏮
          </button>

          <button
            onClick={togglePlay}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            {isPlaying ? "Pause ⏸" : "Play ▶"}
          </button>

          <button
            onClick={nextSong}
            className="text-white bg-white/10 px-3 py-2 rounded-lg hover:bg-white/20"
          >
            ⏭
          </button>

        </div>

        {/* INDICATOR */}
        <div className="flex justify-center gap-1">
          {songs.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === currentSong
                  ? "bg-white"
                  : "bg-white/30"
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}