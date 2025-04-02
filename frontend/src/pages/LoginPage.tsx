import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://<your_ip>:8000/login', form); // or use your env var
      const token = res.data.access_token;
      localStorage.setItem('token', token);
      navigate('/dashboard'); // or any page you want
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al iniciar sesión');
    }
  };

  return (
    <Layout>
        <div className="container py-5">
        <h2 className="mb-4">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label>Correo electrónico</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
            <label>Contraseña</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className="form-control" required />
            </div>
            {error && <div className="text-danger mb-3">{error}</div>}
            <button type="submit" className="btn btn-success">Ingresar</button>
        </form>
        </div>
    </Layout>
  );
};

export default LoginPage;
