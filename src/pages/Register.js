import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  ArrowRightIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validations, setValidations] = useState({
    username: { valid: false, message: "" },
    email: { valid: false, message: "" },
    password: { valid: false, message: "" },
    confirmPassword: { valid: false, message: "" },
  });

  const [isLoading, setIsLoading] = useState(false);
  const { register, error, setError } = useAuth();
  const navigate = useNavigate();

  // Validation functions
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_.]{3,20}$/;
    return usernameRegex.test(username);
  };

  const isValidPassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate fields as user types
    if (name === "email") {
      setValidations({
        ...validations,
        email: {
          valid: isValidEmail(value),
          message: isValidEmail(value)
            ? ""
            : "Please enter a valid email address",
        },
      });
    } else if (name === "username") {
      setValidations({
        ...validations,
        username: {
          valid: isValidUsername(value),
          message: isValidUsername(value)
            ? ""
            : "Username must be 3-20 characters and can only contain letters, numbers, underscores, or dots",
        },
      });
    } else if (name === "password") {
      const isValid = isValidPassword(value);
      setValidations({
        ...validations,
        password: {
          valid: isValid,
          message: isValid
            ? ""
            : "Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character",
        },
        confirmPassword: {
          ...validations.confirmPassword,
          valid: value === formData.confirmPassword && value !== "",
          message:
            value === formData.confirmPassword ? "" : "Passwords do not match",
        },
      });
    } else if (name === "confirmPassword") {
      setValidations({
        ...validations,
        confirmPassword: {
          valid: value === formData.password && value !== "",
          message: value === formData.password ? "" : "Passwords do not match",
        },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation check
    if (
      !validations.email.valid ||
      !validations.username.valid ||
      !validations.password.valid ||
      !validations.confirmPassword.valid
    ) {
      setError("Please fix the validation errors before submitting");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    // Remove confirmPassword before sending to API
    const { confirmPassword, ...userData } = formData;

    const success = await register(userData);
    setIsLoading(false);

    if (success) {
      navigate("/decks");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center pt-24 pb-48">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-[#ffc01d] rounded-bl-full opacity-20 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-[#7231ff] rounded-tr-full opacity-10 -z-10"></div>

      {/* Floating cards decoration - Left side */}
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
                <h3 className="font-bold text-gray-800 text-sm">Join Today</h3>
                <p className="text-gray-600 text-xs">Create your account</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Sign up</span>
                <span className="text-xs font-medium text-[#7231ff]">
                  FlashCards
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating cards decoration - Right side */}
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
                  Start Learning
                </h3>
                <p className="text-gray-600 text-xs">
                  Create flashcards instantly
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Register</span>
                <span className="text-xs font-medium text-[#7231ff]">
                  FlashCards
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md my-8 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#7231ff] to-[#ffc01d]"></div>
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-indigo-100 rounded-full opacity-50"></div>
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-yellow-100 rounded-full opacity-50"></div>

        <div className="text-center mb-8 relative">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Join FlashCards to start learning</p>
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
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IdentificationIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7231ff] focus:border-[#7231ff] transition-colors"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-3 rounded-lg border ${
                  formData.username &&
                  (validations.username.valid
                    ? "border-green-500"
                    : "border-red-500")
                } focus:ring-2 focus:ring-[#7231ff] focus:border-[#7231ff] transition-colors`}
                placeholder="Choose a username"
                required
              />
              {formData.username && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {validations.username.valid ? (
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {formData.username && !validations.username.valid && (
              <p className="mt-1 text-sm text-red-600">
                {validations.username.message}
              </p>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-3 rounded-lg border ${
                  formData.email &&
                  (validations.email.valid
                    ? "border-green-500"
                    : "border-red-500")
                } focus:ring-2 focus:ring-[#7231ff] focus:border-[#7231ff] transition-colors`}
                placeholder="Enter your email"
                required
              />
              {formData.email && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {validations.email.valid ? (
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {formData.email && !validations.email.valid && (
              <p className="mt-1 text-sm text-red-600">
                {validations.email.message}
              </p>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-3 rounded-lg border ${
                  formData.password &&
                  (validations.password.valid
                    ? "border-green-500"
                    : "border-red-500")
                } focus:ring-2 focus:ring-[#7231ff] focus:border-[#7231ff] transition-colors`}
                placeholder="Create a password"
                required
              />
              {formData.password && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {validations.password.valid ? (
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {formData.password && !validations.password.valid && (
              <p className="mt-1 text-sm text-red-600">
                {validations.password.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-3 rounded-lg border ${
                  formData.confirmPassword &&
                  (validations.confirmPassword.valid
                    ? "border-green-500"
                    : "border-red-500")
                } focus:ring-2 focus:ring-[#7231ff] focus:border-[#7231ff] transition-colors`}
                placeholder="Confirm your password"
                required
              />
              {formData.confirmPassword && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {validations.confirmPassword.valid ? (
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {formData.confirmPassword && !validations.confirmPassword.valid && (
              <p className="mt-1 text-sm text-red-600">
                {validations.confirmPassword.message}
              </p>
            )}
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
                Create Account <ArrowRightIcon className="w-5 h-5 ml-2" />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#7231ff] font-medium hover:text-indigo-800"
            >
              Sign in
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
    </div>
  );
}

export default Register;
