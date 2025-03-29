import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import MosaicStart from './pages/MosaicStart';
import CropImage from './pages/CropImage';
import MosaicGenerator from './pages/MosaicGenerator';
import PreviewPanel from './pages/PreviewPanel';
import ThreeDHome from './pages/ThreeDHome';
import { ImageProvider } from './context/ImageContext';

function App() {
  return (
    <Router>
      <ImageProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mosaic" element={<MosaicStart />} />
              <Route path="/crop" element={<CropImage />} />
              <Route path="/mosaic-generator" element={<MosaicGenerator />} />
              <Route path="/preview" element={<PreviewPanel />} />
              <Route path="/3d" element={<ThreeDHome />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </ImageProvider>
    </Router>
  );
}

export default App; 