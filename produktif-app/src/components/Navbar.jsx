import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkClass = ({ isActive }) => `
    px-4 py-2 rounded-xl
    transition duration-200
    hover:bg-white/10
    ${isActive ? "bg-white/20 backdrop-blur-md" : ""}
  `;

  return (
    
   <nav
  className="
    fixed top-0 left-0 w-full
    z-50

    flex flex-col md:flex-row
    md:justify-between
    items-center

    gap-4

    px-4 md:px-6
    py-4

    bg-black/30
    backdrop-blur-md
    border-b border-white/10
  "
>
  <h1 className="flex items-center gap-2 text-2xl md:text-3xl font-bold tracking-wide">
    <img src="/icon/logo.png" alt="Logo" className="w-7 h-7 md:w-8 md:h-8" />
    FokusIn
  </h1>

  <div className="flex flex-wrap justify-center items-center gap-3 md:gap-5">
    <NavLink to="/dashboard" className={linkClass}>
      Dashboard
    </NavLink>

    <NavLink to="/eisenhower" className={linkClass}>
      Task
    </NavLink>

    <NavLink to="/fokus-mode" className={linkClass}>
      Focus Mode
    </NavLink>

    <button
      onClick={handleLogout}
      className="
        px-4 py-2 rounded-xl
        hover:bg-red-500/80
        transition duration-200
      "
    >
      Logout
    </button>
  </div>
</nav>
    
  );
}
