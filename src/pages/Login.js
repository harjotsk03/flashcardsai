import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  ArrowRightIcon,
  ExclamationCircleIcon,
  LockClosedIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, error, setError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailOrUsername.trim() || !password) {
      setError("Email/username and password are required");
      return;
    }

    setIsLoading(true);
    const success = await login(emailOrUsername, password);
    setIsLoading(false);

    if (success) {
      navigate("/decks");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-[#ffc01d] rounded-bl-full opacity-20 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-[#7231ff] rounded-tr-full opacity-10 -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#7231ff] to-[#ffc01d]"></div>
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-indigo-100 rounded-full opacity-50"></div>
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-yellow-100 rounded-full opacity-50"></div>

        <div className="text-center mb-8 relative">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to continue to FlashCards</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start"
          >
            <ExclamationCircleIcon className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="emailOrUsername"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email or Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="emailOrUsername"
                type="text"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7231ff] focus:border-[#7231ff] transition-colors"
                placeholder="Enter your email or username"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-[#7231ff] hover:text-indigo-800"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7231ff] focus:border-[#7231ff] transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full bg-[#7231ff] text-white py-3 rounded-lg font-medium flex items-center justify-center transition-all ${
              isLoading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-indigo-700"
            }`}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <>
                Sign In <ArrowRightIcon className="w-5 h-5 ml-2" />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#7231ff] font-medium hover:text-indigo-800"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Decorative card elements */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-[#ffc01d] opacity-20 mx-1"></div>
            <div className="w-8 h-8 rounded-full bg-[#7231ff] opacity-20 mx-1"></div>
            <div className="w-8 h-8 rounded-full bg-[#ffc01d] opacity-20 mx-1"></div>
          </div>
        </div>
      </motion.div>

      {/* Floating cards decoration */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 0.7, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="hidden lg:block absolute left-20 top-1/2 transform -translate-y-1/2"
      >
        <div className="relative h-64 w-48">
          <div className="absolute top-0 left-0 w-full bg-[#7231ff] rounded-2xl shadow-lg p-4 transform -rotate-6">
            <div className="bg-white rounded-xl p-4">
              <div className="bg-gray-100 rounded-lg p-3 mb-3">
                <h3 className="font-bold text-gray-800 text-sm">
                  Welcome Back
                </h3>
                <p className="text-gray-600 text-xs">
                  Ready to continue learning?
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Sign in</span>
                <span className="text-xs font-medium text-[#7231ff]">
                  FlashCards
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.7, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="hidden lg:block absolute right-20 top-1/2 transform -translate-y-1/2"
      >
        <div className="relative h-64 w-48">
          <div className="absolute top-0 left-0 w-full bg-[#ffc01d] rounded-2xl shadow-lg p-4 transform rotate-6">
            <div className="bg-white rounded-xl p-4">
              <div className="bg-gray-100 rounded-lg p-3 mb-3">
                <h3 className="font-bold text-gray-800 text-sm">
                  Study Anytime
                </h3>
                <p className="text-gray-600 text-xs">
                  Access your flashcards anywhere
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Learn</span>
                <span className="text-xs font-medium text-[#7231ff]">
                  FlashCards
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
