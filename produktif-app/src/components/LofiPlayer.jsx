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
        background: "white",
        padding: "30px",
        borderRadius: "16px",
        width: "320px",
        textAlign: "center",
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: "10px", color: "#555" }}>Lofi Player</h2>

      <p style={{ fontSize: "14px", color: "#888" }}>Focus / Study Music</p>

      <div
        style={{
          margin: "20px 0",
          padding: "15px",
          borderRadius: "12px",
          background: "#f3f4f6",
        }}
      >
        Chill Lofi - Study Beats
      </div>

      <button
        onClick={togglePlay}
        style={{
          padding: "10px 20px",
          borderRadius: "10px",
          border: "none",
          background: "#4f46e5",
          color: "white",
          cursor: "pointer",
        }}
      >
        {isPlaying ? "Pause ⏸" : "Play ▶"}
      </button>

      <audio
        ref={audioRef}
        src="/lofi-songs/Bliss for Relaxation & Focus.mp3"
      />
    </div>
  );
}
