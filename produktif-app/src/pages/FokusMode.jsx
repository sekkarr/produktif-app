import LofiPlayer from "../components/LofiPlayer";
import PomodoroTimer from "../components/PomodoroTimer";

export default function FokusMode() {
  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Fokus Mode (-tambah lagu, fixing pomodoro, )
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* POMODORO */}
        <div
          style={{
            flex: 1,
            minWidth: "300px",
          }}
        >
          <PomodoroTimer />
        </div>

        {/* LOFI */}
        <div
          style={{
            flex: 1,
            minWidth: "300px",
          }}
        >
          <LofiPlayer />
        </div>
      </div>
    </div>
  );
}
