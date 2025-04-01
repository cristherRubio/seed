import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<div>Landing Page (coming soon)</div>} />
      </Routes>
    </Router>
  );
}

export default App
