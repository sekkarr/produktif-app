import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import EisenhowerPage from "./pages/EisenhowerPage";
import FokusMode from "./pages/FokusMode";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PairingScan from "./pages/PairingScan";

function App() {
  const location = useLocation();

  // halaman yang TIDAK pakai navbar
const hideNavbar =
  location.pathname === "/" ||
  location.pathname === "/login" ||
  location.pathname === "/register";

  return (
    <div className="min-h-screen pt-32 md:pt-20">

      {/* NAVBAR CONDITIONAL */}
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/fokus-mode" element={<FokusMode />} />
        <Route path="/pairing-scan" element={<PairingScan />} />

        {/* PROTECTED */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/eisenhower"
          element={
            <ProtectedRoute>
              <EisenhowerPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;