import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer text-light pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row justify-content-md-center">
          {/* Logo & Description */}
          <div className="col-md">
              {/*<img src="/images/logo.png" alt="Seed Logo" className="footer-logo me-2" />*/}
            <span className="fw-bold fs-5">SEED</span>
            <div className="footer-social justify-content-md-center">
              <i className="bi bi-facebook"></i>
              <i className="bi bi-x"></i>
              <i className="bi bi-instagram"></i>
              <i className="bi bi-linkedin"></i>
            </div>
          </div>

          {/* Footer columns */}
          <div className="col-md">
            <h6 className="text-success text-uppercase fw-bold mb-3">Servicios</h6>
            <ul className="list-unstyled small">
              <li>Fondeate</li>
              <li>Invierte</li>
              <li>Asegúrate</li>
              <li>Asesórate</li>
              <li>Factoraje</li>
            </ul>
          </div>
          <div className="col-md">
            <h6 className="text-success text-uppercase fw-bold mb-3">Compañía</h6>
            <ul className="list-unstyled small">
              <li>Sobre nosotros</li>
              <li>Contacto</li>
            </ul>
          </div>
          <div className="col-md">
            <h6 className="text-success text-uppercase fw-bold mb-3">Soporte</h6>
            <ul className="list-unstyled small">
              <li>Soporte técnico</li>
              <li>Preguntas frecuentes</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-4 small">
          © {new Date().getFullYear()} SEED. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
