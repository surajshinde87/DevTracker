'use client';

import React from 'react';
import {
  FaUserPlus,
  FaTools,
  FaMapMarkedAlt,
  FaRegStickyNote,
  FaBrain,
  FaVial,
  FaChartLine,
  FaRobot,
  FaMedal,
} from 'react-icons/fa';

const steps = [
  { icon: FaUserPlus, title: "Sign up & choose your role", desc: "Frontend, Full Stack, Backend, DSA, DevOps…" },
  { icon: FaTools, title: "Tell us what you know", desc: "Select your existing skills – we’ll build your roadmap." },
  { icon: FaMapMarkedAlt, title: "Get your personalized roadmap", desc: "AI guides your learning with clear steps & goals." },
  { icon: FaRegStickyNote, title: "Track skills & save notes", desc: "Organize topics, add notes, and attach resources." },
  { icon: FaBrain, title: "Revise smarter with AI", desc: "Flashcards, quizzes, and AI-generated revision help." },
  { icon: FaVial, title: "Test & improve", desc: "Take quizzes, answer theory questions, and learn from feedback." },
  { icon: FaChartLine, title: "Analyze your growth", desc: "Progress charts show your strengths & improvement areas." },
  { icon: FaRobot, title: "Ask the AI assistant anytime", desc: "Clear doubts, get examples, or generate notes instantly." },
  { icon: FaMedal, title: "Earn badges & build your journey!", desc: "Stay motivated with streaks, XP, and achievements." },
];

const StepsGuide = () => {
  return (
    <div className="hidden lg:flex flex-col justify-center items-center w-1/2 px-10 py-12 bg-[#6c4bc8] text-white dark:text-gray-200 shadow-xl">
      <h1 className="text-3xl font-bold mb-4">Your Dev Journey, Simplified with AI</h1>

      <div className="relative flex flex-col items-center space-y-8 mt-4 text-purple-100">
        {Array.from({ length: Math.ceil(steps.length / 2) }).map((_, rowIndex) => {
          const firstIndex = rowIndex * 2;
          const stepsInRow = steps.slice(firstIndex, firstIndex + 2);

          return (
            <div key={rowIndex} className="flex w-full max-w-6xl justify-center space-x-6">
              {stepsInRow.map((step, indexInRow) => {
                const actualIndex = firstIndex + indexInRow;
                const Icon = step.icon;

                return (
                  <div key={actualIndex} className="relative w-1/2 bg-[#f4f4f4] dark:bg-[#333537] rounded-xl p-4 shadow-lg">
                    <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-200 text-[#6c4bc8] font-extrabold rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                      {actualIndex + 1}
                    </div>
                    <div className="flex items-start space-x-4">
                      <Icon className="text-2xl flex-shrink-0 text-[#6c4bc8] dark:text-gray-200 mt-1" />
                      <div>
                        <strong className="text-[#6c4bc8] dark:text-gray-200">{step.title}</strong>
                        <p className="text-sm text-[#6c4bc8] dark:text-gray-400">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepsGuide;
