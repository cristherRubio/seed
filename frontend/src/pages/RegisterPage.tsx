// src/pages/RegisterPage.tsx
import { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterPage = () => {
  const [personaType, setPersonaType] = useState<'fisica' | 'moral'>('fisica');
  const [formData, setFormData] = useState<any>({});
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'telefono') {
      newValue = value.replace(/\D/g, '').slice(0, 10);
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));

    const newErrors = { ...errors };

    if (name === 'email') {
      if (!validateEmail(newValue)) {
        newErrors.email = 'Correo no válido';
      } else {
        delete newErrors.email;
      }
    
      // Also check if confirmation is filled, and doesn't match
      if (formData.confirmEmail && newValue !== formData.confirmEmail) {
        newErrors.confirmEmail = 'Los correos no coinciden';
      } else {
        delete newErrors.confirmEmail;
      }
    
    } else if (name === 'confirmEmail') {
      if (formData.email && newValue !== formData.email) {
        newErrors.confirmEmail = 'Los correos no coinciden';
      } else {
        delete newErrors.confirmEmail;
      }
    } else if (name === 'telefono' && newValue.length < 10) {
      newErrors[name] = 'El teléfono debe tener 10 dígitos';
    } else if (name === 'password' && !validatePassword(newValue)) {
      newErrors[name] = 'Contraseña insegura';
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);
  };

  const validatePassword = (password: string) => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const cleanPhoneNumber = (input: string) => {
    return input.replace(/\D/g, '');
  };

  const validatePhoneNumber = (phone: string) => {
    const cleaned = cleanPhoneNumber(phone);
    return cleaned.length === 10;
  };

  const cleanFormData = (data: Record<string, any>) => {
    const cleaned: Record<string, string> = {};
    for (const key in data) {
      cleaned[key] = typeof data[key] === 'string' ? data[key].trim() : data[key];
    }
    return cleaned;
  };

  const fieldLabels: Record<string, string> = {
    nombres: "Nombre(s)",
    apellidoPaterno: "Apellido paterno",
    apellidoMaterno: "Apellido materno",
    fechaNacimiento: "Fecha de nacimiento",
    nacionalidad: "Nacionalidad",
    rfc: "RFC",
    email: "Correo electrónico",
    confirmEmail: "Confirmación de correo",
    telefono: "Teléfono",
    password: "Contraseña",
    confirmPassword: "Confirmación de contraseña",
    razonSocial: "Razón social",
    fechaConstitucion: "Fecha de constitución",
    actividadEconomica: "Actividad económica",
    nombreRepresentante: "Nombre del representante legal",
    apellidoPaternoRep: "Apellido paterno del representante legal",
    apellidoMaternoRep: "Apellido materno del representante legal",
  };  

  const isFormValid = () => {
    const requiredFields = personaType === 'fisica'
      ? ['nombres', 'apellidoPaterno', 'fechaNacimiento', 'nacionalidad', 'rfc', 'email', 'confirmEmail', 'telefono', 'password', 'confirmPassword']
      : ['razonSocial', 'fechaConstitucion', 'actividadEconomica', 'rfc', 'nombreRepresentante', 'apellidoPaternoRep', 'email', 'confirmEmail', 'telefono', 'password', 'confirmPassword'];
  
    return requiredFields.every(field => formData[field]?.trim?.() !== '') && Object.keys(errors).length === 0;
  };

  const transformFormData = (form: Record<string, any>, type: 'fisica' | 'moral') => {
    const base = {
      email: form.email,
      password: form.password,
    };
  
    if (type === 'fisica') {
      return {
        ...base,
        user_type: 'persona_fisica',
        name: form.nombres,
        apellidoPaterno: form.apellidoPaterno,
        apellidoMaterno: form.apellidoMaterno,
        fechaNacimiento: form.fechaNacimiento,
        nacionalidad: form.nacionalidad.toLowerCase(),
        telefono: String(form.telefono),
        rfc: form.rfc,
      };
    } else {
      return {
        ...base,
        user_type: 'persona_moral',
        name: form.razonSocial,
        razonSocial: form.razonSocial,
        fechaConstitucion: form.fechaConstitucion,
        actividadEconomica: form.actividadEconomica,
        rfc: form.rfc,
        telefono: String(form.telefono),
        representanteNombre: form.nombreRepresentante,
        representantePaterno: form.apellidoPaternoRep,
        representanteMaterno: form.apellidoMaternoRep,
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanedData = cleanFormData(formData);

    const requiredFields = personaType === 'fisica'
      ? ['nombres', 'apellidoPaterno', 'apellidoMaterno', 'fechaNacimiento', 'nacionalidad', 'rfc', 'email', 'confirmEmail', 'telefono', 'password', 'confirmPassword']
      : ['razonSocial', 'fechaConstitucion', 'actividadEconomica', 'rfc', 'nombreRepresentante', 'apellidoPaternoRep', 'apellidoMaternoRep', 'email', 'confirmEmail', 'telefono', 'password', 'confirmPassword'];


    for (const field of requiredFields) {
      if (!cleanedData[field]) {
        setMessage(`Falta completar el campo: ${fieldLabels[field] || field}`);
        return;
      }
    }

    if (cleanedData.password !== cleanedData.confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      return;
    }
    if (!validatePassword(cleanedData.password)) {
      setMessage("La contraseña no cumple con los requisitos de seguridad");
      return;
    }
    if (!validateEmail(cleanedData.email)) {
      setMessage("El correo electrónico no es válido");
      return;
    }
    if (cleanedData.email !== cleanedData.confirmEmail) {
      setMessage("Los correos electrónicos no coinciden");
      return;
    }

    const cleanedPhone = cleanPhoneNumber(cleanedData.telefono || '');
    if (!validatePhoneNumber(cleanedPhone)) {
      setMessage("El teléfono debe tener exactamente 10 dígitos numéricos");
      return;
    }

    cleanedData.telefono = cleanedPhone;

    const payload = transformFormData(cleanedData, personaType);

    try {     
      await axios.post('http://localhost:8000/register/create_user', {
        ...payload,
      });
      setMessage('✅ Registro exitoso');
    } catch (err: any) {
      console.error(err);
      setMessage('❌ Error al registrar');
    }
  };

  return (
    <Layout>
      <main className="bg-light min-vh-100 py-5">
        <div className="container d-flex justify-content-center">
          <div className="form-container p-4 bg-white rounded shadow w-100">
          <h2 className="mb-4">Registro</h2>
          <div className="mb-3">
            <label className="form-label">Tipo de persona</label>
            <select name="personaType" value={personaType} onChange={e => setPersonaType(e.target.value as 'fisica' | 'moral')} className="form-select">
              <option value="fisica">Persona Física</option>
              <option value="moral">Persona Moral</option>
            </select>
          </div>

          <form onSubmit={handleSubmit} className="row g-3 text-start">
            {personaType === 'fisica' ? (
              <>
                <div className="col-md-12">
                  <label htmlFor="nombres" className="form-label">Nombre(s)</label>
                  <input name="nombres" className="form-control" placeholder="Nombre(s)" onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="apellidoPaterno" className="form-label">Primer apellido</label>
                  <input name="apellidoPaterno" className="form-control" placeholder="Apellido paterno" onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="apellidoMaterno" className="form-label">Segundo apellido</label>
                  <input name="apellidoMaterno" className="form-control" placeholder="Apellido materno" onChange={handleInputChange} />
                </div>
                <div className="col-md-6">
                  <label htmlFor="fechaNacimiento" className="form-label">Fecha de nacimiento</label>
                  <input type="date" name="fechaNacimiento" className="form-control" onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label d-block">Nacionalidad</label>
                  <fieldset className="d-flex align-items-center gap-4 mt-2">
                    <div className="form-check d-flex align-items-center m-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="nacionalidad"
                        id="nacionalidad-mexicana"
                        value="mexicana"
                        onChange={handleInputChange}
                        required
                      />
                      <label className="form-check-label ms-2" htmlFor="nacionalidad-mexicana">
                        Mexicana
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-center m-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="nacionalidad"
                        id="nacionalidad-extranjera"
                        value="extranjera"
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label ms-2" htmlFor="nacionalidad-extranjera">
                        Extranjera
                      </label>
                    </div>
                  </fieldset>
                </div>
                <div className="col-md-6">
                  <label htmlFor="rfc" className="form-label">RFC</label>
                  <input name="rfc" className="form-control" onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="telefono" className="form-label">Teléfono de oficina</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                    placeholder="10 dígitos"
                    value={formData.telefono || ''}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.telefono && (
                    <div className="invalid-feedback">
                      {errors.telefono}
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    placeholder="usuario@ejemplo.com"
                    required
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="confirmEmail" className="form-label">Confirmar correo</label>
                  <input
                    type="email"
                    id="confirmEmail"
                    name="confirmEmail"
                    className={`form-control ${errors.confirmEmail ? 'is-invalid' : ''}`}
                    value={formData.confirmEmail || ''}
                    onChange={handleInputChange}
                    placeholder="usuario@ejemplo.com"
                    required
                  />
                  {errors.confirmEmail && (
                    <div className="invalid-feedback">
                      {errors.confirmEmail}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="col-12">
                  <label htmlFor="razonSocial" className="form-label">Razón social</label>
                  <input name="razonSocial" className="form-control" onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="fechaConstitucion" className="form-label">Fecha de constitución</label>
                  <input type="date" name="fechaConstitucion" className="form-control" onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="actividadEconomica" className="form-label">Actividad económica</label>
                  <select name="actividadEconomica" className="form-select" onChange={handleInputChange} required>
                  <option value="">Selecciona una opción</option>
                  <option value="food_beverages">Alimentos y Bebidas</option>
                  <option value="agropecuario_mining">Agropecuario / Minero (primario)</option>
                  <option value="communications_transport">Comunicaciones y Transportes</option>
                  <option value="financing">Financiero</option>
                  <option value="manufacturing_industrial">Manufactura e Industrial</option>
                  <option value="health">Salud</option>
                  <option value="trade">Comercio</option>
                  <option value="construction">Construcción</option>
                  <option value="employee">Empleado</option>
                  <option value="energy">Energia</option>
                  <option value="entrepreneur">Empresario</option>
                  <option value="financial">Financiero</option>
                  <option value="food_and_beverages">Alimentos y bebidas</option>
                  <option value="freelancer">Independiente</option>
                  <option value="health_and_human_services">Salud</option>
                  <option value="manufacturing">Manufactura</option>
                  <option value="service">Servicios</option>
                  <option value="student">Estudiante</option>
                  <option value="technology">Tecnología</option>
                  <option value="professional">Profesionales</option>
                  <option value="technical">Técnicos</option>
                  <option value="education">Educación</option>
                  <option value="art_sports_and_show_business">Trabajadores del arte, espectaculos y deportes</option>
                  <option value="services">Servicios</option>
                  <option value="agricultural">Agropecuario</option>
                  <option value="manufacturing_coordination">Jefes, supervisores y otros trabajadores de control en la fabricación artesanal e industrial y en actividades de reparación y mantenimiento</option>
                  <option value="crafts">Artesanos y trabajadores fabriles en la industria de la transformación, y trabajadores en actividades de reparación y mantenimiento</option>
                  <option value="manufacturing_operation">Operadores de maquinaria fija de movimiento continuo y equipos en el proceso de fabricación industrial</option>
                  <option value="manufacturing_assistance">Ayudantes, peones y similares en el proceso de fabricación artesanal e industrial, y en actividades de reparación y mantenimiento</option>
                  <option value="communications_and_transportation">Comunicaciones y transporte</option>
                  <option value="administrative_and_service_coordination">Jefes de departamento, coordinadores y supervisores en actividades administrativas y de servicios</option>
                  <option value="administrative_assistance">Trabajadores de apoyo en actividades administrativas</option>
                  <option value="commerce">Comercio</option>
                  <option value="informal_commerce">Vendedores ambulantes y trabajadores ambulantes en servicios</option>
                  <option value="personal_services">Trabajadores en servicios personales</option>
                  <option value="domestic_services">Trabajadores en servicios domésticos</option>
                  <option value="protection_and_security_services">Trabajadores en servicios de protección y vigilancia, y fuerzas armadas</option>
                  <option value="other">Otro Medio</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="rfc" className="form-label">RFC</label>
                  <input name="rfc" className="form-control" onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="telefono" className="form-label">Teléfono de oficina</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                    placeholder="10 dígitos"
                    value={formData.telefono || ''}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.telefono && (
                    <div className="invalid-feedback">
                      {errors.telefono}
                    </div>
                  )}
                </div>
                <div className="col-md-12">
                  <label htmlFor="nombreRepresentante" className="form-label">Nombre(s) del representante legal</label>
                  <input name="nombreRepresentante" className="form-control" onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="apellidoPaternoRep" className="form-label">Apellido paterno del representante legal</label>
                  <input name="apellidoPaternoRep" className="form-control" onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="apellidoMaternoRep" className="form-label">Apellido materno del representante legal</label>
                  <input name="apellidoMaternoRep" className="form-control" onChange={handleInputChange} />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">Correo electrónico</label>
                  <input name="email" className="form-control" placeholder="usuario@ejemplo.com" onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">Confirmación de correo</label>
                  <input name="confirmEmail" className="form-control" onChange={handleInputChange} required />
                </div>
              </>
            )}

            <div className="col-md-6">
              <label htmlFor="email" className="form-label">Contraseña</label>
              <input type="password" name="password" className="form-control" placeholder="Mínimo 8 caracteres" aria-describedby="passwordHelpInline" onChange={handleInputChange} required />
              <span id="passwordHelpInline" className="form-text">Debe contener 1 mayúscula, 1 número y 1 símbolo.</span>
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">Confirmar contraseña</label>
              <input type="password" name="confirmPassword" className="form-control" onChange={handleInputChange} required />
            </div>

            <div className="col-12 text-center">
              <button type="submit" className="btn btn-success px-5 py-2" disabled={!isFormValid()}>Registrar</button>
            </div>
          </form>

          {message && <p className="mt-3 text-center">{message}</p>}
        </div>
      </div>
      </main>
    </Layout>
  );
};

export default RegisterPage;
