import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Navigates to /dashboard based on your existing logic
    navigate("/dashboard");
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white font-sans">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover -z-20"
      ></video>

      {/* Dark Overlay (Replaces the .login-page::before CSS) */}
      <div className="fixed inset-0 bg-black/45 -z-10"></div>

      {/* Navbar */}
      <Navbar />

      {/* Login Section */}
      <div className="flex flex-col gap-5 w-[85%] max-w-[420px] mx-auto mt-[100px] items-center text-center sm:w-[90%] sm:mx-0 sm:ml-10 sm:items-start sm:text-left md:ml-20 md:mt-[70px]">
        <h1 className="text-[2.5rem] font-bold sm:text-5xl md:text-6xl">
          Site Name
        </h1>

        <h2 className="text-[1.5rem] font-normal sm:text-[1.7rem] md:text-4xl">
          Login
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-[14px] md:p-4 border-none rounded-xl outline-none text-base text-gray-900 bg-white"
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-[14px] md:p-4 border-none rounded-xl outline-none text-base text-gray-900 bg-white"
        />

        <button
          className="w-full md:w-[220px] p-3 rounded-[30px] border border-white/40 bg-white/10 text-white cursor-pointer transition duration-300 hover:bg-white/15"
          onClick={handleLogin}
        >
          Sign in with Google
        </button>

        <button
          className="w-full mt-2.5 p-2.5 cursor-pointer bg-white text-black font-semibold rounded-lg transition hover:bg-gray-200"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="mt-2.5 text-[0.95rem] md:text-base">
          Don’t have an account? Sign up here!
        </p>
      </div>
    </div>
  );
};

export default Login;
