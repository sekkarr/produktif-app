import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  

const handleRegister = async (e) => {
  e.preventDefault();

  if (!email || !password || !confirmPassword) {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);

    alert("Registration successful!");
    navigate("/login");
  } catch (error) {
    alert(error.message);
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
          <h1 className="text-4xl font-bold mb-3">
            Create Account
          </h1>

          <p className="text-gray-300">
            Start your productivity journey.
          </p>
        </div>

        <form onSubmit={handleRegister}>
          {/* Email */}
          <div className="mb-5">
            <label className="block mb-2 text-sm text-gray-300">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
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
            <label className="block mb-2 text-sm text-gray-300">
              Password
            </label>

            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
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
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
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
          <Link
            to="/login"
            className="text-indigo-300 hover:text-indigo-200"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}