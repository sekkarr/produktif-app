import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

import Dashboard from "./pages/Dashboard";
import EisenhowerPage from "./pages/EisenhowerPage";
import FokusMode from "./pages/FokusMode";

import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";

function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* APP (PROTECTED AREA) */}
      <Route element={<AppLayout />}>
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

        <Route
          path="/fokus-mode"
          element={
            <ProtectedRoute>
              <FokusMode />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;