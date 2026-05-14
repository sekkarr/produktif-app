import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // VALIDASI SIMPLE
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // SIMPAN LOGIN
    localStorage.setItem("isLogin", true);

    // SIMPAN USER
    localStorage.setItem(
      "user",
      JSON.stringify({
        email,
      }),
    );

    // PINDAH KE DASHBOARD
    navigate("/dashboard");
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
      {/* CARD */}
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
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">
            FokusIn
          </h1>

          <p className="text-gray-300">
            Welcome back! Stay productive today.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin}>
          
          {/* EMAIL */}
          <div className="mb-5">
            <label className="block mb-2 text-sm text-gray-300">
              Email
            </label>

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

          {/* PASSWORD */}
          <div className="mb-6">
            <label className="block mb-2 text-sm text-gray-300">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
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

          {/* BUTTON */}
          <button
            type="submit"
            className="
              w-full
              bg-indigo-600 hover:bg-indigo-700
              transition
              py-3
              rounded-xl
              font-medium
              shadow-xl
            "
          >
            Login
          </button>
        </form>

        {/* REGISTER */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          
          <Link
            to="/register"
            className="text-indigo-300 hover:text-indigo-200"
          >
            Register
          </Link>
        </p>

        {/* BACK */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-sm text-gray-400 hover:text-white transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}