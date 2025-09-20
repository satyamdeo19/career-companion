import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API requests
import { Lock, Mail, User, Chrome, X } from "lucide-react";
import { SiGithub } from "react-icons/si";

// You might not need these here if you are handling OAuth fully on the client
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const githubClientId = import.meta.env.VITE_GITHUB_CLIENT_ID;

const LoginModal = ({ setShowLoginModal, setIsLoggedIn }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  // --- NEW: State for form inputs, loading, and errors ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- NEW: API base URL ---
  const API_URL = "http://localhost:5001/api/auth";

  // --- NEW: Function to handle form submission ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = isSignUp ? "/register" : "/login";
    const payload = isSignUp ? { name, email, password } : { email, password };

    try {
      const response = await axios.post(`${API_URL}${endpoint}`, payload);

      // If successful, we get a token back.
      if (response.data && response.data.token) {
        // 1. Save the token to local storage for persistence
        localStorage.setItem("token", response.data.token);
        
        // 2. Update the app's state to logged in
        setIsLoggedIn(true);

        // 3. Close the modal
        setShowLoginModal(false);
      }
    } catch (err) {
      // Set a user-friendly error message
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // OAuth handlers (placeholders for now, requires more setup)
  const handleGoogleLogin = () => {
    // This requires a more complex client-side flow to get the user profile
    // and then send it to your backend's /api/auth/google endpoint.
    console.log("Google login clicked. Integration required.");
  };

  const handleGitHubLogin = () => {
    console.log("GitHub login clicked. Integration required.");
  };
  
  // The rest of your component's JSX...
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full relative animate-fade-in-up">
        <button
          onClick={() => setShowLoginModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-600">
            {isSignUp
              ? "Start your career journey today"
              : "Sign in to continue your progress"}
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-4 mb-6">
           <button
             onClick={handleGoogleLogin}
             className="w-full flex items-center justify-center gap-3 bg-red-50 hover:bg-red-100 text-red-600 py-3 px-4 rounded-xl transition-colors"
           >
             <Chrome className="w-5 h-5" />
             Continue with Google
           </button>
           <button
             onClick={handleGitHubLogin}
             className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white py-3 px-4 rounded-xl transition-colors"
           >
             <SiGithub className="w-5 h-5" />
             Continue with GitHub
           </button>
        </div>

        <div className="relative mb-6">
           <div className="absolute inset-0 flex items-center">
             <div className="w-full border-t border-gray-300"></div>
           </div>
           <div className="relative flex justify-center text-sm">
             <span className="px-2 bg-white text-gray-500">
               Or continue with email
             </span>
           </div>
        </div>
        
        {/* --- UPDATED: Form now uses the new handler --- */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {isSignUp && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* --- NEW: Displaying error messages --- */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : (isSignUp ? "Create Account" : "Sign In")}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null); // Clear errors when switching forms
            }}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
