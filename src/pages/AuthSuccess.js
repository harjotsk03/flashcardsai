import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AuthSuccess() {
  const [message, setMessage] = useState("Processing authentication...");
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchUserProfile } = useAuth();

  useEffect(() => {
    const processAuth = async () => {
      try {
        // Extract token from URL
        const params = new URLSearchParams(location.search);
        const token = params.get("token");

        if (!token) {
          setMessage("Authentication failed. No token received.");
          setTimeout(() => navigate("/login"), 2000);
          return;
        }

        // Store token in localStorage
        localStorage.setItem("token", token);

        // Fetch user profile with the token
        await fetchUserProfile(token);

        // Redirect to decks page
        setMessage("Authentication successful! Redirecting...");
        setTimeout(() => navigate("/decks"), 1000);
      } catch (error) {
        console.error("Authentication error:", error);
        setMessage("Authentication failed. Please try again.");
        setTimeout(() => navigate("/login"), 2000);
      }
    };

    processAuth();
  }, [location, navigate, fetchUserProfile]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{message}</h2>
        <p className="text-gray-600">
          Please wait while we complete the process.
        </p>
      </div>
    </div>
  );
}

export default AuthSuccess;
