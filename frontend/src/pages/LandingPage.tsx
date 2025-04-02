// src/pages/LandingPage.tsx
import { Link } from 'react-router-dom';
import { Element, scroller } from 'react-scroll';
import PublicLayout from '../components/PublicLayout';
import './LandingPage.css';

const LandingPage = () => {
  const handleScroll = () => {
    scroller.scrollTo('services', {
      duration: 600,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };

  return (
    <PublicLayout>
      <div className="hero text-white text-center d-flex flex-column justify-content-center align-items-center">
        <h1 className="title mb-3">
          Todo lo que tu empresa necesita, en un solo lugar.
        </h1>
        <p className="subtitle mb-4">
          Fortalecemos empresas a través de soluciones estructuradas, visión estratégica y acompañamiento constante.
        </p>
        <div>
          <Link to="/registro" className="btn btn-success me-2">COMENZAR</Link>
          <button onClick={handleScroll} className="btn btn-outline-light">SABER MÁS</button>
        </div>
      </div>

      <Element name="services">
        <section className="services-section py-5 px-3">
          <div className="text-center">
            <span className="text-success fw-bold text-uppercase section-label">SERVICIOS</span>
            <h2 className="my-3 section-title">Le brindamos los mejores servicios a ti y a tu empresa.</h2>
            <p>A través de nuestra plataforma te conectamos con expertos</p>
          </div>
          <div className="row g-4 justify-content-center mb-5">
            <div className="col-md-5 col-lg-3">
              <div className="card text-center p-4 h-100">
                <i className="bi bi-piggy-bank"></i>
                <h3>Fondeate</h3>
                <p>Emprendedores y empresas que requieren capital a través de inversionistas dentro de la plataforma.</p>
              </div>
            </div>
            <div className="col-md-5 col-lg-3">
              <div className="card text-white bg-success text-center p-4 h-100">
                <i className="bi bi-bar-chart"></i>
                <h3>Invierte</h3>
                <p>Acceso a oportunidades de inversión diversificadas y de alto rendimiento.</p>
              </div>
            </div>
            <div className="col-md-5 col-lg-3">
              <div className="card text-center p-4 h-100">
                <i className="bi bi-shield-check"></i>
                <h3>Asegúrate</h3>
                <p>Cotización y contratación de seguros empresariales.</p>
              </div>
            </div>
            <div className="col-md-5 col-lg-3">
              <div className="card text-white bg-success text-center p-4 h-100">
                <i className="bi bi-person-workspace"></i>
                <h3>Asesórate</h3>
                <p>Consultoría estratégica y financiera para mejorar tu rentabilidad y tomar decisiones inteligentes.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="benefits-section py-5 px-3">
          <div className="text-center">
            <span className="text-success fw-bold text-uppercase">BENEFICIOS</span>
          </div>
          <div className="container">
            <div className="row g-4">
              {[
                {
                  icon: 'bi-easel',
                  title: 'FÁCIL DE USAR',
                  desc: 'Diseñado para que cualquier usuario, sin importar su experiencia, pueda navegar, cotizar, invertir o solicitar servicios de forma clara, rápida y sin complicaciones.'
                },
                {
                  icon: 'bi-pie-chart',
                  title: 'COLABORACIÓN Y APOYO',
                  desc: 'Te acompañamos en cada paso con atención personalizada, respuestas claras y un equipo comprometido con el crecimiento de tu proyecto.'
                },
                {
                  icon: 'bi-kanban',
                  title: 'GESTIÓN DE PROYECTOS',
                  desc: 'Organizamos, estructuramos y damos seguimiento a tus proyectos para que avancen con orden, enfoque y resultados medibles.'
                },
                {
                  icon: 'bi-bar-chart-line',
                  title: 'ESTRATEGIA DIGITAL',
                  desc: 'Impulsamos tu presencia y crecimiento en el mundo digital con enfoque, creatividad y herramientas que conectan tu negocio con el futuro.'
                },
                {
                  icon: 'bi-currency-dollar',
                  title: 'SERVICIOS FINANCIEROS',
                  desc: 'Te damos acceso a herramientas financieras inteligentes para optimizar recursos, tomar mejores decisiones y llevar tus finanzas al siguiente nivel.'
                },
                {
                  icon: 'bi-globe',
                  title: 'OPTIMIZACIÓN',
                  desc: 'Mejoramos tus procesos, tiempos y recursos para que tu negocio sea más ágil, rentable y eficiente desde adentro hacia afuera.'
                }
              ].map((item, idx) => (
                <div className="col-md-6 col-lg-4" key={idx}>
                  <div className="benefit-card text-center p-4 h-100 shadow-sm bg-white rounded-4">
                    <div className="text-success mb-3 fs-1">
                      <i className={`bi ${item.icon}`}></i>
                    </div>
                    <h5 className="fw-bold">{item.title}</h5>
                    <p className="small text-muted mt-2">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Element>
    </PublicLayout>
  );
};

export default LandingPage;
