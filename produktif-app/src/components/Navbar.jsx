import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav style={{ display: "flex", gap: "20px", padding: "10px" }}>

      <Link to="/dashboard">Dashboard</Link>

      <Link to="/eisenhower">Eisenhower</Link>

      <Link to="/fokus-mode">Fokus Mode</Link>

      <button onClick={handleLogout}>
        Logout
      </button>

    </nav>
  );
}