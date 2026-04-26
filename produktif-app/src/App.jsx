import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import EisenhowerPage from "./pages/EisenhowerPage";
import LofiPage from "./pages/LofiPage";
import PomodoroPage from "./pages/PomodoroPage";


function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/eisenhower" element={<EisenhowerPage />} />
        <Route path="/pomodoro" element={<PomodoroPage />} />
        <Route path="/lofi" element={<LofiPage />} />
      </Routes>
    </div>
  );
}

export default App;