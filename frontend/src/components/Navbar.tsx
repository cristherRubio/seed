// src/components/Navbar.tsx
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const isOnRegister = location.pathname === '/registro';

  const isLoggedIn = !!localStorage.getItem('token');

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-3 px-lg-4 py-3">
      <div className="container-fluid px-0">
        <Link className="navbar-brand fw-bold text-success" to="/">SEED</Link>

        {/* Hamburger toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Offcanvas menu */}
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">SEED</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body d-flex flex-column flex-lg-row justify-content-between w-100">
            {/* Center nav items */}
            <ul className="navbar-nav justify-content-center flex-grow-1 mb-3 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/en-desarrollo">FONDEATE</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/en-desarrollo">INVIERTE</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/en-desarrollo">ASEGÚRATE</Link></li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  ASESÓRATE
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item disabled" to="/asesorate/juridico">JURÍDICO</Link></li>
                  <li><Link className="dropdown-item disabled" to="/asesorate/financiera">FINANCIERA</Link></li>
                  <li><Link className="dropdown-item disabled" to="/asesorate/contabilidad">CONTABILIDAD</Link></li>
                </ul>
              </li>
              <li className="nav-item"><Link className="nav-link" to="/en-desarrollo">FACTORAJE</Link></li>
            </ul>

            {/* Right actions */}
            <ul className="navbar-nav d-flex align-items-lg-center gap-2">
              {!isLoggedIn && !isOnRegister && (
                <li className="nav-item">
                  <Link to="/registro" className="btn btn-success">COMENZAR</Link>
                </li>
              )}

              {!isLoggedIn && (
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Inicia sesión</Link>
                </li>
              )}

              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn btn-link" onClick={handleLogout}>
                      Cerrar sesión
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
