import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import UpcomingClasses from "./pages/UpcomingClasses";
import LearningPackages from "./pages/LearningPackages";
import Library from "./pages/Library";
import Events from "./pages/Events";
import ManageClasses from "./pages/admin/ManageClasses";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/upcoming-classes" element={<UpcomingClasses />} />
          <Route path="/packages" element={<LearningPackages />} />
          <Route path="/library" element={<Library />} />
          <Route path="/events" element={<Events />} />
          <Route path="/admin/classes" element={<ManageClasses />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
