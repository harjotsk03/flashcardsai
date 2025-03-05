import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
  DocumentArrowUpIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Footer from "../components/Footer";

function Upload() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showDeckNameDialog, setShowDeckNameDialog] = useState(false);
  const [deckName, setDeckName] = useState("");
  const [token, setToken] = useState(null);
  const [success, setSuccess] = useState(null);
  const [collections, setCollections] = useState([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState("");
  const [isNewCollection, setIsNewCollection] = useState(true);
  const [isPublic, setIsPublic] = useState(false);

  // Get the authentication token from localStorage
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    setToken(userToken);

    // Fetch user's existing collections if authenticated
    if (userToken) {
      fetchUserCollections(userToken);
    }
  }, []);

  // Fetch user's collections for the dropdown
  const fetchUserCollections = async (userToken) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/flashcards/collections`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setCollections(response.data);
    } catch (err) {
      console.error("Error fetching collections:", err);
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);

    // Simulate progress for better UX
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  }, []);

  const processFile = async () => {
    if (!file) return;

    // Show the collection selection dialog
    setShowDeckNameDialog(true);

    // Default deck name based on file name (without extension)
    const defaultName = file.name.replace(/\.[^/.]+$/, "");
    setDeckName(defaultName);
  };

  const handleGenerateFlashcards = async () => {
    if (!file) return;
    if (isNewCollection && !deckName.trim()) {
      setError("Please provide a name for your new collection");
      return;
    }
    if (!isNewCollection && !selectedCollectionId) {
      setError("Please select an existing collection");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("pdf", file);

    // Add either collectionId or collectionName based on user selection
    if (isNewCollection) {
      formData.append("collectionName", deckName.trim());
      formData.append("isPublic", isPublic);
    } else {
      formData.append("collectionId", selectedCollectionId);
    }

    try {
      // Use the updated API endpoint
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/flashcards/generate`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show success message
      setSuccess("Flashcards successfully generated!");

      // Close dialog
      setShowDeckNameDialog(false);

      // Navigate to the collection page after a short delay
      setTimeout(() => {
        navigate(`/collections/${response.data.collection._id}`);
      }, 1500);
    } catch (err) {
      console.error("Error details:", err.response?.data || err.message);

      if (err.response?.status === 401) {
        setError("You need to be logged in to generate flashcards.");
      } else if (err.response?.status === 403) {
        setError(
          "You don't have permission to add flashcards to this collection."
        );
      } else if (err.response?.status === 404) {
        setError("The selected collection was not found.");
      } else {
        setError(
          err.response?.data?.error ||
            "Failed to generate flashcards. Please try again."
        );
      }

      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
    setError(null);
    setSuccess(null);
  };

  // Check if user is authenticated
  useEffect(() => {
    if (!token) {
      // Optionally show a message or redirect to login
      // setError("Please log in to create flashcards");
      // navigate('/login');
    }
  }, [token, navigate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 px-4">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-[#ffc01d] rounded-bl-full opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-[#7231ff] rounded-tr-full opacity-10 -z-10"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Upload Your Study Material
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Transform your PDFs into AI-generated flashcards in seconds. Our
              system will analyze your document and create effective study
              materials.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-3xl mx-auto border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {!token ? (
              <div className="text-center p-6">
                <p className="text-gray-700 mb-4">
                  Please log in to create flashcards
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-3 bg-[#7231ff] text-white rounded-full hover:bg-[#6020e0] transition-all"
                >
                  Log In
                </button>
              </div>
            ) : !file ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300
                  ${
                    isDragActive
                      ? "border-[#7231ff] bg-[#7231ff]/5"
                      : "border-gray-300 hover:border-[#7231ff]/50 hover:bg-gray-50"
                  }`}
              >
                <input {...getInputProps()} />
                <motion.div
                  className="flex flex-col items-center space-y-4"
                  initial={{ scale: 1 }}
                  animate={{ scale: isDragActive ? 1.05 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 bg-[#7231ff]/10 rounded-full flex items-center justify-center">
                    <DocumentArrowUpIcon className="w-8 h-8 text-[#7231ff]" />
                  </div>
                  <div className="text-gray-700">
                    {isDragActive ? (
                      <p className="font-medium text-[#7231ff]">
                        Drop your PDF here...
                      </p>
                    ) : (
                      <>
                        <p className="font-medium mb-2">
                          Drag and drop your PDF here
                        </p>
                        <p className="text-sm text-gray-500">
                          or click to browse your files
                        </p>
                      </>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-4 bg-gray-50 p-3 rounded-lg">
                    <p>Supported file: PDF (max 10MB)</p>
                  </div>
                </motion.div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* File Preview */}
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-[#ffc01d]/10 rounded-full flex items-center justify-center mr-4">
                    <DocumentTextIcon className="w-6 h-6 text-[#ffc01d]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={removeFile}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                  >
                    <XCircleIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-[#7231ff] h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>

                {/* Action Button */}
                <div className="flex justify-center">
                  <button
                    onClick={processFile}
                    disabled={loading}
                    className={`flex items-center justify-center px-6 py-3 rounded-full font-medium text-white shadow-lg transition-all duration-300 ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#7231ff] hover:bg-[#6020e0] transform hover:scale-105"
                    }`}
                  >
                    {loading ? (
                      <>
                        <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>Generate Flashcards</>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <motion.div
                className="mt-6 p-4 bg-green-50 rounded-lg flex items-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                <p className="text-green-700">{success}</p>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                className="mt-6 p-4 bg-red-50 rounded-lg flex items-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <XCircleIcon className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                <p className="text-red-700">{error}</p>
              </motion.div>
            )}
          </motion.div>

          {/* Instructions */}
          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-[#7231ff]">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#7231ff]/10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-[#7231ff] font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-900">Upload PDF</h3>
              </div>
              <p className="text-sm text-gray-600">
                Drag and drop your study material or lecture notes in PDF
                format.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-[#ffc01d]">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#ffc01d]/10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-[#ffc01d] font-bold">2</span>
                </div>
                <h3 className="font-semibold text-gray-900">AI Processing</h3>
              </div>
              <p className="text-sm text-gray-600">
                Our AI analyzes your document and extracts key concepts and
                information.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-[#7231ff]">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#7231ff]/10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-[#7231ff] font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-900">Study</h3>
              </div>
              <p className="text-sm text-gray-600">
                Review your automatically generated flashcards and start
                studying efficiently.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="px-4 pb-10 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-gray-100">
            <div className="flex items-start mb-4">
              <InformationCircleIcon className="w-6 h-6 text-[#7231ff] mr-3" />
              <h3 className="font-semibold text-gray-900">
                Tips for Best Results
              </h3>
            </div>
            <ul className="text-sm text-gray-700 space-y-2 ml-9">
              <li>• Use clear, well-formatted PDFs for better analysis</li>
              <li>
                • Documents with headings and structured content work best
              </li>
              <li>
                • For textbooks, upload one chapter at a time for focused
                flashcards
              </li>
              <li>
                • Lecture slides and notes typically produce excellent results
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Collection Selection Dialog */}
      {showDeckNameDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-xl shadow-xl p-6 sm:p-8 max-w-md w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Create Flashcards
            </h3>
            <p className="text-gray-600 mb-6">
              Choose where to save your generated flashcards.
            </p>

            {/* Collection Type Selection */}
            <div className="mb-6">
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => setIsNewCollection(true)}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                    isNewCollection
                      ? "bg-[#7231ff] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  New Collection
                </button>
                <button
                  onClick={() => setIsNewCollection(false)}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                    !isNewCollection
                      ? "bg-[#7231ff] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Existing Collection
                </button>
              </div>

              {isNewCollection ? (
                <div>
                  <label
                    htmlFor="deckName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    New Collection Name
                  </label>
                  <input
                    type="text"
                    id="deckName"
                    value={deckName}
                    onChange={(e) => setDeckName(e.target.value)}
                    placeholder="Enter a name for your collection"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7231ff] focus:border-[#7231ff] outline-none transition-colors"
                    autoFocus
                  />

                  {/* Add visibility toggle here */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Collection Visibility
                    </label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio text-[#7231ff]"
                          name="visibility"
                          checked={!isPublic}
                          onChange={() => setIsPublic(false)}
                        />
                        <span className="ml-2 text-gray-700">Private</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio text-[#7231ff]"
                          name="visibility"
                          checked={isPublic}
                          onChange={() => setIsPublic(true)}
                        />
                        <span className="ml-2 text-gray-700">Public</span>
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {isPublic
                        ? "Public collections can be viewed by anyone"
                        : "Private collections are only visible to you"}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="collectionSelect"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Select Existing Collection
                  </label>
                  {collections.length > 0 ? (
                    <select
                      id="collectionSelect"
                      value={selectedCollectionId}
                      onChange={(e) => setSelectedCollectionId(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7231ff] focus:border-[#7231ff] outline-none transition-colors"
                    >
                      <option value="">Select a collection</option>
                      {collections.map((collection) => (
                        <option key={collection._id} value={collection._id}>
                          {collection.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-gray-500 italic">
                      No existing collections found. Please create a new one.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Error message in dialog */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeckNameDialog(false);
                  setError(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateFlashcards}
                disabled={loading}
                className={`px-4 py-2 ${
                  loading ? "bg-gray-400" : "bg-[#7231ff] hover:bg-[#6020e0]"
                } text-white rounded-lg transition-colors flex items-center`}
              >
                {loading ? (
                  <>
                    <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Flashcards"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
}

export default Upload;
