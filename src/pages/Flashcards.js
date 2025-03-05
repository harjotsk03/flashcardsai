import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowPathIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ArrowUturnLeftIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

function Flashcards() {
  const [flashcards, setFlashcards] = useState([]);
  const [deckName, setDeckName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [loading, setLoading] = useState(true);
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [progress, setProgress] = useState(0);

  // In the Flashcards.jsx component
  useEffect(() => {
    // Fetch flashcards from the API
    const fetchFlashcards = async () => {
      try {
        setLoading(true);

        // Get user ID from context
        const userId = user?._id;

        // Create URL with userId as query parameter
        const url = `http://localhost:3000/api/flashcards/collections/${collectionId}${
          userId ? `?userId=${userId}` : ""
        }`;

        const response = await axios.get(url);

        const collection = response.data;

        setDeckName(collection.collection.name);
        setFlashcards(collection.flashcards || []);
        setLoading(false);
      } catch (error) {
        console.error("Error loading flashcards:", error);
        setLoading(false);
        // If there's an error, redirect to the decks page
        navigate("/decks");
      }
    };

    if (collectionId) {
      fetchFlashcards();
    } else {
      // If no collection ID, redirect to the decks page
      navigate("/decks");
    }
  }, [collectionId, navigate, user]);

  // Update progress whenever currentIndex changes
  useEffect(() => {
    if (flashcards.length > 0) {
      setProgress(((currentIndex + 1) / flashcards.length) * 100);
    }
  }, [currentIndex, flashcards.length]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setDirection(1);
      setIsFlipped(false);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setIsFlipped(false);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRestart = () => {
    setDirection(-1);
    setIsFlipped(false);
    setCurrentIndex(0);
  };

  // Card stack variants
  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    }),
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrevious();
      else if (e.key === " " || e.key === "Enter") handleFlip();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, isFlipped, flashcards.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="mx-auto mb-4"
          >
            <ArrowPathIcon className="w-12 h-12 text-[#7231ff]" />
          </motion.div>
          <h2 className="text-xl text-gray-700">Loading flashcards...</h2>
        </div>
      </div>
    );
  }

  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen bg-white p-8 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-gray-100">
          <div className="w-16 h-16 bg-[#7231ff]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpenIcon className="w-8 h-8 text-[#7231ff]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            No Flashcards Found
          </h2>
          <p className="text-gray-600 text-center mb-8">
            This collection doesn't have any flashcards yet.
          </p>
          <div className="flex justify-center">
            <Link
              to="/upload"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#7231ff] text-white font-medium rounded-full shadow-lg hover:bg-[#6020e0] transition-colors duration-300"
            >
              Create Flashcards
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white min-h-screen flex flex-col pt-20 lg:pt-24 pb-48 px-4">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-[#ffc01d] rounded-bl-full opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-[#7231ff] rounded-tr-full opacity-10 -z-10"></div>

        <div className="flex-grow flex flex-col">
          {/* Header */}
          <div className="w-full lg:max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row lg:justify-between lg:items-center mb-6 sm:mb-10">
              <div className="mb-4  sm:mb-0">
                <motion.button
                  onClick={() => navigate("/decks")}
                  className="inline-flex items-center text-gray-600 hover:text-[#7231ff] transition-colors mb-2"
                  whileHover={{ x: -3 }}
                >
                  <ArrowUturnLeftIcon className="w-4 h-4 mr-1" />
                  <span className="text-sm">Back to Decks</span>
                </motion.button>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                  {deckName}
                </h1>
              </div>

              <div className="flex items-center space-x-2 bg-gray-50 px-4 py-1 lg:py-2 rounded-full shadow-sm">
                <AcademicCapIcon className="w-5 h-5 text-[#7231ff]" />
                <span className="text-sm font-medium text-gray-700">
                  {currentIndex + 1} of {flashcards.length} cards
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-gray-100 rounded-full mb-8 sm:mb-12">
              <motion.div
                className="h-full bg-gradient-to-r from-[#7231ff] to-[#9b6dff] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Flashcard Area */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full flex-grow flex flex-col items-center justify-center pb-12">
            <div className="relative w-full max-w-2xl min-h-[300px] sm:aspect-[3/2]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 w-full h-full"
                >
                  <motion.div
                    className="w-full h-full rounded-2xl shadow-xl bg-white overflow-hidden cursor-pointer border border-gray-100"
                    onClick={handleFlip}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="relative w-full h-full"
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                      animate={{
                        rotateY: isFlipped ? 180 : 0,
                      }}
                      transition={{
                        duration: 0.6,
                        type: "spring",
                        stiffness: 300,
                        damping: 40,
                      }}
                    >
                      {/* Front side - Question */}
                      <motion.div
                        className="absolute inset-0 w-full h-full flex flex-col p-6 sm:p-8 md:p-10"
                        style={{
                          backfaceVisibility: "hidden",
                        }}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Question
                          </span>
                          <div className="w-8 h-8 bg-[#7231ff]/10 rounded-full flex items-center justify-center">
                            <LightBulbIcon className="w-4 h-4 text-[#7231ff]" />
                          </div>
                        </div>
                        <div className="flex-grow flex items-center justify-center">
                          <div className="text-lg sm:text-xl md:text-2xl font-medium text-gray-800 text-center">
                            {flashcards[currentIndex].question}
                          </div>
                        </div>
                        <div className="text-center mt-4">
                          <span className="text-xs text-gray-500">
                            Tap card to see answer
                          </span>
                        </div>
                      </motion.div>

                      {/* Back side - Answer */}
                      <motion.div
                        className="absolute inset-0 w-full h-full flex flex-col p-6 sm:p-8 md:p-10 bg-white"
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                        }}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xs font-medium text-[#7231ff] uppercase tracking-wider">
                            Answer
                          </span>
                          <div className="w-8 h-8 bg-[#7231ff]/10 rounded-full flex items-center justify-center">
                            <BookOpenIcon className="w-4 h-4 text-[#7231ff]" />
                          </div>
                        </div>
                        <div className="flex-grow flex items-center justify-center overflow-y-auto max-h-full">
                          <div className="text-lg sm:text-xl md:text-2xl font-medium text-[#7231ff] text-center">
                            {flashcards[currentIndex].answer}
                          </div>
                        </div>
                        <div className="text-center mt-4">
                          <span className="text-xs text-gray-500">
                            Tap card to see question
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="mt-8 sm:mt-12 flex items-center justify-center gap-4 sm:gap-8">
              <motion.button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="p-3 sm:p-4 rounded-full bg-white shadow-lg disabled:opacity-40 disabled:cursor-not-allowed border border-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <ChevronLeftIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#7231ff]" />
              </motion.button>

              <motion.button
                onClick={handleRestart}
                className="p-3 sm:p-4 rounded-full bg-white shadow-lg border border-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <ArrowPathIcon className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600" />
              </motion.button>

              <motion.button
                onClick={handleNext}
                disabled={currentIndex === flashcards.length - 1}
                className="p-3 sm:p-4 rounded-full bg-white shadow-lg disabled:opacity-40 disabled:cursor-not-allowed border border-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <ChevronRightIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#7231ff]" />
              </motion.button>
            </div>

            <div className="text-center mt-6 sm:mt-8 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-full shadow-sm">
              <span className="hidden sm:inline">Tip: </span>Use arrow keys to
              navigate and space to flip
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Flashcards;