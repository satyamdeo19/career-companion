import React from "react";
import {
  Target,
  Calendar,
  Code,
  Brain,
  FileText,
  MessageSquare,
  Briefcase,
  BarChart3,
  Trophy,
} from "lucide-react";

export const features = [
  {
    icon: <Target className="w-8 h-8 text-blue-500" />,
    title: "AI Career Roadmap",
    description:
      "Get personalized study plans based on your chosen career path with AI-powered recommendations.",
  },
  {
    icon: <Calendar className="w-8 h-8 text-green-500" />,
    title: "Daily Task Scheduler",
    description:
      "Manage your tasks with drag-and-drop calendar view and full CRUD functionality.",
  },
  {
    icon: <Code className="w-8 h-8 text-purple-500" />,
    title: "Coding Progress Tracker",
    description:
      "Track your LeetCode/GFG progress with detailed graphs and streak analytics.",
  },
  {
    icon: <Brain className="w-8 h-8 text-red-500" />,
    title: "AI Mock Interview Studio",
    description:
      "Practice with AI-powered interviews, real-time feedback, and speech analysis.",
  },
  {
    icon: <FileText className="w-8 h-8 text-orange-500" />,
    title: "Resume Analyzer",
    description:
      "Get AI feedback on your resume with keyword optimization and formatting tips.",
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-teal-500" />,
    title: "Job Matcher & Content Generator",
    description:
      "AI-powered job matching and automated cover letter generation.",
  },
  {
    icon: <Briefcase className="w-8 h-8 text-indigo-500" />,
    title: "Job Application Tracker",
    description:
      "Kanban-style board to manage your job applications and interview schedules.",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-pink-500" />,
    title: "Career Analytics",
    description:
      "Track your progress with detailed insights and success rate analytics.",
  },
  {
    icon: <Trophy className="w-8 h-8 text-yellow-500" />,
    title: "Gamification Engine",
    description:
      "Earn XP points, compete on leaderboards, and maintain daily streaks.",
  },
];