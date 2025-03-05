import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Flashcards from './pages/Flashcards';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/flashcards" element={<Flashcards />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
