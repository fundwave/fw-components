import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ComponentShowcase from './components/ComponentShowcase';
import "@fw-components/react/styles/index.css";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Navigate to="/button" replace />} />
          <Route path="/:componentId" element={<ComponentShowcase />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
