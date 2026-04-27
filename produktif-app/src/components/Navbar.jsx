import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "20px", padding: "10px" }}>
      <Link to="/">Dashboard</Link>
      <Link to="/eisenhower">Eisenhower</Link>
      <Link to="/fokus-mode">Fokus Mode</Link>
    </nav>
  );
}
