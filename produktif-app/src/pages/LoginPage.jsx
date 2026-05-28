import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(null);

const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setPopup({
      type: "error",
      message: "Please fill all fields",
    });
    return;
  }

  setLoading(true);

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    localStorage.setItem(
      "user",
      JSON.stringify({
        uid: user.uid,
        email: user.email,
      })
    );

    setPopup({
      type: "success",
      message: "Login successful!",
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);

  } catch (error) {
  console.log(error.code); 

  let message = "Login failed";

  switch (error.code) {
    case "auth/user-not-found":
      message = "Email not registered";
      break;

    case "auth/wrong-password":
      message = "Incorrect password";
      break;

    case "auth/invalid-email":
      message = "Invalid email format";
      break;

    case "auth/invalid-credential":
      message = "Wrong email or password";
      break;

    case "auth/too-many-requests":
      message = "Too many attempts, try again later";
      break;

    default:
      message = "Login failed";
  }

  setPopup({
    type: "error",
    message,
  });
}finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#1E1B4B] flex justify-center items-center px-6 text-white">
      <div className="w-full max-w-md bg-white/10 border border-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">FokusIn</h1>
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
              className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none"
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
              className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition py-3 rounded-xl font-medium shadow-xl"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* LINK REGISTER */}
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
    </div>
  );
}