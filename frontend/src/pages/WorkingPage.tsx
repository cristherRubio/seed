import Layout from '../components/Layout';
import './LandingPage.css';

const WorkingPage = () => {
  return (
    <Layout>
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
            <h1 className="display-5 text-muted">🚧 Estamos trabajando para ti</h1>
            <p className="fs-5">Módulo en desarrollo.</p>
        </div>
        </div>
    </Layout>
  );
};

export default WorkingPage;
