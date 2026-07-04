import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Landing from "../pages/Landing/Landing";
import Workspace from "../pages/Workspace/Workspace";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Signup */}
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Landing />
            </ProtectedRoute>
          }
        />

        {/* Workspace */}
        <Route
          path="/workspace"
          element={
            <ProtectedRoute>
              <Workspace />
            </ProtectedRoute>
          }
        />

        {/* Redirect unknown URLs */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;