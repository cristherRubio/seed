import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import './LandingPage.css';

const DashboardPage = () => {
  return (
    <Layout>
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
            <h1 className="display-5 text-muted">🚧 Bienvenido a tú panel</h1>
            <p className="fs-5">Estás autenticado con éxito.</p>
        </div>
        </div>
    </Layout>
  );
};

export default DashboardPage;
