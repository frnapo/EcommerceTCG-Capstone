import { Container } from "react-bootstrap";
import { Youtube, Instagram, Tiktok } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="fw-light py-4 footer text-center" style={{ zIndex: 3000 }}>
      <Container>
        <div className="row">
          <div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-2 fw-bold">Contatti</h5>
            <ul className="list-unstyled">
              <li>
                <a href="mailto:packpeekershop@gmail.com" target="_blank" className="fw-light m-0 p-0 footer-link">
                  packpeekershop@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/+393703401020?text=Salve!%20Ho%20bisogno%20di%20assistenza%20per%20un%20ordine%20sul%20vostro%20ecommerce%20di%20TCG."
                  className="fw-light footer-link"
                  target="_blank"
                >
                  +39 3703401020
                </a>
              </li>
            </ul>
          </div>

          <div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-2 fw-bold">Link Utili</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="footer-link fw-light">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories/1" className="footer-link fw-light">
                  Prodotti
                </Link>
              </li>
              <li>
                <Link to="/faq" className="footer-link fw-light">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-2 fw-bold">Politiche</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/termsandconditions" className="footer-link fw-light d-inline-block">
                  Termini e Condizioni
                </Link>
              </li>
              <li>
                <Link to="/privacypolicy" className="footer-link fw-light d-inline-block">
                  Politica sulla Privacy
                </Link>
              </li>
              <li>
                <Link to="/shippingpolicy" className="footer-link fw-light d-inline-block">
                  Politica di Spedizione
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-2 fw-bold">Seguici</h5>
            <a
              href="https://www.tiktok.com/@packpeekers?lang=it-IT"
              target="_blank"
              className="footer-link d-inline-block me-3"
            >
              <Tiktok className="fs-4" />
            </a>
            <a
              href="https://www.instagram.com/packpeekers/"
              target="_blank"
              className="footer-link d-inline-block me-3"
            >
              <Instagram className="fs-4" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCXFr_AGdoD5tHsDB8Fzok_w"
              target="_blank"
              className="footer-link d-inline-block"
            >
              <Youtube className="fs-3" />
            </a>
          </div>
        </div>

        <div className="text-center border-custom pt-3 mt-2">
          <p className="mb-0">&copy; {new Date().getFullYear()} Pack Peekers Shop. Tutti i diritti riservati.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
