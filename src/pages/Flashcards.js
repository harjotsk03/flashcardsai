import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

function Flashcards() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const stored = localStorage.getItem('flashcards');
    if (stored) {
      setFlashcards(JSON.parse(stored));
    }
  }, []);

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
        damping: 30
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5
      }
    })
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrevious();
      else if (e.key === ' ' || e.key === 'Enter') handleFlip();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isFlipped, flashcards.length]);

  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-8 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <p className="text-xl text-gray-600 text-center">No flashcards available</p>
          <p className="text-sm text-gray-500 text-center mt-2">Create some flashcards to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-2 sm:p-4 md:p-8 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col items-center justify-center pb-16">
        <div className="relative w-full max-w-xl aspect-[3/2]">
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
              <div 
                className="w-full h-full rounded-2xl shadow-2xl bg-white overflow-hidden cursor-pointer perspective-1000"
                onClick={handleFlip}
              >
                <motion.div
                  className="relative w-full h-full"
                  style={{ 
                    transformStyle: "preserve-3d",
                    transition: "transform 0.6s"
                  }}
                  animate={{ 
                    rotateY: isFlipped ? 180 : 0 
                  }}
                  transition={{ 
                    duration: 0.1, 
                    type: "tween", 
                    stiffness: 300, 
                    damping: 40 
                  }}
                >
                  {/* Front side - Question */}
                  <motion.div
                    className="absolute inset-0 w-full h-full flex items-center justify-center p-3 sm:p-5 md:p-8"
                    style={{ 
                      backfaceVisibility: "hidden"
                    }}
                  >
                    <div className="text-base sm:text-xl md:text-2xl font-medium text-gray-800 text-center">
                      {flashcards[currentIndex].question}
                    </div>
                  </motion.div>
                  
                  {/* Back side - Answer */}
                  <motion.div
                    className="absolute inset-0 w-full h-full flex items-center justify-center p-3 sm:p-5 md:p-8 bg-white overflow-auto"
                    style={{ 
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)"
                    }}
                  >
                    <div className="text-base sm:text-xl md:text-2xl font-medium text-indigo-700 text-center">
                      {flashcards[currentIndex].answer}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 mt-4 w-full">
          <motion.button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="p-2 sm:p-3 rounded-full bg-white shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
          </motion.button>
          
          <div className="text-center px-3 py-1 sm:px-4 sm:py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
            <span className="text-sm sm:text-base text-indigo-800 font-medium">
              {currentIndex + 1} / {flashcards.length}
            </span>
          </div>
          
          <motion.button
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            className="p-2 sm:p-3 rounded-full bg-white shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
          </motion.button>
        </div>
        
        <div className="text-center mt-3 sm:mt-6 text-xs sm:text-sm text-indigo-800/70">
          Tip: Use arrow keys to navigate and space to flip
        </div>
      </div>
    </div>
  );
}

export default Flashcards;