import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        "http://localhost:3000/api/auth/profile",
        config
      );
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      localStorage.removeItem("token");
      setLoading(false);
    }
  };

  const login = async (emailOrUsername, password) => {
    try {
      setError(null);
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email: emailOrUsername,
          password,
        }
      );

      const { token } = response.data;
      localStorage.setItem("token", token);

      await fetchUserProfile(token);
      return true;
    } catch (error) {
      setError(
        error.response?.data?.error || "Login failed. Please try again."
      );
      return false;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        userData
      );

      const { token } = response.data;
      localStorage.setItem("token", token);

      setUser(response.data);
      return true;
    } catch (error) {
      setError(
        error.response?.data?.error || "Registration failed. Please try again."
      );
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
