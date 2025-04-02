import { Link } from 'react-router-dom';
import PublicLayout from '../components/PublicLayout';
import './LandingPage.css';

const WorkingPage = () => {
  return (
    <PublicLayout>
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
            <h1 className="display-5 text-muted">🚧 Estamos trabajando para ti</h1>
            <p className="fs-5">Módulo en desarrollo.</p>
        </div>
        </div>
    </PublicLayout>
  );
};

export default WorkingPage;
