import React from "react";
import { useNavigate } from "react-router-dom";
import { Target, User, Bell, Star, ArrowRight } from "lucide-react";
import { features } from "../services/featureData.jsx";

const Dashboard = ({ handleLogout }) => {
  const navigate = useNavigate();

  const handleFeatureClick = (featureTitle) => {
    // This check will navigate to the quiz page if the correct card is clicked.
    // Ensure the title in your featureData.jsx is an exact match.
    if (featureTitle === "AI Career Roadmap") {
      navigate("/quiz");
    } else {
      console.log(`Navigation for "${featureTitle}" is not yet implemented.`);
      // You could add an alert for non-implemented features:
      // alert(`The "${featureTitle}" feature is coming soon!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-800">
                Career Companion
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 rounded-full hover:bg-gray-100">
                <Bell className="w-5 h-5 text-gray-500" />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back!
          </h1>
          <p className="text-gray-600">Here's your career progress overview</p>
        </div>

        {/* Quick Stats */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">15</div>
            <div className="text-sm text-gray-600">Tasks Completed</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">7</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">1,250</div>
            <div className="text-sm text-gray-600">XP Points</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">3</div>
            <div className="text-sm text-gray-600">Applications</div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => handleFeatureClick(feature.title)}
              className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <Star className="w-4 h-4 text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {feature.description}
              </p>
              {/* The button is now part of the larger clickable card */}
              <div className="text-blue-600 text-sm font-medium group-hover:text-blue-700 flex items-center gap-1">
                Open <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

