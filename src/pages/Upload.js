import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Upload() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('pdf', acceptedFiles[0]);

    try {
      const response = await axios.post('http://localhost:3000/analyze-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      localStorage.setItem('flashcards', JSON.stringify(response.data.flashcards));
      navigate('/flashcards');
    } catch (err) {
      setError('Failed to generate flashcards. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Upload Your PDF
        </h2>
        
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
        >
          <input {...getInputProps()} />
          <div className="text-gray-600">
            {isDragActive ? (
              <p>Drop the PDF here...</p>
            ) : (
              <p>Drag and drop a PDF here, or click to select a file</p>
            )}
          </div>
        </div>

        {loading && (
          <div className="text-center mt-4">
            <p>Generating your flashcards...</p>
          </div>
        )}

        {error && (
          <div className="text-center mt-4 text-red-500">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;