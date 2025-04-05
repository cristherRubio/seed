// src/pages/LandingPage.tsx
import { Link } from 'react-router-dom';
import { Element, scroller } from 'react-scroll';
import Layout from '../components/Layout';
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
    <Layout>
      <div className="hero">
        <h1 className="hero-fade hero-delay-0">
          SEED
        </h1>
        <h2 className="hero-fade hero-delay-1">
          Todo lo que tu empresa necesita, en un solo lugar.
        </h2>
        <p className="hero-fade hero-delay-2">
          Fortalecemos empresas a través de soluciones estructuradas, visión estratégica y acompañamiento constante.
        </p>
        <div className="hero-fade hero-delay-3">
          <Link to="/registro" className="btn btn-success me-2">COMENZAR</Link>
          <button onClick={handleScroll} className="btn btn-outline-dark">SABER MÁS</button>
        </div>
      </div>

      <Element name="services">
        {/* SECTION: SERVICIOS */}
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
        {/* SECTION: BENEFICIOS */}
        <section className="benefits-section py-5 px-3">
          <div className="text-center mb-4">
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
        {/* SECTION: FINANCIEROS */}
        <section className="financial-tools-section py-5 px-3">
          <div className="text-center mb-4">
            <span className="text-success fw-bold text-uppercase">MÁS SERVICIOS</span>
          </div>
          <div className="container">
            {/* First Row */}
            <div className="row g-5 justify-content-center mb-5">
              <div className="col-md-4">
                <div className="tool-card card h-100 text-center p-4">
                  <div className="tool-icon mb-3">
                    <i className="bi bi-cash-coin"></i>
                  </div>
                  <h4 className="tool-title">Factoraje</h4>
                  <p className="tool-description">
                    Una herramienta financiera que permite a las empresas adelantar el cobro de sus facturas para obtener liquidez inmediata.
                  </p>
                  <button className="btn btn-success px-4">Leer más</button>
                </div>
              </div>
              <div className="col-md-4">
                <div className="tool-card card h-100 text-center p-4">
                  <div className="tool-icon mb-3">
                    <i className="bi bi-people-fill"></i>
                  </div>
                  <h4 className="tool-title">Crowdfunding</h4>
                  <p className="tool-description">
                    Un modelo de financiamiento colectivo donde muchas personas invierten pequeñas cantidades para impulsar un proyecto o empresa.
                  </p>
                  <button className="btn btn-success px-4">Leer más</button>
                </div>
              </div>
            </div>

            {/* Second Row */}
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-8">
                <div className="tool-card card featured h-100 text-center p-4">
                  <div className="tool-icon mb-3">
                    <i className="bi bi-graph-up-arrow"></i>
                  </div>
                  <h4 className="tool-title">Lleva tu empresa al siguiente nivel</h4>
                  <p className="tool-description">
                    Te acompañamos con soluciones contables, legales y estratégicas que 
                    brindan estructura, protección y claridad a tu empresa. Desde el cumplimiento 
                    fiscal hasta la toma de decisiones clave, nuestro equipo te respalda para que 
                    crezcas con visión y confianza.
                  </p>
                  <button className="btn btn-success px-4">Leer más</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* SECTION: UPORTUNIDADES */}
        <section className="top-opportunities-section py-5 px-3 bg-white">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-dark">Top Oportunidades</h2>
            <p className="text-muted">oportunidades destacadas del mes</p>
          </div>
          <div className="row g-4 justify-content-center">
            {/* Card 1 */}
            <div className="col-md-6 col-lg-4">
              <div className="opportunity-card card h-100 text-center p-4">
                <div className="highlight-box bg-light p-3 mb-3 rounded">
                  <h5 className="text-uppercase fw-bold mb-1">Asegúrate</h5>
                  <h2 className="text-success fw-bold">$6,000</h2>
                  <p className="text-muted mb-0 small">Asegura tu flotilla de autos con CHUBB desde 6k por auto.</p>
                </div>
                <button className="btn btn-success-soft w-100">Escoge el Plan</button>
                <ul className="list-unstyled mt-4 text-muted small">
                  <li>Conubia fuga irure ab primis.</li>
                  <li>Sem nam neque similique lects.</li>
                  <li>Sem nam neque similique lects.</li>
                  <li>Turpis nostrud congue sem.</li>
                  <li>Elit officiis temporibus nibh.</li>
                </ul>
              </div>
            </div>

            {/* Card 2 - Highlight */}
            <div className="col-md-6 col-lg-4">
              <div className="opportunity-card card h-100 text-center p-4">
                <div className="highlight-box bg-light p-3 mb-3 rounded">
                  <h5 className="text-uppercase fw-bold mb-1">Inversión</h5>
                  <h2 className="text-success fw-bold">15%</h2>
                  <p className="mb-0 small">Oportunidad de inversión, empresa doble AA. rendimiento atractivo.</p>
                </div>
                <button className="btn btn-success-soft w-100">Invierte</button>
                <ul className="list-unstyled mt-4 text-muted small">
                  <li>Conubia fuga irure ab primis.</li>
                  <li>Elit officiis temporibus nibh.</li>
                  <li>Sem nam neque similique lects.</li>
                  <li>Ipsum natus veniam occaecat.</li>
                  <li>Sem nam neque similique lects.</li>
                </ul>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-6 col-lg-4">
              <div className="opportunity-card card h-100 text-center p-4">
                <div className="highlight-box bg-light p-3 mb-3 rounded">
                  <h5 className="text-uppercase fw-bold mb-1">Paquete contable</h5>
                  <h2 className="text-success fw-bold">$1,800</h2>
                  <p className="text-muted mb-0 small">Servicios contables para tu empresa básicos, al mes.</p>
                </div>
                <button className="btn btn-success-soft w-100">Escoge el plan</button>
                <ul className="list-unstyled mt-4 text-muted small">
                  <li>Conubia fuga irure ab primis.</li>
                  <li>Sem nam neque similique lects.</li>
                  <li>Imperdiet accumsan convallis.</li>
                  <li>Elit officiis temporibus nibh.</li>
                  <li>Turpis nostrud congue sem.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* SECTION: TRUST */}
        <section className="client-trust-section py-5 px-3 bg-white">
          <div className="container">
            <div className="row align-items-center g-5">
              {/* Left: Title + Text + Buttons */}
              <div className="col-md-6">
                <h2 className="fw-bold display-5 mb-3">
                  ¡Más de <span className="text-success">12,000+</span> clientes <br />felices confiando!
                </h2>
                <p className="text-muted mb-4 fw-medium">
                  En SEED creemos que lo más valioso son nuestros clientes, por eso los acompañamos con compromiso, visión y soluciones hechas a la medida.
                </p>
                <div className="d-flex gap-3 flex-wrap">
                  <button className="btn btn-success-soft px-4">Comenzar</button>
                </div>
              </div>

              {/* Right: Stats */}
              <div className="col-md-6">
                <div className="row g-3">
                  {[
                    { value: "33K+", label: "usuarios activos alrededor del mundo" },
                    { value: "25k+", label: "Solicitudes" },
                    { value: "+80 m", label: "Fondeados" },
                    { value: "+100m", label: "Invertidos" },
                  ].map((stat, idx) => (
                    <div className="col-6" key={idx}>
                      <div className="stat-card text-center p-4 h-100 rounded-3">
                        <h3 className="text-success fw-bold fs-2 mb-1">{stat.value}</h3>
                        <p className="text-muted small mb-0">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* SECTION: TESTIMONIAL*/}
        <section className="testimonial-section py-5 px-3 bg-light">
          <div className="container text-center">
            <h2 className="fw-bold mb-4">Lo que dicen nuestros clientes</h2>

            <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">

                {/* Testimony 1 */}
                <div className="carousel-item active">
                  <div className="testimonial-card mx-auto p-4 shadow-sm bg-white rounded-4" style={{ maxWidth: "600px" }}>
                    <p className="fst-italic mb-3">
                      “Gracias a SEED pudimos estructurar nuestro plan financiero, obtener inversión y lanzar en menos de 3 meses. ¡Increíble equipo!”
                    </p>
                    <h6 className="fw-bold mb-0">Carlos Mendoza</h6>
                    <small className="text-muted">CEO, GreenUp</small>
                  </div>
                </div>

                {/* Testimony 2 */}
                <div className="carousel-item">
                  <div className="testimonial-card mx-auto p-4 shadow-sm bg-white rounded-4" style={{ maxWidth: "600px" }}>
                    <p className="fst-italic mb-3">
                      “La atención personalizada que recibimos hizo toda la diferencia. Nos ayudaron a tomar decisiones con datos y visión.”
                    </p>
                    <h6 className="fw-bold mb-0">Laura Sánchez</h6>
                    <small className="text-muted">Fundadora, Estilo Eco</small>
                  </div>
                </div>

                {/* Testimony 3 */}
                <div className="carousel-item">
                  <div className="testimonial-card mx-auto p-4 shadow-sm bg-white rounded-4" style={{ maxWidth: "600px" }}>
                    <p className="fst-italic mb-3">
                      “SEED nos facilitó herramientas y asesoría para crecer de forma sostenible. Lo recomiendo a cualquier startup.”
                    </p>
                    <h6 className="fw-bold mb-0">José Ramírez</h6>
                    <small className="text-muted">Cofundador, AgroNova</small>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon"></span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon"></span>
              </button>
            </div>
          </div>
        </section>
      </Element>
    </Layout>
  );
};

export default LandingPage;
