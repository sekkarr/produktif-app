import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import EisenhowerPage from "./pages/EisenhowerPage";
import FokusMode from "./pages/FokusMode";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/eisenhower" element={<EisenhowerPage />} />
        <Route path="/fokus-mode" element={<FokusMode />} />
      </Routes>
    </div>
  );
}

export default App;
