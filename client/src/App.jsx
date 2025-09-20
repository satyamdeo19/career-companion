import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import all your page components
import LandingPage from "./pages/LandingPage.jsx";
import Dashboard from "./pages/DashBoard.jsx";
import RoadmapPage from "./pages/RoadmapPage.jsx"; // Your Quiz page
import PredictionResultPage from "./pages/PredictionResultPage.jsx"; // Your Predict page
import LoginModal from "./components/LoginModal.jsx";

// A helper component to protect routes that require authentication
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    // If not logged in, redirect them to the landing page
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Check for an existing token on initial app load to keep the user logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // A central logout function to clear the session
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="app">
        {/* The LoginModal can be shown on any page */}
        {showLoginModal && (
          <LoginModal
            setShowLoginModal={setShowLoginModal}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
        
        {/* Define all the application routes */}
        <Routes>
          <Route 
            path="/" 
            element={
              isLoggedIn ? <Navigate to="/dashboard" /> : <LandingPage setShowLoginModal={setShowLoginModal} />
            } 
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Dashboard handleLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <RoadmapPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/predict"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <PredictionResultPage />
              </ProtectedRoute>
            }
          />
          {/* Add a fallback route for any unknown paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

