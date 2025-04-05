import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import WorkingPage from './pages/WorkingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<div>Landing Page (coming soon)</div>} />
        <Route path="/en-desarrollo" element={<WorkingPage />} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /> </PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App
