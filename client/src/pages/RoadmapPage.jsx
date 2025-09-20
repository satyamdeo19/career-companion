import React, { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart2 } from "lucide-react";

// --- The Correctly Memoized Question Component ---
// This component is now truly independent. It only re-renders if its specific props change.
const Question = React.memo(
  ({ number, text, name, value, onChange, type = "select", options }) => {
    const inputProps = {
      name,
      value,
      onChange,
      required: true,
      className:
        "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white",
    };

    return (
      <div className="border-b border-gray-200 pb-6 animate-fadeIn">
        <label className="block text-lg font-semibold text-gray-800 mb-3">
          <span className="text-blue-600 font-bold">{number}.</span> {text}
        </label>
        {type === "number" ? (
          <input
            type="number"
            {...inputProps}
            min={options.min}
            max={options.max}
          />
        ) : (
          <select {...inputProps}>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}
      </div>
    );
  }
);

const RoadmapPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
    question6: "",
    question7: "",
    question8: "",
    question9: "",
    question10: "",
    question11: "",
    question12: "",
    question13: "",
    question14: "",
    question15: "",
    question16: "",
    question17: "",
    question18: "",
    question19: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useCallback prevents the handleChange function from being recreated on every render,
  // which is essential for React.memo to work correctly.
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const progress = useMemo(() => {
    const totalQuestions = Object.keys(formData).length;
    const answeredQuestions = Object.values(formData).filter(
      (value) => value !== ""
    ).length;
    return (answeredQuestions / totalQuestions) * 100;
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication error. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/roadmap/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to get recommendation.");
      }
      const data = await res.json();
      navigate("/predict", {
        state: { prediction: data.prediction, probability: data.probability },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Define questions data here to keep the JSX clean
  const questions = [
    {
      num: 1,
      name: "question1",
      text: "How would you rate your logical reasoning skills (1-9)?",
      type: "number",
      options: { min: 1, max: 9 },
    },
    {
      num: 2,
      name: "question2",
      text: "How many hackathons have you participated in?",
      type: "number",
      options: { min: 0, max: 10 },
    },
    {
      num: 3,
      name: "question3",
      text: "How would you rate your coding skills (1-9)?",
      type: "number",
      options: { min: 1, max: 9 },
    },
    {
      num: 4,
      name: "question4",
      text: "How would you rate your public speaking skills (1-9)?",
      type: "number",
      options: { min: 1, max: 9 },
    },
    {
      num: 5,
      name: "question5",
      text: "Are you good at self-learning?",
      type: "select",
      options: [
        { value: "", label: "Select..." },
        { value: "1", label: "Yes" },
        { value: "0", label: "No" },
      ],
    },
    {
      num: 6,
      name: "question6",
      text: "Have you completed extra courses?",
      type: "select",
      options: [
        { value: "", label: "Select..." },
        { value: "1", label: "Yes" },
        { value: "0", label: "No" },
      ],
    },
    {
      num: 7,
      name: "question7",
      text: "Which of the following certifications do you have?",
      type: "select",
      options: [
        { value: "", label: "Select..." },
        { value: "R Programming", label: "R Programming" },
        { value: "Information Security", label: "Information Security" },
        { value: "Shell Programming", label: "Shell Programming" },
        { value: "Machine Learning", label: "Machine Learning" },
        { value: "Full Stack", label: "Full Stack" },
        { value: "Hadoop", label: "Hadoop" },
        { value: "Python", label: "Python" },
        { value: "Distro Making", label: "Distro Making" },
        { value: "App Development", label: "App Development" },
      ],
    },
    {
      num: 8,
      name: "question8",
      text: "Which of the following workshops have you attended?",
      type: "select",
      options: [
        { value: "", label: "Select..." },
        { value: "Database Security", label: "Database Security" },
        { value: "System Designing", label: "System Designing" },
        { value: "Web Technologies", label: "Web Technologies" },
        { value: "Hacking", label: "Hacking" },
        { value: "Testing", label: "Testing" },
        { value: "Data Science", label: "Data Science" },
        { value: "Game Development", label: "Game Development" },
        { value: "Cloud Computing", label: "Cloud Computing" },
      ],
    },
    {
      num: 9,
      name: "question9",
      text: "How would you rate your reading and writing skills?",
      type: "select",
      options: [
        { value: "", label: "Select..." },
        { value: "0", label: "Poor" },
        { value: "1", label: "Medium" },
        { value: "2", label: "Excellent" },
      ],
    },
    {
      num: 10,
      name: "question10",
      text: "How would you rate your memory capability?",
      type: "select",
      options: [
        { value: "", label: "Select..." },
        { value: "0", label: "Poor" },
        { value: "1", label: "Medium" },
        { value: "2", label: "Excellent" },
      ],
    },
    {
      num: 11,
      name: "question11",
      text: "Which subjects are you most interested in?",
      type: "select",
      options: [
        { value: "", label: "Select..." },
        { value: "0", label: "Software Engineering" },
        { value: "1", label: "IOT" },
        { value: "2", label: "Cloud Computing" },
        { value: "3", label: "Programming" },
        { value: "4", label: "Networks" },
        { value: "5", label: "Computer Architecture" },
        { value: "6", label: "Data Engineering" },
        { value: "7", label: "Hacking" },
        { value: "8", label: "Management" },
        { value: "9", label: "Parallel Computing" },
      ],
    },
    {
      num: 12,
      name: "question12",
      text: "What is your preferred career area?",
      type: "select",
      options: [
        { value: "", label: "Select..." },
        { value: "0", label: "System Developer" },
        { value: "1", label: "Security" },
        { value: "2", label: "Business Process Analyst" },
        { value: "3", label: "Developer" },
        { value: "4", label: "Testing" },
        { value: "5", label: "Cloud Computing" },
      ],
    },
    {
      num: 13,
      name: "question13",
      text: "What type of company would you like to work for?",
      type: "select",
      options: [
        { value: "", label: "Select..." },
        { value: "0", label: "Service Based" },
        { value: "1", label: "Web Services" },
        { value: "2", label: "BPA" },
        { value: "3", label: "Testing and Maintenance Services" },
        { value: "4", label: "Product Based" },
        { value: "5", label: "Finance" },
        { value: "6", label: "Cloud Services" },
        { value: "7", label: "Product Development" },
        { value: "8", label: "Sales and Marketing" },
        { value: "9", label: "SAaS Services" },
      ],
    },
    {
      num: 14,
      name: "question14",
      text: "Do you take advice from seniors or elders?",
      type: "select",
      options: [
        { value: "", label: "Select..." },
        { value: "1", label: "Yes" },
        { value: "0", label: "No" },
      ],
    },
    {
      num: 15,
      name: "question15",
      text: "What types of books do you enjoy reading?",
      type: "select",
      options: [
        { value: "", label: "Select..." },
        { value: "0", label: "Guide" },
        { value: "1", label: "Health" },
        { value: "2", label: "Self help" },
        // add remaining options as needed
      ],
    },
    {
      num: 16,
      name: "question16",
      text: "Do you prefer management or technical roles?",
      type: "select",
      options: [
        { value: "", label: "Select..." },
        { value: "1", label: "Management" },
        { value: "0", label: "Technical" },
      ],
    },
    {
      num: 17,
      name: "question17",
      text: "Do you consider yourself a hard worker or a smart worker?",
      type: "select",
      options: [
        { value: "", label: "Select..." },
        { value: "0", label: "Hard Worker" },
        { value: "1", label: "Smart Worker" },
      ],
    },
    {
      num: 18,
      name: "question18",
      text: "Have you ever worked in a team?",
      type: "select",
      options: [
        { value: "", label: "Select..." },
        { value: "1", label: "Yes" },
        { value: "0", label: "No" },
      ],
    },
    {
      num: 19,
      name: "question19",
      text: "Are you an introvert?",
      type: "select",
      options: [
        { value: "", label: "Select..." },
        { value: "1", label: "Yes" },
        { value: "0", label: "No" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-10">
          <BarChart2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">
            Discover Your Career Path
          </h1>
          <p className="text-lg text-gray-600">
            This quiz helps our AI recommend a career tailored to you.
          </p>
        </div>

        <div className="mb-10 bg-gray-200 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl space-y-8"
        >
          {/* This is a cleaner way to render all questions */}
          {questions.map((q) => (
            <Question
              key={q.num}
              number={q.num}
              text={q.text}
              name={q.name}
              value={formData[q.name]}
              onChange={handleChange}
              type={q.type}
              options={q.options}
            />
          ))}

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "See My Future Career"}
              <ArrowRight className="w-5 h-5" />
            </button>
            {error && (
              <p className="text-red-600 text-center mt-4 font-medium">
                {error}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoadmapPage;
