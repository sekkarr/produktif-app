import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "20px", padding: "10px" }}>
      <Link to="/">Dashboard</Link>
      <Link to="/pomodoro">Pomodoro</Link>
      <Link to="/lofi">Lofi</Link>
      <Link to="/eisenhower">Eisenhower</Link>
    </nav>
  );
}
