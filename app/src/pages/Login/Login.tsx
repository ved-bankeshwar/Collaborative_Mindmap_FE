import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import bgVideo from "../../assets/videos/bgvideo.mp4";
import api from "../../api/api";
import { signInWithGooglePopup } from "../../lib/firebase";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // -------------------- Email Login --------------------
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter your email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Login Successful!");

      navigate("/dashboard");
    } catch (error: any) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message || "Login failed");
      } else {
        alert("Unable to connect to backend");
      }
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Google Login --------------------
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithGooglePopup();
      const idToken = await result.user.getIdToken();

      const response = await api.post("/auth/google", {
        idToken,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Google Login Successful!");

      navigate("/dashboard");
    } catch (error: any) {
      console.error(error);

      // Ignore user-initiated cancellation or popup block errors
      if (
        error.code === "auth/popup-closed-by-user" ||
        error.code === "auth/cancelled-popup-request"
      ) {
        return;
      }

      if (error.response) {
        alert(error.response.data.message || "Google Login Failed");
      } else {
        alert(error.message || "Google Login Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden text-white font-sans">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-xl rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 md:p-10 shadow-2xl">

            <h1 className="text-5xl font-bold text-center mb-4">
              Mind-Map
            </h1>

            <p className="text-lg text-gray-300 text-center mb-8">
              Welcome back. Sign in to continue.
            </p>

            <div className="flex flex-col gap-5">

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder-gray-300 outline-none focus:border-white/40"
              />

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder-gray-300 outline-none focus:border-white/40"
              />

              {/* Google Login */}
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full rounded-xl border border-white/20 bg-white/10 py-4 text-white font-medium backdrop-blur-md transition-all duration-300 hover:bg-white/20 disabled:opacity-50"
              >
                {loading ? "Connecting..." : "Sign in with Google"}
              </button>

              {/* Email Login */}
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full rounded-xl bg-white py-4 text-black font-semibold transition-all duration-300 hover:bg-gray-200 disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="mt-2 text-center text-gray-300">
                Don't have an account?
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="ml-2 text-purple-300 hover:underline"
                >
                  Sign up here!
                </button>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;