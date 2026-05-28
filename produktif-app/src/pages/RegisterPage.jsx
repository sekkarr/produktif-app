import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [popup, setPopup] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setPopup({
        type: "error",
        message: "Please fill all fields",
      });
      return;
    }

    if (password !== confirmPassword) {
      setPopup({
        type: "error",
        message: "Passwords do not match",
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      setPopup({
        type: "success",
        message: "Registration successful!",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      setPopup({
        type: "error",
        message: error.message,
      });
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-[#0F172A]
        via-[#111827]
        to-[#1E1B4B]
        flex
        justify-center
        items-center
        px-6
        text-white
      "
    >
      <div
        className="
          w-full
          max-w-md
          bg-white/10
          border border-white/10
          backdrop-blur-md
          rounded-3xl
          p-8
          shadow-2xl
        "
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">Create Account</h1>

          <p className="text-gray-300">Start your productivity journey.</p>
        </div>

        <form onSubmit={handleRegister}>
          {/* Email */}
          <div className="mb-5">
            <label className="block mb-2 text-sm text-gray-300">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full
                p-3
                rounded-xl
                bg-white/10
                border border-white/10
                text-white
                placeholder-gray-400
                focus:outline-none
              "
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block mb-2 text-sm text-gray-300">Password</label>

            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                p-3
                rounded-xl
                bg-white/10
                border border-white/10
                text-white
                placeholder-gray-400
                focus:outline-none
              "
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block mb-2 text-sm text-gray-300">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="
                w-full
                p-3
                rounded-xl
                bg-white/10
                border border-white/10
                text-white
                placeholder-gray-400
                focus:outline-none
              "
            />
          </div>

          <button
            type="submit"
            className="
              w-full
              bg-indigo-600
              hover:bg-indigo-700
              transition
              py-3
              rounded-xl
              font-medium
              shadow-xl
            "
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-300 hover:text-indigo-200">
            Login
          </Link>
        </p>
      </div>

      {popup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 w-full max-w-sm text-white shadow-2xl text-center">
            <h2
              className={`text-xl font-semibold mb-3 ${
                popup.type === "success" ? "text-green-400" : "text-red-400"
              }`}
            >
              {popup.type === "success" ? "Success" : "Error"}
            </h2>

            <p className="text-gray-300 text-sm mb-6">{popup.message}</p>

            <button
              onClick={() => setPopup(null)}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
