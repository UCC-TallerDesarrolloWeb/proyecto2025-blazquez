import '@styles/index.css';
import Footer from '@components/footer.jsx';
import Header from '@components/header.jsx';
import Navbar from '@components/navbar.jsx';


export default function Main() {
  return (
    <>
      <Header />
      <Navbar />
      
      <main className="contenido container">
        <section className="col izq">
          <article className="panel fotoLocal">
            <div className="imgGrande" role="img" aria-label="foto del local">
              <img src="/home/foto-farmcai-por-fuera.webp" alt="foto-fuera-local" />
            </div>
          </article>

          <article className="panel">
            <h3>ubicación:</h3>
            <p>
              av. rondeau 245, nueva córdoba, córdoba capital.<br />
              a pocos metros del parque de las tejas.<br />
              contamos con estacionamiento exclusivo para clientes.
            </p>
          </article>

          <article className="panel">
            <h3>obras sociales</h3>
            <p>trabajamos con una amplia red de coberturas médicas, entre ellas:</p>
            <p className="separacionDeOs">
              <span className="os">pami</span>
              <span className="os">osde</span>
              <span className="os">swiss medical</span>
              <span className="os">apross</span>
              <span className="os">osecac</span>
              <span className="os">daspu</span>
            </p>
          </article>
        </section>

        <section className="col der">
          <article className="panel quienes">
            <h2>¿quiénes somos?</h2>
            <p>
              en <strong>farmacia rondeau</strong> trabajamos desde hace más de 25 años brindando
              atención personalizada, orientación farmacéutica profesional y precios justos en
              medicamentos y productos de cuidado personal. nuestro equipo está conformado por
              farmacéuticos matriculados y técnicos comprometidos con tu bienestar.
            </p>

            <div className="horarios">
              <h3>horarios:</h3>
              <p>
                lunes a viernes: 8:00 – 13:00 / 16:00 – 21:00<br />
                sábados: 8:00 – 13:00
              </p>
            </div>
          </article>

          <article className="panel">
            <h2 className="sr-only">foto interior</h2>
            <div className="imgMediana" role="img" aria-label="foto del interior">
              <img src="/home/foto-farmacia-pordentro.webp" alt="farmacia-por-dentro" />
            </div>
          </article>
        </section>
      </main>

      <Footer />
    </>
  );
}
