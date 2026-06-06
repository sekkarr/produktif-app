import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
      <Navbar />
      <main className="pt-36 md:pt-32">
        <Outlet />
      </main>
    </>
  );
}