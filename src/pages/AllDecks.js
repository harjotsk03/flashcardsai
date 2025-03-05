import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  LockClosedIcon,
  DocumentDuplicateIcon,
  PlusCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

function AllDecks() {
  const [privateDecks, setPrivateDecks] = useState([]);
  const [publicDecks, setPublicDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("private"); // 'private' or 'public'
  const { user } = useAuth();

  useEffect(() => {
    // Load decks from API
    const loadDecks = async () => {
      try {
        setLoading(true);

        // Get token from localStorage
        const token = localStorage.getItem("token");

        if (token) {
          // Fetch private collections (user's collections)
          const privateResponse = await axios.get(
            "http://localhost:3000/api/flashcards/collections",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setPrivateDecks(privateResponse.data);
        }

        // Fetch public collections
        const publicResponse = await axios.get(
          "http://localhost:3000/api/flashcards/collections/public"
        );
        setPublicDecks(publicResponse.data);
      } catch (error) {
        console.error("Error loading decks:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDecks();
  }, []);

  // Format date to a readable string
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get the current decks based on active tab
  const currentDecks = activeTab === "private" ? privateDecks : publicDecks;

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 px-4">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-[#ffc01d] rounded-bl-full opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-[#7231ff] rounded-tr-full opacity-10 -z-10"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Flashcard Collections
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Browse and study your personal flashcard collections or explore
              public decks created by other users.
            </p>
          </motion.div>

          {/* Tab navigation */}
          <motion.div
            className="flex mb-8 bg-white rounded-full shadow-md p-1.5 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              className={`flex-1 py-2.5 text-xs lg:text-base px-4 rounded-full ${
                activeTab === "private"
                  ? "bg-[#7231ff] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              } transition-colors flex items-center justify-center`}
              onClick={() => setActiveTab("private")}
            >
              <LockClosedIcon className="w-4 h-4 mr-2" />
              Private
            </button>
            <button
              className={`flex-1 py-2.5 text-xs lg:text-base px-4 rounded-full ${
                activeTab === "public"
                  ? "bg-[#7231ff] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              } transition-colors flex items-center justify-center`}
              onClick={() => setActiveTab("public")}
            >
              <GlobeAltIcon className="w-4 h-4 mr-2" />
              Public
            </button>
          </motion.div>

          {loading ? (
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-3xl mx-auto border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-16 h-16 bg-[#7231ff]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowPathIcon className="w-8 h-8 text-[#7231ff] animate-spin" />
              </div>
              <p className="text-xl text-gray-600">Loading collections...</p>
            </motion.div>
          ) : currentDecks.length === 0 ? (
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-3xl mx-auto border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-16 h-16 bg-[#7231ff]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <DocumentDuplicateIcon className="w-8 h-8 text-[#7231ff]" />
              </div>
              <p className="text-xl text-gray-600 mb-2">
                {activeTab === "private"
                  ? "You don't have any flashcard collections yet"
                  : "No public flashcard collections available"}
              </p>
              {activeTab === "private" && (
                <>
                  <p className="text-sm text-gray-500 mt-2 mb-6">
                    Create some flashcards to get started
                  </p>
                  <Link to="/upload">
                    <motion.button
                      className="px-6 py-3 bg-[#7231ff] text-white rounded-full font-medium hover:bg-[#6020e0] transition-all shadow-md"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <PlusCircleIcon className="w-5 h-5 inline-block mr-2" />
                      Create Flashcards
                    </motion.button>
                  </Link>
                </>
              )}
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentDecks.map((deck, index) => (
                <motion.div
                  key={deck._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index % 3) }}
                >
                  <Link to={`/collections/${deck._id}`}>
                    <motion.div
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-gray-100"
                      whileHover={{ y: -5 }}
                      whileTap={{ y: 0 }}
                    >
                      <div
                        className={`h-3 ${
                          activeTab === "private"
                            ? "bg-[#7231ff]"
                            : "bg-[#ffc01d]"
                        }`}
                      ></div>
                      <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-3 truncate">
                          {deck.name}
                        </h2>

                        <div className="flex items-center text-gray-500 text-sm mb-2">
                          <div className="w-6 h-6 bg-[#7231ff]/10 rounded-full flex items-center justify-center mr-2">
                            <DocumentTextIcon className="w-3 h-3 text-[#7231ff]" />
                          </div>
                          <span>
                            {deck.cardCount || 0}{" "}
                            {(deck.cardCount || 0) === 1 ? "card" : "cards"}
                          </span>
                        </div>

                        <div className="flex items-center text-gray-500 text-sm mb-2">
                          <div className="w-6 h-6 bg-[#ffc01d]/10 rounded-full flex items-center justify-center mr-2">
                            <CalendarIcon className="w-3 h-3 text-[#ffc01d]" />
                          </div>
                          <span>Created {formatDate(deck.createdAt)}</span>
                        </div>

                        {activeTab === "public" && deck.user && (
                          <div className="flex items-center text-gray-500 text-sm mt-3 pt-3 border-t border-gray-100">
                            <span className="flex items-center">
                              {deck.user.profilePhoto ? (
                                <img
                                  src={deck.user.profilePhoto}
                                  alt={deck.user.name || deck.user.username}
                                  className="w-6 h-6 rounded-full mr-2 border border-gray-200"
                                />
                              ) : (
                                <div className="w-6 h-6 bg-[#7231ff]/10 rounded-full flex items-center justify-center mr-2">
                                  <span className="text-xs font-bold text-[#7231ff]">
                                    {(deck.user.name || deck.user.username)
                                      .charAt(0)
                                      .toUpperCase()}
                                  </span>
                                </div>
                              )}
                              By {deck.user.name || deck.user.username}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Add some spacing before footer */}
      <div className="py-16"></div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AllDecks;
