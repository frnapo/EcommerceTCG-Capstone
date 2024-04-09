import CardCarousel from "./CardCarousel";
import Carousel1 from "../../assets/img/carousel1.png";
import Carousel2 from "../../assets/img/carousel2.png";
import Carousel3 from "../../assets/img/carousel3.png";
import Carousel4 from "../../assets/img/carousel4.png";
import Carousel5 from "../../assets/img/carousel5.png";
import { EnvelopeFill, Whatsapp } from "react-bootstrap-icons";

const cards = [
  { imageUrl: Carousel1 },
  { imageUrl: Carousel2 },
  { imageUrl: Carousel3 },
  { imageUrl: Carousel4 },
  { imageUrl: Carousel5 },
];

const SellComponent = () => {
  return (
    <div className="container text-center relative-container">
      <div className="row">
        <div className="col-12 col-md-6 col-xl-7 mt-5 pb-5 rounded-5 absolute-on-md">
          <h1 className="mt-5 fw-bold mb-4">
            <span className="secondary-color">Vendi</span> le Tue Carte da Gioco -
            <span className="secondary-color">Contattaci</span> per Iniziare!
          </h1>
          <p className="lead">
            Vuoi trasformare le tue carte da gioco in denaro? Siamo qui per aiutarti! Inviaci un&apos;email o un
            messaggio WhatsApp con le foto delle tue carte e tutti i dettagli rilevanti. Il nostro team valuterà le tue
            carte e ti guiderà attraverso il processo di vendita. Non perdere l&apos;occasione di fare spazio nella tua
            collezione e guadagnare allo stesso tempo. Contattaci oggi per iniziare!
          </p>
          <div className="d-flex mt-5 justify-content-center">
            <a
              href="mailto:packpeekershop@gmail.com?subject=Vendita%20Carte&body=Ciao%2C%20sono%20interessato%20a%20vendere%20le%20mie%20carte.%20Ecco%20i%20dettagli:"
              className="btn-custom btn py-3 px-5 me-2"
              target="_blank"
            >
              <EnvelopeFill className="me-2 fs-5 " />
              E-mail
            </a>
            <a
              href="https://wa.me/393703401020?text=Ciao%2C%20sono%20interessato%20a%20vendere%20le%20mie%20carte.%20Ecco%20i%20dettagli:"
              className="btn-blue py-3 btn px-5 "
              target="_blank"
            >
              <Whatsapp className="me-2 fs-5" />
              WhatsApp
            </a>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xl-5" style={{ marginTop: "-70px" }}>
          <CardCarousel cards={cards} />
        </div>
      </div>
    </div>
  );
};

export default SellComponent;
