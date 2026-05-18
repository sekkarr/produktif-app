import { useState, useRef, useEffect } from "react";

export default function LofiPlayer() {
  const audioRef = useRef(null);

  const songs = [
    {
      title: "Lofi Chill",
      url: "/lofi-songs/bliss.mp3",
    },
    {
      title: "Rain Focus",
      url: "/lofi-songs/bliss.mp3",
    },
    {
      title: "Night Study",
      url: "/lofi-songs/bliss.mp3",
    },
    {
      title: "Deep Focus",
      url: "/lofi-songs/bliss.mp3",
    },
    {
      title: "Coffee Jazz",
      url: "/lofi-songs/bliss.mp3",
    },
  ];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);

  // auto play
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [currentSong]);

  // play or pause
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

  // next song
  const nextSong = () => {
    const next = (currentSong + 1) % songs.length;
    setCurrentSong(next);
  };

  // prev song
  const prevSong = () => {
    const prev = currentSong === 0 ? songs.length - 1 : currentSong - 1;

    setCurrentSong(prev);
  };

  // pilih list song
  const selectSong = async (index) => {
    setCurrentSong(index);

    if (!isPlaying) {
      setIsPlaying(true);
    }

    setTimeout(async () => {
      try {
        await audioRef.current.play();
      } catch (err) {
        console.log(err);
      }
    }, 100);
  };

  return (
    <div className="flex justify-center items-center text-white">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 w-full max-w-md text-center">
        {/* TITLE */}
        <h2 className="text-2xl font-semibold mb-2">🎵 Lofi Player</h2>

        <p className="text-sm text-gray-300 mb-4">Focus / Study Music</p>

        {/* NOW PLAYING */}
        <div className="bg-gradient-to-r from-purple-700 to-blue-500 text-white p-5 rounded-2xl mb-5 shadow-lg">
          <p className="text-xs text-gray-200 mb-1">NOW PLAYING</p>

          <h3 className="text-lg font-semibold">
            🎧 {songs[currentSong].title}
          </h3>
        </div>

        {/* AUDIO */}
        <audio ref={audioRef} src={songs[currentSong].url} loop />

        {/* CONTROLS */}
        <div className="flex justify-center items-center gap-4 mb-5">
          <button
            onClick={prevSong}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition"
          >
          <img
    src="/icon/prev.png"
    alt="Next"
    className="w-5 h-5"
  />
          </button>

          <button
            onClick={togglePlay}
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-medium transition"
          >
            {isPlaying ? "Pause ⏸" : "Play ▶"}
          </button>

          <button
  onClick={nextSong}
  className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition"
>
  <img
    src="/icon/next.png"
    alt="Next"
    className="w-5 h-5"
  />
</button>
        </div>

        {/* DOT INDICATOR */}
        <div className="flex justify-center gap-2 mb-5">
          {songs.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === currentSong ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* PLAYLIST */}
        <div className="mt-4 space-y-2 max-h-56 overflow-y-auto">
          {songs.map((song, index) => (
            <button
              key={index}
              onClick={() => selectSong(index)}
              className={`w-full flex justify-between items-center px-4 py-3 rounded-xl transition text-left ${
                currentSong === index
                  ? "bg-indigo-600 text-white"
                  : "bg-white/5 hover:bg-white/10 text-gray-300"
              }`}
            >
              <span>🎵 {song.title}</span>

              {currentSong === index && (
                <span className="text-xs">
                  {isPlaying ? "Playing" : "Paused"}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
