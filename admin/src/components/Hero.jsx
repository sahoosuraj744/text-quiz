//
import { useEffect } from "react";
import { GraduationCap, Lock } from "lucide-react";

import { Link } from "react-router-dom";
const Hero = () => {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="text-center">
        {/* Icon */}
        <div className="relative inline-flex mb-6">
          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-2xl opacity-30 animate-pulse"></div>

          {/* Icon Circle */}
          <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-white text-indigo-600 shadow-lg">
            <GraduationCap size={40} />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome to Tech Quiz Master
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-500">
          Admin Panel - Manage quizzes, users, and analytics
        </p>
        <Link
          to="/dashboard"
          className="text-md text-indigo-500 mt-6 font-bold items-center flex justify-center gap-2 animate-pulse"
        >
          <Lock size={16} /> Please authenticate to continue
        </Link>
      </div>
    </section>
  );
};

export default Hero;
