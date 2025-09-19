import React, { useState } from "react";
import LandingPage from "./pages/LandingPage.jsx";
// Correct the casing here from "DashBoard.jsx" to "Dashboard.jsx"
import Dashboard from "./pages/DashBoard.jsx"; 
import LoginModal from "./components/LoginModal.jsx";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="app">
      {isLoggedIn ? (
        <Dashboard setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <LandingPage setShowLoginModal={setShowLoginModal} />
      )}
      {showLoginModal && (
        <LoginModal
          setShowLoginModal={setShowLoginModal}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </div>
  );
};

export default App;