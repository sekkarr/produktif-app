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
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "16px",
        background: "linear-gradient(135deg, #a18cd1, #fbc2eb)",
        color: "white",
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>🎧 Lofi Player</h2>

      <p style={{ fontSize: "14px", opacity: 0.9 }}>
        Focus / Study Music
      </p>

      <div
        style={{
          margin: "20px 0",
          padding: "15px",
          borderRadius: "12px",
          background: "rgba(255,255,255,0.2)",
        }}
      >
        🎵 Chill Lofi - Study Beats
      </div>

      <button
        onClick={togglePlay}
        style={{
          padding: "10px 20px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {isPlaying ? "Pause ⏸" : "Play ▶"}
      </button>

      <audio ref={audioRef} src="/lofi-songs/Bliss for Relaxation & Focus.mp3" />
    </div>
  );
}