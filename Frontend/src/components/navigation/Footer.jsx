import { Container } from "react-bootstrap";
import { Youtube, Instagram, Tiktok } from "react-bootstrap-icons";

const Footer = () => {
  return (
    <footer className="fw-light py-4 footer text-center" style={{ zIndex: 3000 }}>
      <Container>
        <div className="row">
          <div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-2 fw-bold">Contatti</h5>
            <ul className="list-unstyled">
              <li>
                <p className="fw-light m-0 p-0 footer-link">supporto@esempio.com</p>
              </li>
              <li>
                <p className="fw-light footer-link">0123456789</p>
              </li>
            </ul>
          </div>

          <div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-2 fw-bold">Link Utili</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="footer-link fw-light">
                  Home
                </a>
              </li>
              <li>
                <a href="/prodotti" className="footer-link fw-light">
                  Prodotti
                </a>
              </li>
              <li>
                <a href="/account" className="footer-link fw-light">
                  Account
                </a>
              </li>
              <li>
                <a href="/faq" className="footer-link fw-light">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-2 fw-bold">Politiche</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/termini" className="footer-link fw-light d-inline-block">
                  Termini e Condizioni
                </a>
              </li>
              <li>
                <a href="/privacy" className="footer-link fw-light d-inline-block">
                  Politica sulla Privacy
                </a>
              </li>
              <li>
                <a href="/resi" className=" footer-link fw-light d-inline-block">
                  Politica di Reso
                </a>
              </li>
              <li>
                <a href="/spedizione" className="footer-link fw-light d-inline-block">
                  Politica di Spedizione
                </a>
              </li>
            </ul>
          </div>

          <div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-2 fw-bold">Seguici</h5>
            <a href="https://www.facebook.com" className="footer-link d-inline-block me-3">
              <Tiktok className="fs-4" />
            </a>
            <a href="https://www.instagram.com" className="footer-link d-inline-block me-3">
              <Instagram className="fs-4" />
            </a>
            <a href="https://www.twitter.com" className="footer-link d-inline-block">
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
