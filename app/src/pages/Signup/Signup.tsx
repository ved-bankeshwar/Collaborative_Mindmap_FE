import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import bgVideo from "../../assets/videos/bgvideo.mp4";
import api from "../../api/api";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Registration Successful!");

      navigate("/dashboard");
    } catch (error: any) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message || "Registration failed");
      } else {
        alert("Unable to connect to backend");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden text-white font-sans">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-xl rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 md:p-10 shadow-2xl">

            <h1 className="text-4xl font-bold text-center mb-2">
              Create Account
            </h1>

            <p className="text-center text-gray-300 mb-8">
              Join Collaborative Mind Map
            </p>

            <div className="flex flex-col gap-5">

              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder-gray-300 outline-none"
              />

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder-gray-300 outline-none"
              />

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder-gray-300 outline-none"
              />

              <button
                onClick={handleSignup}
                disabled={loading}
                className="w-full rounded-xl bg-white py-4 text-black font-semibold hover:bg-gray-200 disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>

              <p className="text-center text-gray-300">
                Already have an account?
                <span
                  onClick={() => navigate("/login")}
                  className="ml-2 cursor-pointer text-purple-300 hover:underline"
                >
                  Login
                </span>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;