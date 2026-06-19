import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login'; 
import Landing from '../pages/Landing/Landing';
import Workspace from "../pages/Workspace/Workspace";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* The Root url goes directly to Login */}
        <Route path="/" element={<Login />} />
        
        {/* Your dashboard URL handles the Landing page */}
        <Route path="/dashboard" element={<Landing />} />

        <Route path="/workspace" element={<Workspace />} />

        {/* CATCH-ALL REDIRECT: If the browser tries to load ANY other path (like a cached fallback), 
            it automatically forces them back to the Login screen safely. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;