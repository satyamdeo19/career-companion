import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Import the new icon for the dashboard button
import { CheckCircle, Repeat, LayoutDashboard } from "lucide-react";

const PredictionResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { prediction, probability } = location.state || {};
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const goToQuiz = () => {
    navigate("/quiz");
  };
  
  // --- NEW: Function to navigate back to the dashboard ---
  const goToDashboard = () => {
    navigate("/dashboard");
  };
  
  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <p className="text-2xl text-gray-600 animate-pulse">Analyzing your results...</p>
        </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="relative z-10 flex flex-col items-center w-full">
        <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-center text-gray-800">
          Your Future Career Path
        </h1>

        {prediction ? (
          <div className="w-full max-w-2xl">
            <div className="shadow-2xl rounded-2xl p-8 text-center bg-white border border-gray-200">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-xl text-gray-600 mb-2">
                Based on your answers, your recommended career is:
              </p>
              <p className="text-4xl font-bold text-gray-900">
                {prediction}
              </p>
              <p className="text-md text-gray-500 mt-4">
                Confidence Score: <span className="font-semibold">{(probability * 100).toFixed(1)}%</span>
              </p>
            </div>
          </div>
        ) : (
          <p className="text-2xl text-red-500">No prediction available. Please go back and complete the quiz.</p>
        )}

        {/* --- NEW: Wrapper for the action buttons --- */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full max-w-2xl">
          <button
            className="w-full sm:w-auto flex-1 py-3 px-6 rounded-xl bg-gray-700 text-white font-bold shadow-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            onClick={goToDashboard}
          >
            <LayoutDashboard className="w-5 h-5" />
            Back to Dashboard
          </button>
          <button
            className="w-full sm:w-auto flex-1 py-3 px-6 rounded-xl bg-blue-600 text-white font-bold shadow-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            onClick={goToQuiz}
          >
            <Repeat className="w-5 h-5" />
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictionResultPage;

