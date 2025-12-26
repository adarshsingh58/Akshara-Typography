
import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Library from './pages/Library';
import FontDetails from './pages/FontDetails';
import Pairings from './pages/Pairings';
import DevTools from './pages/DevTools';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/font/:id" element={<FontDetails />} />
            <Route path="/pairings" element={<Pairings />} />
            <Route path="/dev" element={<DevTools />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
