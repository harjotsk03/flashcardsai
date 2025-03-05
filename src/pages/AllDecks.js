import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

function AllDecks() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    // Load all decks from localStorage
    const loadDecks = () => {
      const allDecks = [];

      // Iterate through localStorage to find all items with deck data
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("flashcards")) {
          try {
            const deckData = JSON.parse(localStorage.getItem(key));
            if (deckData && deckData.deckName) {
              allDecks.push({
                id: key,
                name: deckData.deckName,
                createdAt: deckData.createdAt,
                cardCount: deckData.flashcards ? deckData.flashcards.length : 0,
              });
            }
          } catch (error) {
            console.error("Error parsing deck data:", error);
          }
        }
      }

      // Sort decks by creation date (newest first)
      allDecks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setDecks(allDecks);
    };

    loadDecks();
  }, []);

  // Format date to a readable string
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 pt-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-900 mb-2">
          Your Flashcard Decks
        </h1>
        <p className="text-indigo-700 mb-8">Select a deck to start studying</p>

        {decks.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <p className="text-xl text-gray-600">
              No flashcard decks available
            </p>
            <p className="text-sm text-gray-500 mt-2 mb-6">
              Create some flashcards to get started
            </p>
            <Link to="/upload">
              <motion.button
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Flashcards
              </motion.button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks.map((deck) => (
              <Link to={`/flashcards/${deck.id}`} key={deck.id}>
                <motion.div
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  whileHover={{ y: -5 }}
                  whileTap={{ y: 0 }}
                >
                  <div className="h-3 bg-indigo-600"></div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">
                      {deck.name}
                    </h2>

                    <div className="flex items-center text-gray-500 text-sm mb-1">
                      <DocumentTextIcon className="w-4 h-4 mr-2" />
                      <span>
                        {deck.cardCount}{" "}
                        {deck.cardCount === 1 ? "card" : "cards"}
                      </span>
                    </div>

                    <div className="flex items-center text-gray-500 text-sm">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      <span>Created {formatDate(deck.createdAt)}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllDecks;
