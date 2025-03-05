import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  BookOpenIcon,
  AcademicCapIcon,
  LightBulbIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-40 pt-32 sm:pt-52">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-[#ffc01d] rounded-bl-full opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-[#7231ff] rounded-tr-full opacity-10 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Left Card - Hidden on mobile */}
            <motion.div
              className="hidden lg:block w-full lg:w-1/4 mb-10 lg:mb-0 order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative h-64 sm:h-72 max-w-sm mx-auto lg:mx-0">
                <div className="absolute top-0 left-0 w-56 sm:w-64 bg-[#7231ff] rounded-2xl shadow-2xl p-4 sm:p-6 transform -rotate-6">
                  <div className="bg-white rounded-xl p-4 sm:p-5">
                    <div className="bg-gray-100 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                      <h3 className="font-bold text-gray-800 text-sm sm:text-base">
                        Biology 101
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        What is photosynthesis?
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-gray-500">
                        Tap to flip
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-[#7231ff]">
                        1/24
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hero Text - Center */}
            <div className="w-full lg:w-2/4 mb-10 lg:mb-0 text-center order-1 lg:order-2">
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 w-full px-4 sm:px-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                AI-Powered Flashcards from Your PDFs
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Upload your notes, lecture slides, or any PDF document and let
                our AI generate perfect flashcards for effective studying.
              </motion.p>

              {/* Mobile-only animated icon */}
              <motion.div
                className="flex justify-center mb-6 lg:hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1,
                }}
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-[#7231ff]/10 rounded-full flex items-center justify-center">
                    <DevicePhoneMobileIcon className="w-10 h-10 text-[#7231ff]" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#ffc01d] rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">AI</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link
                  to="/upload"
                  className="inline-flex items-center justify-center px-4 py-2.5 sm:px-8 sm:py-4 text-sm sm:text-lg bg-[#7231ff] text-white font-medium rounded-full shadow-xl hover:bg-[#6020e0] transition-colors duration-300 transform hover:scale-105"
                >
                  Transform Your PDFs Now
                  <ArrowRightIcon className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </motion.div>
            </div>

            {/* Right Card - Hidden on mobile */}
            <motion.div
              className="hidden lg:block w-full lg:w-1/4 order-3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative h-64 sm:h-72 max-w-sm mx-auto lg:mx-0 lg:ml-auto">
                <div className="absolute top-0 right-0 w-56 sm:w-64 bg-[#ffc01d] rounded-2xl shadow-2xl p-4 sm:p-6 transform rotate-6">
                  <div className="bg-white rounded-xl p-4 sm:p-5">
                    <div className="bg-gray-100 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                      <h3 className="font-bold text-gray-800 text-sm sm:text-base">
                        Chemistry
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        What is the periodic table?
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-gray-500">
                        Tap to flip
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-[#ffc01d]">
                        1/32
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-10 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Transform Your Study Materials into Flashcards
            </h2>
            <p className="mt-3 sm:mt-4 text-lg sm:text-xl text-gray-600">
              AI-powered conversion from PDFs to study-ready flashcards
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#7231ff]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-[#7231ff]/10 rounded-full flex items-center justify-center mb-4">
                <LightBulbIcon className="w-6 h-6 text-[#7231ff]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                AI-Powered Generation
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Our AI analyzes your PDFs and creates high-quality flashcards
                with key concepts and questions.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#ffc01d]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-12 h-12 bg-[#ffc01d]/10 rounded-full flex items-center justify-center mb-4">
                <BookOpenIcon className="w-6 h-6 text-[#ffc01d]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                Multiple Document Types
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Upload lecture slides, notes, textbook chapters, or any PDF
                document to instantly create study materials.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#7231ff]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-12 h-12 bg-[#7231ff]/10 rounded-full flex items-center justify-center mb-4">
                <AcademicCapIcon className="w-6 h-6 text-[#7231ff]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                Time-Saving Study Tool
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Save hours of manual flashcard creation and focus on what
                matters most - learning the material.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-[#7231ff]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Transform Your PDFs into Flashcards Now
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl text-white/80 mb-8 sm:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Upload your study materials and let our AI do the hard work for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              to="/upload"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-[#ffc01d] text-gray-900 font-medium rounded-full shadow-xl hover:bg-[#e6ad1a] transition-colors duration-300"
            >
              Upload Your PDF
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
