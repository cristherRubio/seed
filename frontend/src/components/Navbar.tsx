// src/components/Navbar.tsx
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isOnRegister = location.pathname === '/register';

  const isLoggedIn = false; // Replace this with actual auth logic later

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-4 py-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-success" to="/">SEED</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="#">FONDEATE</Link></li>
            <li className="nav-item"><Link className="nav-link" to="#">INVIERTE</Link></li>
            <li className="nav-item"><Link className="nav-link" to="#">ASEGÚRATE</Link></li>
            <li className="nav-item"><Link className="nav-link" to="#">ASESÓRATE</Link></li>
          </ul>

          <ul className="navbar-nav d-flex align-items-lg-center gap-2">
            {!isLoggedIn && !isOnRegister && (
              <li className="nav-item">
                <Link to="/register" className="btn btn-success">COMENZAR</Link>
              </li>
            )}
            <li className="nav-item">
              <Link to="#" className="nav-link">Log in</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;