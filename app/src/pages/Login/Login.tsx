import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import bgVideo from "../../assets/videos/bgvideo.mp4";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
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
        {/* Navbar */}
        <Navbar />

        {/* Centered Login Section */}
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-center">
            Site Name
          </h1>

          <p className="text-lg md:text-2xl text-gray-300 mb-10 text-center">
            Welcome back. Sign in to continue.
          </p>

          {/* Glass Login Card */}
          <div className="w-full max-w-xl rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 md:p-10 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8">
              Login
            </h2>

            <div className="flex flex-col gap-5">
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder-gray-300 outline-none focus:border-white/40"
              />

              <input
                type="password"
                placeholder="Enter Password"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder-gray-300 outline-none focus:border-white/40"
              />

              <button
                onClick={handleLogin}
                className="w-full rounded-xl border border-white/20 bg-white/10 py-4 text-white font-medium backdrop-blur-md transition-all duration-300 hover:bg-white/20"
              >
                Sign in with Google
              </button>

              <button
                onClick={handleLogin}
                className="w-full rounded-xl bg-white py-4 text-black font-semibold transition-all duration-300 hover:bg-gray-200"
              >
                Login
              </button>

              <p className="mt-2 text-center text-gray-300">
                Don't have an account?
                <span className="ml-2 cursor-pointer text-purple-300 hover:underline">
                  Sign up here!
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;