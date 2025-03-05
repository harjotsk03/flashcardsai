import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Flashcards from "./pages/Flashcards";
import AllDecks from "./pages/AllDecks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthSuccess from "./pages/AuthSuccess";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/auth/success" element={<AuthSuccess />} />

              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/upload" element={<Upload />} />
                <Route path="/decks" element={<AllDecks />} />
                <Route path="/flashcards" element={<Flashcards />} />
                <Route
                  path="/collections/:collectionId"
                  element={<Flashcards />}
                />
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
