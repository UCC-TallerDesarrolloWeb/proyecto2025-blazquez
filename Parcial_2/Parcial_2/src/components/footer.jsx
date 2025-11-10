import '@styles/footer.css';
import iconoMapa from '@assets/home/icono-maps.png';
import iconoIg from '@assets/home/icono-ig.webp';
import iconoWhatsapp from '@assets/home/whatshap icono.webp';
import iconoFacebook from '@assets/home/icono-facebook.webp';

export default function Footer() {
  return (
    <footer className="pie">
      <div className="pieGrid container">

        <div className="iconoGrande" role="img" aria-label="maps">
          <a
            href="https://www.google.com.ar/maps/place/Farmacia+Rondeau/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src= {iconoMapa} alt="link-maps" />
          </a>
        </div>

        <div className="footerBloque">
          <p>
            lunes a viernes:
            <br />8:00 – 13:00 / 16:00 – 21:00
            <br />sábados: 8:00 – 13:00
          </p>
        </div>

        <div className="footerBloque">
          <h4>teléfono fijo</h4>
          <p>(0351) 475-7893</p>
        </div>

        <div className="footerBloque">
          <h4>whatsapp</h4>
          <p>+54 9 351 672 7124</p>
        </div>

        <div className="iconosRedes">
          <div className="icono" role="img" aria-label="instagram">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <img src={iconoIg} alt="instagram" />
            </a>
          </div>

          <div className="icono" role="img" aria-label="whatsapp">
            <a href="https://www.whatsapp.com/?lang=es_LA" target="_blank" rel="noopener noreferrer">
              <img src={iconoWhatsapp} alt="whatsapp" />
            </a>
          </div>

          <div className="icono" role="img" aria-label="facebook">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <img src={iconoFacebook} alt="facebook" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
