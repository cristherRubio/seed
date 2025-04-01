// src/pages/RegisterPage.tsx
import { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterPage = () => {
  const [personaType, setPersonaType] = useState<'fisica' | 'moral'>('fisica');
  const [formData, setFormData] = useState<any>({});
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password: string) => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      return;
    }
    if (!validatePassword(formData.password)) {
      setMessage("La contraseña no cumple con los requisitos de seguridad");
      return;
    }
    if (formData.email !== formData.confirmEmail) {
      setMessage("Los correos electrónicos no coinciden");
      return;
    }

    try {
      await axios.post('http://localhost:8000/auth/register', { ...formData, personaType });
      setMessage('✅ Registro exitoso');
    } catch (err: any) {
      console.error(err);
      setMessage('❌ Error al registrar');
    }
  };

  return (
    <Layout>
      <main className="d-flex justify-content-center align-items-center min-vh-100 bg-light py-4">
        <div className="container p-4 bg-white rounded shadow" style={{ maxWidth: '800px' }}>
          <h2 className="mb-4">Registro</h2>

          <div className="mb-3">
            <label className="form-label">Tipo de persona</label>
            <select name="personaType" value={personaType} onChange={e => setPersonaType(e.target.value as 'fisica' | 'moral')} className="form-select">
              <option value="fisica">Persona Física</option>
              <option value="moral">Persona Moral</option>
            </select>
          </div>

          <form onSubmit={handleSubmit} className="row g-3">
            {personaType === 'fisica' ? (
              <>
                <div className="col-md-6"><input name="nombres" className="form-control" placeholder="Nombre(s)" onChange={handleInputChange} required /></div>
                <div className="col-md-6"><input name="apellidoPaterno" className="form-control" placeholder="Primer apellido" onChange={handleInputChange} required /></div>
                <div className="col-md-6"><input name="apellidoMaterno" className="form-control" placeholder="Segundo apellido" onChange={handleInputChange} /></div>
                <div className="col-md-6"><input type="date" name="fechaNacimiento" className="form-control" onChange={handleInputChange} required /></div>
                <div className="col-12">
                  <label className="form-label">Nacionalidad</label>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="nacionalidad" value="Mexicana" onChange={handleInputChange} required />
                    <label className="form-check-label">Mexicana</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="nacionalidad" value="Extranjera" onChange={handleInputChange} />
                    <label className="form-check-label">Extranjera</label>
                  </div>
                </div>
                <div className="col-md-6"><input name="rfc" className="form-control" placeholder="RFC" onChange={handleInputChange} required /></div>
                <div className="col-md-6"><input name="telefono" className="form-control" placeholder="Teléfono" onChange={handleInputChange} required /></div>
                <div className="col-md-6"><input name="email" className="form-control" placeholder="Correo electrónico" onChange={handleInputChange} required /></div>
                <div className="col-md-6"><input name="confirmEmail" className="form-control" placeholder="Confirmación de correo" onChange={handleInputChange} required /></div>
              </>
            ) : (
              <>
                <div className="col-12"><input name="razonSocial" className="form-control" placeholder="Razón social" onChange={handleInputChange} required /></div>
                <div className="col-md-6"><input type="date" name="fechaConstitucion" className="form-control" onChange={handleInputChange} required /></div>
                <div className="col-md-6">
                  <select name="actividadEconomica" className="form-select" onChange={handleInputChange} required>
                    <option value="">Selecciona actividad económica</option>
                    <option value="Servicios">Servicios</option>
                    <option value="Comercio">Comercio</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>
                <div className="col-md-6"><input name="rfc" className="form-control" placeholder="RFC" onChange={handleInputChange} required /></div>
                <div className="col-md-6"><input name="telefonoOficina" className="form-control" placeholder="Teléfono de oficina" onChange={handleInputChange} required /></div>
                <div className="col-md-4"><input name="nombreRepresentante" className="form-control" placeholder="Nombre del representante legal" onChange={handleInputChange} required /></div>
                <div className="col-md-4"><input name="apellidoPaternoRep" className="form-control" placeholder="Apellido paterno del representante" onChange={handleInputChange} required /></div>
                <div className="col-md-4"><input name="apellidoMaternoRep" className="form-control" placeholder="Apellido materno del representante" onChange={handleInputChange} /></div>
                <div className="col-md-6"><input name="email" className="form-control" placeholder="Correo electrónico" onChange={handleInputChange} required /></div>
                <div className="col-md-6"><input name="confirmEmail" className="form-control" placeholder="Confirmación de correo" onChange={handleInputChange} required /></div>
              </>
            )}

            <div className="col-md-6"><input type="password" name="password" className="form-control" placeholder="Contraseña segura" onChange={handleInputChange} required /></div>
            <div className="col-md-6"><input type="password" name="confirmPassword" className="form-control" placeholder="Confirmar contraseña" onChange={handleInputChange} required /></div>

            <div className="col-12 text-center">
              <button type="submit" className="btn btn-success px-5 py-2">Registrar</button>
            </div>
          </form>

          {message && <p className="mt-3 text-center">{message}</p>}
        </div>
      </main>
    </Layout>
  );
};

export default RegisterPage;
